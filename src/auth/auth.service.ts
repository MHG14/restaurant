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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    const hashedData = bcrypt.hash(data, 10);
    return hashedData;
  }

  async getTokens(username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: username },
        { secret: 'at-secret', expiresIn: 15 * 60 },
      ),
      this.jwtService.signAsync(
        { sub: username},
        { secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateHashedRt(username: string, rt: string) {
    const hashedRt = await this.hashData(rt);
    await this.userModel.findOneAndUpdate(
      { username },
      { $set: { hashedRt: hashedRt } },
    );
  }

  async register(registerInput: RegisterInput): Promise<Tokens> {
    const hashedPassword = await this.hashData(registerInput.password);
    const newUser = await this.userModel.create({
      username: registerInput.username,
      password: hashedPassword,
      fullName: registerInput.fullName,
    });

    const tokens = await this.getTokens(
      registerInput.username,
    );

    await this.updateHashedRt(newUser.username, tokens.refreshToken);
    return tokens;
  }

  async login(loginInput: LoginInput): Promise<Tokens> {
    const user = await this.userModel.findOne({username: loginInput.username})
    if(!user) throw new ForbiddenException('User does not exist');
    const passwordMatches = await bcrypt.compare(loginInput.password, user.password)
    if(!passwordMatches) throw new ForbiddenException('Password is not correct');
    const tokens = await this.getTokens(
        loginInput.username,
      );
  
      await this.updateHashedRt(user.username, tokens.refreshToken);
      return tokens;

  }
}
