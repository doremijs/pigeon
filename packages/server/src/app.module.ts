import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { openedModules } from './modules'
import { JwtAuthGuard } from './modules/auth/gurads/jwt-auth.guard'
import { UsersService } from './modules/users/users.service'
import { GlobalModule } from './providers/global.module'
import { PrismaService } from './providers/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GlobalModule,
    ...openedModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    PrismaService,
    UsersService
  ]
})
export class AppModule {}
