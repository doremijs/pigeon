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
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ApplicationEnvironmentsQueryDto } from './dto/query.dto'

@Controller('application-environments')
@ApiTags('应用的环境')
export class ApplicationEnvironmentsController {
  constructor(private readonly applicationEnvironmentsService: ApplicationEnvironmentsService) {}

  @PigeonAction('POST', '', '创建应用的环境')
  @ApiBody({ type: CreateApplicationEnvironmentDto })
  @ApiCreatedResponse({ type: ApplicationEnvironmentModel })
  create(@Body() createApplicationEnvironmentDto: CreateApplicationEnvironmentDto) {
    return this.applicationEnvironmentsService.create(createApplicationEnvironmentDto)
  }

  @PigeonAction('GET', '', '查询应用的环境列表')
  @ApiOkResponse({ type: ApplicationEnvironmentListDto })
  findMany(@Query() query: ApplicationEnvironmentsQueryDto) {
    return this.applicationEnvironmentsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询应用的环境详情')
  @ApiOkResponse({ type: ApplicationEnvironmentModel })
  findOne(@Param('id') id: string) {
    return this.applicationEnvironmentsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新应用的环境')
  @ApiBody({ type: UpdateApplicationEnvironmentDto })
  @ApiOkResponse({ type: ApplicationEnvironmentModel })
  update(@Param('id') id: string, @Body() updateApplicationEnvironmentDto: UpdateApplicationEnvironmentDto) {
    return this.applicationEnvironmentsService.update(id, updateApplicationEnvironmentDto)
  }

  @PigeonAction('DELETE', 'batch', '批量删除应用的环境')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.applicationEnvironmentsService.batchRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id', '删除应用的环境')
  remove(@Param('id') id: string) {
    return this.applicationEnvironmentsService.remove(id)
  }
}
