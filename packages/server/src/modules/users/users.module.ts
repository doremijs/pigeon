import { Module } from '@nestjs/common'
import { PrismaService } from 'src/providers/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
