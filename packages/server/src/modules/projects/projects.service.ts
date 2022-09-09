// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  EProjectUserRole,
  Prisma,
  Project,
  ProjectUserRole
} from '@prisma/client'
import { buildOrder, buildWhere } from '../common/utils'
import type { WhereQuery } from '../common/utils'
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateUserProjectRoleDto
} from './dto/projects.dto'
import { ProjectsQueryDto } from './dto/query.dto'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        creator: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  isInProject(
    userId: string,
    project: Project & {
      users: ProjectUserRole[]
    }
  ) {
    return project.users.some(user => user.userId === userId)
  }

  isProjectAdmin(
    userId: string,
    project: Project & {
      users: ProjectUserRole[]
    }
  ) {
    return project.users.some(
      user => user.userId === userId && user.role === 'admin'
    )
  }

  async findMany(userId: string, queryDto: ProjectsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ProjectWhereInput = buildWhere({
      deletedAt: null,
      ...rest
    } as WhereQuery)
    // 仅查询我相关的项目
    where.users = {
      some: {
        userId: userId
      }
    }
    const data = await this.prisma.project.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter)
      // include: {
      //   users: true,
      //   creator: true,
      //   applications: true,
      //   configMaps: true
      // }
    })
    const total = await this.prisma.project.count({ where })
    return { total, data }
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        users: true
        // creator: true,
        // applications: true,
        // configMaps: true
      }
    })
    if (this.isInProject(userId, project)) {
      return project
    }
    throw new ForbiddenException('禁止访问')
  }

  async update(userId: string, id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isProjectAdmin(userId, project)) {
      return this.prisma.project.update({
        data: updateProjectDto,
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async updateUserRole(
    currentUserId: string,
    id: string,
    dto: UpdateUserProjectRoleDto
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isProjectAdmin(currentUserId, project)) {
      const { userId, role } = dto
      const projectId = project.id
      return this.prisma.projectUserRole.upsert({
        where: {
          userId_projectId: {
            userId,
            projectId
          }
        },
        create: {
          role: role,
          userId,
          projectId
        },
        update: {
          role: role
        }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async softRemove(userId: string, id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (
      project.users.some(
        user => user.userId === userId && user.role === 'admin'
      )
    ) {
      return this.prisma.project.update({
        data: { deletedAt: new Date() },
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }
}
