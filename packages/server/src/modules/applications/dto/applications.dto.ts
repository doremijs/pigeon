// Auto generated
import { PartialType } from '@nestjs/swagger'
import { EApplicationUserRole } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'

export class CreateApplicationDto {
  /**
   * 应用名称
   */
  @IsNotEmpty()
  @IsString()
  name: string
  /**
   * 应用描述
   */
  @IsOptional()
  @IsString()
  description?: string
  @IsNotEmpty()
  @IsString()
  projectId: string
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
}

export class UpdateUserApplicationRoleDto {
  /**
   * 人员ID
   */
  @IsNotEmpty()
  @IsString()
  userId: string
  /**
   * 角色
   */
  @IsNotEmpty()
  @IsEnum(EApplicationUserRole)
  role: EApplicationUserRole
}
export class ApplicationModel extends CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  id: string
  /**
   * 创建人
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date
}

export class ApplicationListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationModel[]
}
