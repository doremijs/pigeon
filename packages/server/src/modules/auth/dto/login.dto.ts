import { IsString, MinLength, MaxLength } from 'class-validator'

export class LoginDto {
  /**
   * 用户名
   */
  @IsString()
  @MinLength(6, { message: '最少6位' })
  @MaxLength(18, { message: '最多18位' })
  username: string

  /**
   * 密码
   */
  @IsString()
  @MinLength(6, { message: '最少6位密码' })
  @MaxLength(18, { message: '最多18位密码' })
  password: string
}
