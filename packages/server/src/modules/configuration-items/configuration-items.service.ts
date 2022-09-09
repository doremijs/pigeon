// Auto generated
import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
  CreateConfigurationItemDto,
  UpdateConfigurationItemDto
} from './dto/configuration-items.dto'

@Injectable()
export class ConfigurationItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    userId: string,
    createConfigurationItemDto: CreateConfigurationItemDto
  ) {
    return this.prisma.configurationItem.create({
      data: {
        ...createConfigurationItemDto,
        createdBy: userId
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
