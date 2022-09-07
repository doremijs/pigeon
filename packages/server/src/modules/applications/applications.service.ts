// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateApplicationDto, UpdateApplicationDto } from './dto/applications.dto'
import { ApplicationsQueryDto } from './dto/query.dto'

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({ data: createApplicationDto })
  }

  async findMany(queryDto: ApplicationsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ApplicationWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.application.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        project: true,
        environments: true,
        creator: true,
        users: true
      }
    })
    const total = await this.prisma.application.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
      include: {
        project: true,
        environments: true,
        creator: true,
        users: true
      }
    })
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return this.prisma.application.update({
      data: updateApplicationDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.application.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.application.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
