// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectModel,
  ProjectListDto
} from './dto/projects.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { ProjectsQueryDto } from './dto/query.dto'

@Controller('projects')
@ApiTags('项目')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @PigeonAction('POST', '', '创建项目')
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ type: ProjectModel })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto)
  }

  @PigeonAction('GET', '', '查询项目列表')
  @ApiOkResponse({ type: ProjectListDto })
  findMany(@Query() query: ProjectsQueryDto) {
    return this.projectsService.findMany(query)
  }

  // TODO 导出

  @PigeonAction('GET', ':id', '查询项目详情')
  @ApiOkResponse({ type: ProjectModel })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @PigeonAction('PATCH', ':id', '更新项目')
  @ApiBody({ type: UpdateProjectDto })
  @ApiOkResponse({ type: ProjectModel })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto)
  }

  @PigeonAction('DELETE', 'batch/s', '批量逻辑删除项目')
  batchSoftRemove(@Body() body: CommonBatchRemoveDto) {
    return this.projectsService.batchSoftRemove(body.ids)
  }

  @PigeonAction('DELETE', ':id/s', '逻辑删除项目')
  softRemove(@Param('id') id: string) {
    return this.projectsService.softRemove(id)
  }
}
