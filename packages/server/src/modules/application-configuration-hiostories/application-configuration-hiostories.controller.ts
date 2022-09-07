// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationConfigurationHiostoriesService } from './application-configuration-hiostories.service'
import {
  CreateApplicationConfigurationHiostoryDto,
  UpdateApplicationConfigurationHiostoryDto,
  ApplicationConfigurationHiostoryModel,
  ApplicationConfigurationHiostoryListDto
} from './dto/application-configuration-hiostories.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ApplicationConfigurationHiostoriesQueryDto } from './dto/query.dto'

@Controller('application-configuration-hiostories')
@ApiTags('应用的配置历史')
export class ApplicationConfigurationHiostoriesController {
  constructor(private readonly applicationConfigurationHiostoriesService: ApplicationConfigurationHiostoriesService) {}

  @PigeonAction('POST', '', '创建应用的配置历史')
  @ApiBody({ type: CreateApplicationConfigurationHiostoryDto })
  @ApiCreatedResponse({ type: ApplicationConfigurationHiostoryModel })
  create(@Body() createApplicationConfigurationHiostoryDto: CreateApplicationConfigurationHiostoryDto) {
    return this.applicationConfigurationHiostoriesService.create(createApplicationConfigurationHiostoryDto)
  }

  @PigeonAction('GET', '', '查询应用的配置历史列表')
  @ApiOkResponse({ type: ApplicationConfigurationHiostoryListDto })
  findMany(@Query() query: ApplicationConfigurationHiostoriesQueryDto) {
    return this.applicationConfigurationHiostoriesService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询应用的配置历史详情')
  @ApiOkResponse({ type: ApplicationConfigurationHiostoryModel })
  findOne(@Param('id') id: string) {
    return this.applicationConfigurationHiostoriesService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新应用的配置历史')
  @ApiBody({ type: UpdateApplicationConfigurationHiostoryDto })
  @ApiOkResponse({ type: ApplicationConfigurationHiostoryModel })
  update(@Param('id') id: string, @Body() updateApplicationConfigurationHiostoryDto: UpdateApplicationConfigurationHiostoryDto) {
    return this.applicationConfigurationHiostoriesService.update(id, updateApplicationConfigurationHiostoryDto)
  }

  @PigeonAction('DELETE', 'batch/s', '批量逻辑删除应用的配置历史')
  batchSoftRemove(@Body() body: CommonBatchRemoveDto) {
    return this.applicationConfigurationHiostoriesService.batchSoftRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id/s', '逻辑删除应用的配置历史')
  softRemove(@Param('id') id: string) {
    return this.applicationConfigurationHiostoriesService.softRemove(id)
  }
}
