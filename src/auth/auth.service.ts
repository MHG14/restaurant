import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens-type';
import { RegisterInput } from './dto/inputs/register.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { LoginInput } from './dto/inputs/login.input';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  //////////////////////////////////////////////////////////////////////
  //Utility Functions
  async hashData(data: string) {
    const hashedData = bcrypt.hash(data, 10);
    return hashedData;
  }

  async getTokens(username: string): Promise<Tokens> {
    const accessTokenSecret = this.config.get('ACCESS_TOKEN_SECRET');
    const refreshTokenSecret = this.config.get('REFRESH_TOKEN_SECRET');

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: username },
        { secret: accessTokenSecret, expiresIn: 15 * 60 },
      ),
      this.jwtService.signAsync(
        { sub: username },
        { secret: refreshTokenSecret, expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
  
  //////////////////////////////////////////////////////////////////////

  async updateHashedRt(username: string, rt: string): Promise<void> {
    const hashedRt = await this.hashData(rt);
    await this.userModel.findOneAndUpdate(
      { username },
      { $set: { hashedRt: hashedRt } },
    );
  }

  //////////////////////////////////////////////////////////////////////

  async register(registerInput: RegisterInput): Promise<Tokens> {
    const hashedPassword = await this.hashData(registerInput.password);
    const newUser = await this.userModel.create({
      username: registerInput.username,
      password: hashedPassword,
      fullName: registerInput.fullName,
    });

    const tokens = await this.getTokens(registerInput.username);

    await this.updateHashedRt(newUser.username, tokens.refreshToken);
    return tokens;
  }

  //////////////////////////////////////////////////////////////////////

  async login(loginInput: LoginInput): Promise<Tokens> {
    const user = await this.userModel.findOne({
      username: loginInput.username,
    });
    if (!user) throw new ForbiddenException('User does not exist');
    const passwordMatches = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException('Password is not correct');
    const tokens = await this.getTokens(loginInput.username);

    await this.updateHashedRt(user.username, tokens.refreshToken);
    return tokens;
  }
  
  //////////////////////////////////////////////////////////////////////

  async logout(username: string): Promise<String> {
    await this.userModel.updateOne(
      { username: username, hashedRt: { $ne: null } },
      { $set: { hashedRt: null } },
    );
    return `${username} successfully logged out`;
  }

  //////////////////////////////////////////////////////////////////////

  async refreshTokens(username: string, refreshToken:string): Promise<Tokens> {
    const user = await this.userModel.findOne({username: username});
    if(!user || !user.hashedRt) throw new ForbiddenException('Access denied!');
    const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);
    if(!rtMatches) throw new ForbiddenException('Access denied!');
    const tokens = await this.getTokens(user.username);
    await this.updateHashedRt(user.id, tokens.refreshToken);
    return tokens
  }

}
