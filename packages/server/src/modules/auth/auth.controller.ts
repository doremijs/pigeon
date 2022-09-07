import { PigeonAction } from '@/decorators/action'
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from '../../decorators/public'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserProfileDto } from './dto/user-profile.dto'
import { LocalAuthGuard } from './gurads/local-auth.guard'
import { RequestWithUser } from './types'

@Controller('auth')
@ApiTags('认证')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @PigeonAction('POST', 'login/local', '登录', { public: true })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: UserProfileDto })
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user)
  }

  @PigeonAction('POST', 'register/local', '注册', { public: true })
  async register(@Body() userDto: RegisterUserDto) {
    await this.authService.register(userDto)
    return {}
  }

  @PigeonAction('GET', 'me', '个人信息')
  @ApiOkResponse({ type: UserProfileDto })
  getProfile(@Request() req) {
    const user = req.user
    return {
      user
    }
  }
}
