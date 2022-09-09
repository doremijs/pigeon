// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectModel,
  ProjectListDto,
  UpdateUserProjectRoleDto
} from './dto/projects.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { ProjectsQueryDto } from './dto/query.dto'
import { User } from '@/decorators/user'
import { JWTUser } from '@/types/user'

@Controller('projects')
@ApiTags('项目')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @PigeonAction('POST', '', '创建项目')
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ type: ProjectModel })
  create(@User() user: JWTUser, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(user.id, createProjectDto)
  }

  @PigeonAction('GET', '', '查询项目列表')
  @ApiOkResponse({ type: ProjectListDto })
  findMany(@User() user: JWTUser, @Query() query: ProjectsQueryDto) {
    return this.projectsService.findMany(user.id, query)
  }

  @PigeonAction('GET', ':id', '查询项目详情')
  @ApiOkResponse({ type: ProjectModel })
  findOne(@User() user: JWTUser, @Param('id') id: string) {
    return this.projectsService.findOne(user.id, id)
  }

  @PigeonAction('PATCH', ':id', '更新项目')
  @ApiBody({ type: UpdateProjectDto })
  @ApiOkResponse({ type: ProjectModel })
  update(@User() user: JWTUser, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(user.id, id, updateProjectDto)
  }

  @PigeonAction('PATCH', ':id/users', '更新项目中成员的角色')
  @ApiBody({ type: UpdateUserProjectRoleDto })
  updateUserRole(@User() user: JWTUser, @Param('id') id: string, @Body() updateUserRoleDto: UpdateUserProjectRoleDto) {
    return this.projectsService.updateUserRole(user.id, id, updateUserRoleDto)
  }

  @PigeonAction('DELETE', ':id/s', '逻辑删除项目')
  softRemove(@User() user: JWTUser, @Param('id') id: string) {
    return this.projectsService.softRemove(user.id, id)
  }
}
