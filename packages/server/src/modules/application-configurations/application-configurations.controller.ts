// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationConfigurationsService } from './application-configurations.service'
import {
  CreateApplicationConfigurationDto,
  UpdateApplicationConfigurationDto,
  ApplicationConfigurationModel,
  ApplicationConfigurationListDto
} from './dto/application-configurations.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { ApplicationConfigurationsQueryDto } from './dto/query.dto'
import { User } from '@/decorators/user'
import { JWTUser } from '@/types/user'

@Controller('application-configurations')
@ApiTags('应用的配置')
export class ApplicationConfigurationsController {
  constructor(private readonly applicationConfigurationsService: ApplicationConfigurationsService) {}

  @PigeonAction('POST', '', '创建应用的配置')
  @ApiBody({ type: CreateApplicationConfigurationDto })
  @ApiCreatedResponse({ type: ApplicationConfigurationModel })
  create(@User() user: JWTUser, @Body() createApplicationConfigurationDto: CreateApplicationConfigurationDto) {
    return this.applicationConfigurationsService.create(user.id, createApplicationConfigurationDto)
  }

  @PigeonAction('GET', '', '查询应用的配置列表')
  @ApiOkResponse({ type: ApplicationConfigurationListDto })
  findMany(@User() user: JWTUser, @Query() query: ApplicationConfigurationsQueryDto) {
    return this.applicationConfigurationsService.findMany(user.id, query)
  }

  @PigeonAction('PATCH', ':id', '更新应用的配置')
  @ApiBody({ type: UpdateApplicationConfigurationDto })
  @ApiOkResponse({ type: ApplicationConfigurationModel })
  update(@User() user: JWTUser, @Param('id') id: string, @Body() updateApplicationConfigurationDto: UpdateApplicationConfigurationDto) {
    return this.applicationConfigurationsService.update(user.id, id, updateApplicationConfigurationDto)
  }

  @PigeonAction('DELETE', ':id', '删除应用的配置')
  remove(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationConfigurationsService.remove(user.id, id)
  }
}
