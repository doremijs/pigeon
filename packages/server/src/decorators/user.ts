import { JWTUser } from '@/types/user'
import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import type { Request } from 'express'
/**
 * 获取用户
 */
export const User = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    return request.user as JWTUser
  }
)
