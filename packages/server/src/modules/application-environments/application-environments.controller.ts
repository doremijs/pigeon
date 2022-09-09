// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationEnvironmentsService } from './application-environments.service'
import {
  CreateApplicationEnvironmentDto,
  UpdateApplicationEnvironmentDto,
  ApplicationEnvironmentModel,
  ApplicationEnvironmentListDto
} from './dto/application-environments.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { ApplicationEnvironmentsQueryDto } from './dto/query.dto'
import { User } from '@/decorators/user'
import { JWTUser } from '@/types/user'

@Controller('application-environments')
@ApiTags('应用的环境')
export class ApplicationEnvironmentsController {
  constructor(private readonly applicationEnvironmentsService: ApplicationEnvironmentsService) {}

  @PigeonAction('POST', '', '创建应用的环境')
  @ApiBody({ type: CreateApplicationEnvironmentDto })
  @ApiCreatedResponse({ type: ApplicationEnvironmentModel })
  create(@User() user: JWTUser, @Body() createApplicationEnvironmentDto: CreateApplicationEnvironmentDto) {
    return this.applicationEnvironmentsService.create(user.id, createApplicationEnvironmentDto)
  }

  @PigeonAction('GET', '', '查询应用的环境列表')
  @ApiOkResponse({ type: ApplicationEnvironmentListDto })
  findMany(@User() user: JWTUser, @Query() query: ApplicationEnvironmentsQueryDto) {
    return this.applicationEnvironmentsService.findMany(user.id, query)
  }

  @PigeonAction('GET', ':id', '查询应用的环境详情')
  @ApiOkResponse({ type: ApplicationEnvironmentModel })
  findOne(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationEnvironmentsService.findOne(user.id, id)
  }

  @PigeonAction('PATCH', ':id', '更新应用的环境')
  @ApiBody({ type: UpdateApplicationEnvironmentDto })
  @ApiOkResponse({ type: ApplicationEnvironmentModel })
  update(@User() user: JWTUser, @Param('id') id: string, @Body() updateApplicationEnvironmentDto: UpdateApplicationEnvironmentDto) {
    return this.applicationEnvironmentsService.update(user.id, id, updateApplicationEnvironmentDto)
  }

  @PigeonAction('DELETE', ':id', '删除应用的环境')
  remove(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationEnvironmentsService.remove(user.id, id)
  }
}
