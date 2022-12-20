import { HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { AtGuard } from '../common/guards/at.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { RegisterInput } from './dto/inputs/register.input';
// import { AuthPayload } from './types/auth-payload';
import { Tokens } from './types/tokens-type';
import * as kir from 'apollo-server-express';
import { ConfigService } from '@nestjs/config';

@Resolver(() => Tokens)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Mutation(() => Tokens)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<Tokens> {
    return await this.authService.register(registerInput);
  }

  @HttpCode(HttpStatus.OK)
  @Mutation(() => Tokens)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Tokens> {
    return await this.authService.login(loginInput);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  @Mutation(() => String)
  async logout(@GetCurrentUser('sub') username: string): Promise<String> {
    return await this.authService.logout(username);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  @Mutation(() => Tokens)
  async refresh(
    @GetCurrentUser('sub') username: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(username, refreshToken);
  }
}
