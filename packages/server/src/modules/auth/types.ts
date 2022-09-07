import type { User } from '@prisma/client'

export type JWTUser = {
  id: string
  name: string
}

export type SecurityUser = Omit<User, 'hashedPassword'>

export type RequestWithUser = Express.Request & {
  user: SecurityUser
}
