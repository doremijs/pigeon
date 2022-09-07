// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateConfigurationItemDto, UpdateConfigurationItemDto } from './dto/configuration-items.dto'
import { ConfigurationItemsQueryDto } from './dto/query.dto'

@Injectable()
export class ConfigurationItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createConfigurationItemDto: CreateConfigurationItemDto) {
    return this.prisma.configurationItem.create({ data: createConfigurationItemDto })
  }

  async findMany(queryDto: ConfigurationItemsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ConfigurationItemWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.configurationItem.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configMap: true,
        applicationConfiguration: true,
        applicationConfigurationHistory: true
      }
    })
    const total = await this.prisma.configurationItem.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.configurationItem.findUnique({
      where: { id },
      include: {
        configMap: true,
        applicationConfiguration: true,
        applicationConfigurationHistory: true
      }
    })
  }

  update(id: string, updateConfigurationItemDto: UpdateConfigurationItemDto) {
    return this.prisma.configurationItem.update({
      data: updateConfigurationItemDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.configurationItem.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.configurationItem.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
