// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import {
  CreateApplicationDto,
  UpdateApplicationDto,
  ApplicationModel,
  ApplicationListDto
} from './dto/applications.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ApplicationsQueryDto } from './dto/query.dto'

@Controller('applications')
@ApiTags('应用')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @PigeonAction('POST', '', '创建应用')
  @ApiBody({ type: CreateApplicationDto })
  @ApiCreatedResponse({ type: ApplicationModel })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto)
  }

  @PigeonAction('GET', '', '查询应用列表')
  @ApiOkResponse({ type: ApplicationListDto })
  findMany(@Query() query: ApplicationsQueryDto) {
    return this.applicationsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询应用详情')
  @ApiOkResponse({ type: ApplicationModel })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新应用')
  @ApiBody({ type: UpdateApplicationDto })
  @ApiOkResponse({ type: ApplicationModel })
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto)
  }

  @PigeonAction('DELETE', 'batch', '批量删除应用')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.applicationsService.batchRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id', '删除应用')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id)
  }
}
