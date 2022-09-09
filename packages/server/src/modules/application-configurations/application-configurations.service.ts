// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import {
  ApplicationEnvironment,
  ApplicationEnvironmentUserRole,
  Prisma
} from '@prisma/client'
import { buildOrder, buildWhere } from '../common/utils'
import type { WhereQuery } from '../common/utils'
import {
  CreateApplicationConfigurationDto,
  UpdateApplicationConfigurationDto
} from './dto/application-configurations.dto'
import { ApplicationConfigurationsQueryDto } from './dto/query.dto'
import { ApplicationConfigurationHistoriesService } from '../application-configuration-histories/application-configuration-histories.service'

@Injectable()
export class ApplicationConfigurationsService {
  constructor(private readonly prisma: PrismaService, private readonly historyService: ApplicationConfigurationHistoriesService) {}

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
    createApplicationConfigurationDto: CreateApplicationConfigurationDto
  ) {
    return this.prisma.applicationConfiguration.create({
      data: {
        ...createApplicationConfigurationDto,
        createdBy: userId
      }
    })
  }

  async findMany(userId: string, queryDto: ApplicationConfigurationsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationConfigurationWhereInput = buildWhere(
      rest as WhereQuery
    )
    // 仅查询我能看到的
    where.applicationEnvironment = {
      users: {
        some: {
          userId
        }
      }
    }
    const data = await this.prisma.applicationConfiguration.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configurations: true,
        // applicationEnvironment: true
      }
    })
    const total = await this.prisma.applicationConfiguration.count({ where })
    return { total, data }
  }

  async update(
    userId: string,
    id: string,
    updateApplicationConfigurationDto: UpdateApplicationConfigurationDto
  ) {
    const configuration = await this.prisma.applicationConfiguration.findUnique(
      {
        where: { id },
        include: {
          configurations: true,
          applicationEnvironment: {
            include: {
              users: true
            }
          }
        }
      }
    )
    // FIXME
    if (this.isEnvironmentAdmin(userId, configuration.applicationEnvironment)) {
      const ret = await this.prisma.applicationConfiguration.update({
        // @ts-ignore
        data: {
          ...updateApplicationConfigurationDto
        },
        where: { id }
      })
      await this.historyService.create(userId, {
        applicationEnvironmentId: configuration.applicationEnvironmentId,
        version: configuration.version,
        configurations: configuration.configurations
      })
      return ret
    }
    throw new ForbiddenException('禁止访问')
  }

  async remove(userId: string, id: string) {
    const configuration = await this.prisma.applicationConfiguration.findUnique(
      {
        where: { id },
        include: {
          applicationEnvironment: {
            include: {
              users: true
            }
          }
        }
      }
    )
    if (this.isEnvironmentAdmin(userId, configuration.applicationEnvironment)) {
      return this.prisma.applicationConfiguration.delete({
        where: { id }
      })
    }
    throw new ForbiddenException('禁止访问')
  }
}
