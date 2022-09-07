import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { hash } from 'bcrypt'
import { PrismaService } from '../../providers/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username
      }
    })
  }

  async createLocal(username: string, password: string) {
    const hashedPassword = await hash(password, 12)
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          nickname: username,
          provider: 'local',
          hashedPassword
        }
      })
      return user
    } catch (e) {
      Logger.error(e)
      throw new BadRequestException(e)
    }
  }
}
