import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from './modules/users/users.service'
import { PrismaService } from './providers/prisma.service'

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService
  ) {}
  async onModuleInit() {
    const adminUser = await this.prisma.user.findFirst()
    if (!adminUser) {
      const seedUsername = this.config.get('ADMIN_USERNAME') ?? 'pigeon'
      const seedPassword = this.config.get('ADMIN_PASSWORD') ?? Math.random().toString(36).substring(2)
      await this.usersService.createLocal(seedUsername, seedPassword)
      Logger.log(`Admin user auto-created!\tUsername: ${seedUsername}\tPassword:${seedPassword}`)
    }
  }
}
