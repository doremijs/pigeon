// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import {
  CreateApplicationDto,
  UpdateApplicationDto,
  ApplicationModel,
  ApplicationListDto,
  UpdateUserApplicationRoleDto
} from './dto/applications.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { ApplicationsQueryDto } from './dto/query.dto'
import { User } from '@/decorators/user'
import { JWTUser } from '@/types/user'

@Controller('applications')
@ApiTags('应用')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @PigeonAction('POST', '', '创建应用')
  @ApiBody({ type: CreateApplicationDto })
  @ApiCreatedResponse({ type: ApplicationModel })
  create(@User() user: JWTUser, @Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(user.id, createApplicationDto)
  }

  @PigeonAction('GET', '', '查询应用列表')
  @ApiOkResponse({ type: ApplicationListDto })
  findMany(@User() user: JWTUser, @Query() query: ApplicationsQueryDto) {
    return this.applicationsService.findMany(user.id, query)
  }

  @PigeonAction('GET', ':id', '查询应用详情')
  @ApiOkResponse({ type: ApplicationModel })
  findOne(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationsService.findOne(user.id, id)
  }

  @PigeonAction('PATCH', ':id', '更新应用')
  @ApiBody({ type: UpdateApplicationDto })
  @ApiOkResponse({ type: ApplicationModel })
  update(@User() user: JWTUser, @Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(user.id, id, updateApplicationDto)
  }

  @PigeonAction('PATCH', ':id/users', '更新应用中成员的角色')
  @ApiBody({ type: UpdateUserApplicationRoleDto })
  updateUserRole(@User() user: JWTUser, @Param('id') id: string, @Body() updateUserRoleDto: UpdateUserApplicationRoleDto) {
    return this.applicationsService.updateUserRole(user.id, id, updateUserRoleDto)
  }

  @PigeonAction('DELETE', ':id/s', '逻辑删除应用')
  softRemove(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationsService.softRemove(user.id, id)
  }
}
