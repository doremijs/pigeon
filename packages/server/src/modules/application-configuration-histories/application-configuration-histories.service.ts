// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder, buildWhere } from '../common/utils'
import type { WhereQuery } from '../common/utils'
import { CreateApplicationConfigurationHistoryDto } from './dto/application-configuration-histories.dto'
import { ApplicationConfigurationHistoriesQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationConfigurationHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    userId: string,
    createApplicationConfigurationHistoryDto: CreateApplicationConfigurationHistoryDto
  ) {
    return this.prisma.applicationConfigurationHistory.create({
      data: {
        ...createApplicationConfigurationHistoryDto,
        createdBy: userId
      }
    })
  }

  async findMany(
    userId: string,
    queryDto: ApplicationConfigurationHistoriesQueryDto
  ) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationConfigurationHistoryWhereInput = buildWhere({
      deletedAt: null,
      ...rest
    } as WhereQuery)
    // 仅查询我的
    where.applicationEnvironment = {
      users: {
        some: {
          userId
        }
      }
    }
    const data = await this.prisma.applicationConfigurationHistory.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configurations: true
      }
    })
    const total = await this.prisma.applicationConfigurationHistory.count({
      where
    })
    return { total, data }
  }

  async findOne(userId: string, id: string) {
    const history =
      await this.prisma.applicationConfigurationHistory.findUnique({
        where: { id },
        include: {
          configurations: true,
          applicationEnvironment: {
            include: {
              users: true
            }
          }
        }
      })
    if (
      history.applicationEnvironment.users.some(user => user.userId === userId)
    ) {
      return history
    }
    throw new ForbiddenException('禁止访问')
  }
}
