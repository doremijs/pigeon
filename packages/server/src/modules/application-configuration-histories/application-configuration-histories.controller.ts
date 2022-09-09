// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { ApplicationConfigurationHistoriesService } from './application-configuration-histories.service'
import {
  CreateApplicationConfigurationHistoryDto,
  UpdateApplicationConfigurationHistoryDto,
  ApplicationConfigurationHistoryModel,
  ApplicationConfigurationHistoryListDto
} from './dto/application-configuration-histories.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PigeonAction } from '@/decorators/action'
import { ApplicationConfigurationHistoriesQueryDto } from './dto/query.dto'
import { User } from '@/decorators/user'
import { JWTUser } from '@/types/user'

@Controller('application-configuration-histories')
@ApiTags('应用的配置历史')
export class ApplicationConfigurationHistoriesController {
  constructor(private readonly applicationConfigurationHistoriesService: ApplicationConfigurationHistoriesService) {}

  @PigeonAction('GET', '', '查询应用的配置历史列表')
  @ApiOkResponse({ type: ApplicationConfigurationHistoryListDto })
  findMany(@User() user: JWTUser, @Query() query: ApplicationConfigurationHistoriesQueryDto) {
    return this.applicationConfigurationHistoriesService.findMany(user.id, query)
  }

  @PigeonAction('GET', ':id', '查询应用的配置历史详情')
  @ApiOkResponse({ type: ApplicationConfigurationHistoryModel })
  findOne(@User() user: JWTUser, @Param('id') id: string) {
    return this.applicationConfigurationHistoriesService.findOne(user.id, id)
  }
}
