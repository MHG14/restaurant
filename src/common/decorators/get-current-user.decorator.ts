import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (!data) return req.user;
    return req.user[data];
  },
);
