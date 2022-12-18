import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { RegisterInput } from './dto/inputs/register.input';
// import { AuthPayload } from './types/auth-payload';
import { Tokens } from './types/tokens-type';

@Resolver(() => Tokens)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Tokens)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<Tokens> {
    return await this.authService.register(registerInput);
  }

  @Mutation(() => Tokens)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Tokens> {
    return await this.authService.login(loginInput);
  }
}
