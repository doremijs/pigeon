// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { buildOrder } from '../common/utils'
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto'
import { PostsQueryDto } from './dto/query.dto'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto })
  }

  async findMany(queryDto: PostsQueryDto) {
    const { sorter, page = 1, pageSize = 10, ...rest } = queryDto
    const where: Prisma.PostWhereInput = {
      deletedAt: null,
      ...rest
    }
    const data = await this.prisma.post.findMany({
      where,
      skip: pageSize * (page - 1),
      take: pageSize,
      orderBy: buildOrder(sorter),
      include: {
        category: true
      }
    })
    const total = await this.prisma.post.count({ where })
    return { total, data }
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        category: true
      }
    })
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      data: updatePostDto,
      where: { id }
    })
  }

  softRemove(id: string) {
    return this.prisma.post.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }

  batchSoftRemove(ids: string[]) {
    return this.prisma.post.updateMany({
      data: { deletedAt: new Date() },
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
