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
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ApplicationConfigurationsQueryDto } from './dto/query.dto'

@Controller('application-configurations')
@ApiTags('应用的配置')
export class ApplicationConfigurationsController {
  constructor(private readonly applicationConfigurationsService: ApplicationConfigurationsService) {}

  @PigeonAction('POST', '', '创建应用的配置')
  @ApiBody({ type: CreateApplicationConfigurationDto })
  @ApiCreatedResponse({ type: ApplicationConfigurationModel })
  create(@Body() createApplicationConfigurationDto: CreateApplicationConfigurationDto) {
    return this.applicationConfigurationsService.create(createApplicationConfigurationDto)
  }

  @PigeonAction('GET', '', '查询应用的配置列表')
  @ApiOkResponse({ type: ApplicationConfigurationListDto })
  findMany(@Query() query: ApplicationConfigurationsQueryDto) {
    return this.applicationConfigurationsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询应用的配置详情')
  @ApiOkResponse({ type: ApplicationConfigurationModel })
  findOne(@Param('id') id: string) {
    return this.applicationConfigurationsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新应用的配置')
  @ApiBody({ type: UpdateApplicationConfigurationDto })
  @ApiOkResponse({ type: ApplicationConfigurationModel })
  update(@Param('id') id: string, @Body() updateApplicationConfigurationDto: UpdateApplicationConfigurationDto) {
    return this.applicationConfigurationsService.update(id, updateApplicationConfigurationDto)
  }

  @PigeonAction('DELETE', 'batch', '批量删除应用的配置')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.applicationConfigurationsService.batchRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id', '删除应用的配置')
  remove(@Param('id') id: string) {
    return this.applicationConfigurationsService.remove(id)
  }
}
