// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto'
import { ProjectsQueryDto } from './dto/query.dto'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({ data: createProjectDto })
  }

  async findMany(queryDto: ProjectsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.ProjectWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.project.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        users: true,
        creator: true,
        applications: true,
        configMaps: true
      }
    })
    const total = await this.prisma.project.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        users: true,
        creator: true,
        applications: true,
        configMaps: true
      }
    })
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      data: updateProjectDto,
      where: { id }
    })
  }

  softRemove(id: string) {
    return this.prisma.project.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }

  batchSoftRemove(ids: string[]) {
    return this.prisma.project.updateMany({
      data: { deletedAt: new Date() },
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
