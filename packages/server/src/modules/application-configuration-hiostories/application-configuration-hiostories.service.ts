// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateApplicationConfigurationHiostoryDto, UpdateApplicationConfigurationHiostoryDto } from './dto/application-configuration-hiostories.dto'
import { ApplicationConfigurationHiostoriesQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationConfigurationHiostoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationConfigurationHiostoryDto: CreateApplicationConfigurationHiostoryDto) {
    return this.prisma.applicationConfigurationHiostory.create({ data: createApplicationConfigurationHiostoryDto })
  }

  async findMany(queryDto: ApplicationConfigurationHiostoriesQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationConfigurationHiostoryWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.applicationConfigurationHiostory.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        configuration: true,
        applicationEnvironment: true
      }
    })
    const total = await this.prisma.applicationConfigurationHiostory.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.applicationConfigurationHiostory.findUnique({
      where: { id },
      include: {
        configuration: true,
        applicationEnvironment: true
      }
    })
  }

  update(id: string, updateApplicationConfigurationHiostoryDto: UpdateApplicationConfigurationHiostoryDto) {
    return this.prisma.applicationConfigurationHiostory.update({
      data: updateApplicationConfigurationHiostoryDto,
      where: { id }
    })
  }

  softRemove(id: string) {
    return this.prisma.applicationConfigurationHiostory.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }

  batchSoftRemove(ids: string[]) {
    return this.prisma.applicationConfigurationHiostory.updateMany({
      data: { deletedAt: new Date() },
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
