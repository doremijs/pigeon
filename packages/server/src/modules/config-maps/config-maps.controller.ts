// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ConfigMapsService } from './config-maps.service'
import {
  CreateConfigMapDto,
  UpdateConfigMapDto,
  ConfigMapModel,
  ConfigMapListDto
} from './dto/config-maps.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ConfigMapsQueryDto } from './dto/query.dto'

@Controller('config-maps')
@ApiTags('配置字典')
export class ConfigMapsController {
  constructor(private readonly configMapsService: ConfigMapsService) {}

  @PigeonAction('POST', '', '创建配置字典')
  @ApiBody({ type: CreateConfigMapDto })
  @ApiCreatedResponse({ type: ConfigMapModel })
  create(@Body() createConfigMapDto: CreateConfigMapDto) {
    return this.configMapsService.create(createConfigMapDto)
  }

  @PigeonAction('GET', '', '查询配置字典列表')
  @ApiOkResponse({ type: ConfigMapListDto })
  findMany(@Query() query: ConfigMapsQueryDto) {
    return this.configMapsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询配置字典详情')
  @ApiOkResponse({ type: ConfigMapModel })
  findOne(@Param('id') id: string) {
    return this.configMapsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新配置字典')
  @ApiBody({ type: UpdateConfigMapDto })
  @ApiOkResponse({ type: ConfigMapModel })
  update(@Param('id') id: string, @Body() updateConfigMapDto: UpdateConfigMapDto) {
    return this.configMapsService.update(id, updateConfigMapDto)
  }

  @PigeonAction('DELETE', 'batch', '批量删除配置字典')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.configMapsService.batchRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id', '删除配置字典')
  remove(@Param('id') id: string) {
    return this.configMapsService.remove(id)
  }
}
