// Auto generated
import { PartialType } from '@nestjs/swagger'
import { EApplicationEnvironmentUserRole } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'

export class CreateApplicationEnvironmentDto {
  /**
   * 环境名称
   */
  @IsNotEmpty()
  @IsString()
  name: string
  /**
   * 环境描述
   */
  @IsOptional()
  @IsString()
  description?: string
  /**
   * web域名匹配规则
   */
  @IsOptional()
  @IsString()
  domainRule?: string
  @IsNotEmpty()
  @IsString()
  applicationId: string
}

export class UpdateApplicationEnvironmentDto extends PartialType(CreateApplicationEnvironmentDto) {
}

export class UpdateApplicationEnvironmentRoleDto {
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
  @IsEnum(EApplicationEnvironmentUserRole)
  role: EApplicationEnvironmentUserRole
}

export class ApplicationEnvironmentModel extends CreateApplicationEnvironmentDto {
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
}

export class ApplicationEnvironmentListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ApplicationEnvironmentModel[]
}
