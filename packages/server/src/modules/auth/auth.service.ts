import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UsersService } from '../users/users.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserProfileDto } from './dto/user-profile.dto'
import { JWTUser, SecurityUser } from './types'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<SecurityUser> {
    const user = await this.usersService.findOne(username)
    if (user && (await compare(pass, user.hashedPassword))) {
      const { hashedPassword, ...result } = user
      return result
    }
    return null
  }

  async login(user: SecurityUser): Promise<UserProfileDto> {
    const payload: JWTUser = { id: user.id, name: user.nickname }
    return {
      token: this.jwtService.sign(payload),
      user: payload
    }
  }

  async register(user: RegisterUserDto) {
    const one = await this.usersService.findOne(user.username)
    if (one) {
      throw new BadRequestException('用户已存在')
    }
    if (await this.usersService.createLocal(user.username, user.password)) {
      return true
    }
    return false
  }
}
