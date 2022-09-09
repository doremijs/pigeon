// Auto generated
import { PartialType } from '@nestjs/swagger'
import { EProjectUserRole } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'

export class CreateProjectDto {
  /**
   * 项目名称
   */
  @IsNotEmpty()
  @IsString()
  name: string
  /**
   * 项目描述
   */
  @IsOptional()
  @IsString()
  description?: string
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
}

export class UpdateUserProjectRoleDto {
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
  @IsEnum(EProjectUserRole)
  role: EProjectUserRole
}

export class ProjectModel extends CreateProjectDto {
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

export class ProjectListDto {
  /**
   * 总数
   */
  total: number
  /**
   * 当前页数据
   */
  data: ProjectModel[]
}
