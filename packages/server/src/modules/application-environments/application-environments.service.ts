// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  ApplicationEnvironment,
  ApplicationEnvironmentUserRole,
  Prisma
} from '@prisma/client'
import { buildInclude, buildOrder, buildWhere } from '../common/utils'
import type { WhereQuery } from '../common/utils'
import {
  CreateApplicationEnvironmentDto,
  UpdateApplicationEnvironmentDto,
  UpdateApplicationEnvironmentRoleDto
} from './dto/application-environments.dto'
import { ApplicationEnvironmentsQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationEnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  isInEnvironment(
    userId: string,
    environment: ApplicationEnvironment & {
      users: ApplicationEnvironmentUserRole[]
    }
  ) {
    return environment.users.some(user => user.userId === userId)
  }

  isEnvironmentAdmin(
    userId: string,
    environment: ApplicationEnvironment & {
      users: ApplicationEnvironmentUserRole[]
    }
  ) {
    return environment.users.some(
      user => user.userId === userId && user.role === 'admin'
    )
  }

  create(
    userId: string,
    createApplicationEnvironmentDto: CreateApplicationEnvironmentDto
  ) {
    return this.prisma.applicationEnvironment.create({
      data: {
        ...createApplicationEnvironmentDto,
        createdBy: userId,
        users: {
          create: [
            {
              user: userId,
              role: 'admin'
            }
          ]
        }
      }
    })
  }

  async findMany(userId: string, queryDto: ApplicationEnvironmentsQueryDto) {
    const { sorter, include, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationEnvironmentWhereInput = buildWhere(
      rest as WhereQuery
    )
    // 仅查询我相关的项目
    where.users = {
      some: {
        userId: userId
      }
    }
    const data = await this.prisma.applicationEnvironment.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: buildInclude(include)
    })
    const total = await this.prisma.applicationEnvironment.count({ where })
    return { total, data }
  }

  async findOne(userId: string, id: string) {
    const environment = await this.prisma.applicationEnvironment.findUnique({
      where: { id },
      include: {
        // application: true,
        // configurations: true,
        // configurationHistories: true,
        users: true
      }
    })
    if (this.isInEnvironment(userId, environment)) {
      return environment
    }
    throw new ForbiddenException('禁止访问')
  }

  async update(
    userId: string,
    id: string,
    updateApplicationEnvironmentDto: UpdateApplicationEnvironmentDto
  ) {
    const environment = await this.prisma.applicationEnvironment.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isEnvironmentAdmin(userId, environment)) {
      return this.prisma.applicationEnvironment.update({
        data: updateApplicationEnvironmentDto,
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async updateUserRole(
    currentUserId: string,
    id: string,
    dto: UpdateApplicationEnvironmentRoleDto
  ) {
    const environment = await this.prisma.applicationEnvironment.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isEnvironmentAdmin(currentUserId, environment)) {
      const { userId, role } = dto
      const environmentId = environment.id
      return this.prisma.applicationEnvironmentUserRole.upsert({
        where: {
          userId_applicationEnvironmentId: {
            userId,
            applicationEnvironmentId: environmentId
          }
        },
        create: {
          role: role,
          userId,
          applicationEnvironmentId: environmentId
        },
        update: {
          role: role
        }
      })
    }
    throw new ForbiddenException('禁止访问')
  }

  async remove(userId: string, id: string) {
    const environment = await this.prisma.applicationEnvironment.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
    if (this.isEnvironmentAdmin(userId, environment)) {
      return this.prisma.applicationEnvironment.delete({
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }
}
