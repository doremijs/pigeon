import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('用户')
export class UsersController {
}
