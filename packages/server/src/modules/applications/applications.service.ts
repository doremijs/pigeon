// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Application, ApplicationUserRole, Prisma } from '@prisma/client'
import { buildInclude, buildOrder, buildWhere } from '../common/utils'
import type { WhereQuery } from '../common/utils'
import {
  CreateApplicationDto,
  UpdateApplicationDto,
  UpdateUserApplicationRoleDto
} from './dto/applications.dto'
import { ApplicationsQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  isInApplication(
    userId: string,
    application: Application & {
      users: ApplicationUserRole[]
    }
  ) {
    return application.users.some(user => user.userId === userId)
  }

  isApplicationAdmin(
    userId: string,
    application: Application & {
      users: ApplicationUserRole[]
    }
  ) {
    return application.users.some(
      user => user.userId === userId && user.role === 'admin'
    )
  }

  create(userId: string, createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        ...createApplicationDto,
        createdBy: userId,
        users: {
          create: [
            {
              role: 'admin',
              userId
            }
          ]
        }
      }
    })
  }

  async findMany(userId: string, queryDto: ApplicationsQueryDto) {
    const { sorter, include, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationWhereInput = buildWhere({
      deletedAt: null,
      ...rest
    } as WhereQuery)
    // 仅查询我相关的应用
    where.users = {
      some: {
        userId
      }
    }
    const data = await this.prisma.application.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: buildInclude(include)
    })
    const total = await this.prisma.application.count({ where })
    return { total, data }
  }

  async findOne(userId: string, id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        // project: true,
        // environments: true,
        // creator: true,
        users: true
      }
    })
    if (this.isInApplication(userId, application)) {
      return application
    }
    throw new ForbiddenException('禁止访问')
  }

  async update(
    userId: string,
    id: string,
    updateApplicationDto: UpdateApplicationDto
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { users: true }
    })
    if (this.isApplicationAdmin(userId, application)) {
      return this.prisma.application.update({
        data: updateApplicationDto,
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async updateUserRole(
    currentUserId: string,
    id: string,
    dto: UpdateUserApplicationRoleDto
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isApplicationAdmin(currentUserId, application)) {
      const { userId, role } = dto
      const applicationId = application.id
      return this.prisma.applicationUserRole.upsert({
        where: {
          userId_applicationId: {
            userId,
            applicationId
          }
        },
        create: {
          role: role,
          userId,
          applicationId
        },
        update: {
          role: role
        }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async softRemove(userId: string, id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { users: true }
    })
    if (this.isApplicationAdmin(userId, application)) {
      return this.prisma.application.update({
        data: { deletedAt: new Date() },
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }
}
