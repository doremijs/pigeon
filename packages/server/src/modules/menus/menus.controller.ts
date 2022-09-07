// Auto generated
import { Controller, Body, Param, Query } from '@nestjs/common'
import { MenusService } from './menus.service'
import {
  CreateMenuDto,
  UpdateMenuDto,
  MenuModel,
  MenuListDto
} from './dto/menus.dto'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DoremiAction } from '@/decorators/action'
import { CommonBatchRemoveDto } from '@/modules/common/common.dto'
import { MenusQueryDto } from './dto/query.dto'

@Controller('menus')
@ApiTags('菜单')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @DoremiAction('POST', '', '创建菜单')
  @ApiBody({ type: CreateMenuDto })
  @ApiCreatedResponse({ type: MenuModel })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto)
  }

  @DoremiAction('GET', '', '查询菜单列表')
  @ApiOkResponse({ type: MenuListDto })
  findMany(@Query() query: MenusQueryDto) {
    return this.menusService.findMany(query)
  }

  // TODO 导出

  @DoremiAction('GET', ':id', '查询菜单详情')
  @ApiOkResponse({ type: MenuModel })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id)
  }

  @DoremiAction('PATCH', ':id', '更新菜单')
  @ApiBody({ type: UpdateMenuDto })
  @ApiOkResponse({ type: MenuModel })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto)
  }

  @DoremiAction('DELETE', 'batch', '批量删除菜单')
  batchRemove(@Body() body: CommonBatchRemoveDto) {
    return this.menusService.batchRemove(body.ids)
  }

  @DoremiAction('DELETE', ':id', '删除菜单')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id)
  }
}
