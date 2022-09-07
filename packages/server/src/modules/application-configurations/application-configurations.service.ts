// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateApplicationConfigurationDto, UpdateApplicationConfigurationDto } from './dto/application-configurations.dto'
import { ApplicationConfigurationsQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationConfigurationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationConfigurationDto: CreateApplicationConfigurationDto) {
    return this.prisma.applicationConfiguration.create({ data: createApplicationConfigurationDto })
  }

  async findMany(queryDto: ApplicationConfigurationsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationConfigurationWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.applicationConfiguration.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configuration: true,
        applicationEnvironment: true
      }
    })
    const total = await this.prisma.applicationConfiguration.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.applicationConfiguration.findUnique({
      where: { id },
      include: {
        configuration: true,
        applicationEnvironment: true
      }
    })
  }

  update(id: string, updateApplicationConfigurationDto: UpdateApplicationConfigurationDto) {
    return this.prisma.applicationConfiguration.update({
      data: updateApplicationConfigurationDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.applicationConfiguration.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.applicationConfiguration.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
