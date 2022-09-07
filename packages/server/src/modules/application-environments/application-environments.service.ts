// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateApplicationEnvironmentDto, UpdateApplicationEnvironmentDto } from './dto/application-environments.dto'
import { ApplicationEnvironmentsQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationEnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationEnvironmentDto: CreateApplicationEnvironmentDto) {
    return this.prisma.applicationEnvironment.create({ data: createApplicationEnvironmentDto })
  }

  async findMany(queryDto: ApplicationEnvironmentsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationEnvironmentWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.applicationEnvironment.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        application: true,
        configurations: true,
        configurationHistories: true,
        users: true
      }
    })
    const total = await this.prisma.applicationEnvironment.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.applicationEnvironment.findUnique({
      where: { id },
      include: {
        application: true,
        configurations: true,
        configurationHistories: true,
        users: true
      }
    })
  }

  update(id: string, updateApplicationEnvironmentDto: UpdateApplicationEnvironmentDto) {
    return this.prisma.applicationEnvironment.update({
      data: updateApplicationEnvironmentDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.applicationEnvironment.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.applicationEnvironment.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
