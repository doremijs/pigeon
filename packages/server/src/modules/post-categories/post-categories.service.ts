// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreatePostCategoryDto, UpdatePostCategoryDto } from './dto/post-categories.dto'
import { PostCategoriesQueryDto } from './dto/query.dto'

@Injectable()
export class PostCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostCategoryDto: CreatePostCategoryDto) {
    return this.prisma.postCategory.create({ data: createPostCategoryDto })
  }

  async findMany(queryDto: PostCategoriesQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.PostCategoryWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.postCategory.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        posts: true
      }
    })
    const total = await this.prisma.postCategory.count({ where })
    return { total, data }
  }

  async findAll(queryDto: PostCategoriesQueryDto) {
    const where: Prisma.PostCategoryWhereInput = {
      deletedAt: null,
      ...queryDto
    }
    const data = await this.prisma.postCategory.findMany({
      where,
      include: {
        posts: true
      }
    })
    return { total: data.length, data }
  }

  findOne(id: string) {
    return this.prisma.postCategory.findUnique({
      where: { id },
      include: {
        posts: true
      }
    })
  }

  update(id: string, updatePostCategoryDto: UpdatePostCategoryDto) {
    return this.prisma.postCategory.update({
      data: updatePostCategoryDto,
      where: { id }
    })
  }

  softRemove(id: string) {
    return this.prisma.postCategory.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }

  batchSoftRemove(ids: string[]) {
    return this.prisma.postCategory.updateMany({
      data: { deletedAt: new Date() },
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
