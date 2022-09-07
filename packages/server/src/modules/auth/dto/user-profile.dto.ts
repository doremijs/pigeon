export class UserProfile {
  /**
   * ID
   */
  id: string

  /**
   * 用户昵称
   */
  name: string
}

export class UserProfileDto {
  /**
   * access token
   */
  token: string

  /**
   * 用户信息
   */
  user: UserProfile
}
