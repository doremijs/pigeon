// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreateMenuDto, UpdateMenuDto } from './dto/menus.dto'
import { MenusQueryDto } from './dto/query.dto'

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({ data: createMenuDto })
  }

  async findMany(queryDto: MenusQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.MenuWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.menu.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        parent: true,
        children: true
      }
    })
    const total = await this.prisma.menu.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true
      }
    })
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      data: updateMenuDto,
      where: { id }
    })
  }

  remove(id: string) {
    return this.prisma.menu.delete({
      where: { id }
    })
  }

  batchRemove(ids: string[]) {
    return this.prisma.menu.deleteMany({
      where: {
        id: {}
      }
    })
  }
}
