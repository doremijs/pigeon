// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ConfigurationItemsService } from './configuration-items.service'
import {
  CreateConfigurationItemDto,
  UpdateConfigurationItemDto,
  ConfigurationItemModel,
  ConfigurationItemListDto
} from './dto/configuration-items.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ConfigurationItemsQueryDto } from './dto/query.dto'

@Controller('configuration-items')
@ApiTags('配置项')
export class ConfigurationItemsController {
  constructor(private readonly configurationItemsService: ConfigurationItemsService) {}

  @PigeonAction('POST', '', '创建配置项')
  @ApiBody({ type: CreateConfigurationItemDto })
  @ApiCreatedResponse({ type: ConfigurationItemModel })
  create(@Body() createConfigurationItemDto: CreateConfigurationItemDto) {
    return this.configurationItemsService.create(createConfigurationItemDto)
  }

  @PigeonAction('GET', '', '查询配置项列表')
  @ApiOkResponse({ type: ConfigurationItemListDto })
  findMany(@Query() query: ConfigurationItemsQueryDto) {
    return this.configurationItemsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询配置项详情')
  @ApiOkResponse({ type: ConfigurationItemModel })
  findOne(@Param('id') id: string) {
    return this.configurationItemsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新配置项')
  @ApiBody({ type: UpdateConfigurationItemDto })
  @ApiOkResponse({ type: ConfigurationItemModel })
  update(@Param('id') id: string, @Body() updateConfigurationItemDto: UpdateConfigurationItemDto) {
    return this.configurationItemsService.update(id, updateConfigurationItemDto)
  }

  @PigeonAction('DELETE', 'batch', '批量删除配置项')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.configurationItemsService.batchRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id', '删除配置项')
  remove(@Param('id') id: string) {
    return this.configurationItemsService.remove(id)
  }
}
