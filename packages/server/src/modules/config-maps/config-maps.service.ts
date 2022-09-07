// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateConfigMapDto, UpdateConfigMapDto } from './dto/config-maps.dto'
import { ConfigMapsQueryDto } from './dto/query.dto'

@Injectable()
export class ConfigMapsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createConfigMapDto: CreateConfigMapDto) {
    return this.prisma.configMap.create({ data: createConfigMapDto })
  }

  async findMany(queryDto: ConfigMapsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ConfigMapWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.configMap.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configuration: true,
        project: true
      }
    })
    const total = await this.prisma.configMap.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.configMap.findUnique({
      where: { id },
      include: {
        configuration: true,
        project: true
      }
    })
  }

  update(id: string, updateConfigMapDto: UpdateConfigMapDto) {
    return this.prisma.configMap.update({
      data: updateConfigMapDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.configMap.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.configMap.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
