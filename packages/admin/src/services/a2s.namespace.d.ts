/* eslint-disable */
interface BasicDto {
  [key: string]: any
}
export declare namespace ApiDocuments {
  export interface LoginDto extends BasicDto {
    /**
     * @description 用户名
     */
    username: string
    /**
     * @description 密码
     */
    password: string
  }
  export interface UserProfile extends BasicDto {
    /**
     * @description ID
     */
    id: string
    /**
     * @description 用户昵称
     */
    name: string
  }
  export interface UserProfileDto extends BasicDto {
    /**
     * @description access token
     */
    token: string
    /**
     * @description 用户信息
     */
    user: ApiDocuments.UserProfile
  }
  export interface RegisterUserDto extends BasicDto {
    /**
     * @description 用户名
     */
    username: string
    /**
     * @description 密码
     */
    password: string
  }
  export interface CreatePostCategoryDto extends BasicDto {
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 排序，越大越靠前
     */
    sort?: number
  }
  export interface PostCategoryModel extends BasicDto {
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 排序，越大越靠前
     */
    sort?: number
    id: string
    createdAt: string
    deletedAt?: string
    updatedAt?: string
  }
  export interface PostCategoryListDto extends BasicDto {
    /**
     * @description 总数
     */
    total: number
    /**
     * @description 当前页数据
     */
    data: ApiDocuments.PostCategoryModel[]
  }
  export interface UpdatePostCategoryDto extends BasicDto {
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 排序，越大越靠前
     */
    sort?: number
  }
  export interface CreatePostDto extends BasicDto {
    /**
     * @description 分类ID
     */
    categoryId: string
    /**
     * @description 文章来源
     */
    source?: string
    /**
     * @description 作者
     */
    author?: string
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 轮播图
     */
    banners: string[]
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments: string[]
    /**
     * @description 是否置顶
     */
    isTop?: boolean
    /**
     * @description 发布状态
     */
    status?: {}
    /**
     * @description 发布时间
     */
    publishedAt?: string
  }
  export interface PostModel extends BasicDto {
    /**
     * @description 分类ID
     */
    categoryId: string
    /**
     * @description 文章来源
     */
    source?: string
    /**
     * @description 作者
     */
    author?: string
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 轮播图
     */
    banners: string[]
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments: string[]
    /**
     * @description 是否置顶
     */
    isTop?: boolean
    /**
     * @description 发布状态
     */
    status?: {}
    /**
     * @description 发布时间
     */
    publishedAt?: string
    id: string
    createdAt: string
    deletedAt?: string
    updatedAt?: string
  }
  export interface PostListDto extends BasicDto {
    /**
     * @description 总数
     */
    total: number
    /**
     * @description 当前页数据
     */
    data: ApiDocuments.PostModel[]
  }
  export interface UpdatePostDto extends BasicDto {
    /**
     * @description 分类ID
     */
    categoryId?: string
    /**
     * @description 文章来源
     */
    source?: string
    /**
     * @description 作者
     */
    author?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 轮播图
     */
    banners?: string[]
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 是否置顶
     */
    isTop?: boolean
    /**
     * @description 发布状态
     */
    status?: {}
    /**
     * @description 发布时间
     */
    publishedAt?: string
  }
  export interface MinioDto extends BasicDto {
    /**
     * @description endPoint
     */
    endPoint: string
    /**
     * @description region
     */
    region?: string
    /**
     * @description port
     */
    port?: number
    /**
     * @description useSSL
     */
    useSSL?: boolean
    /**
     * @description accessKey
     */
    accessKey: string
    /**
     * @description secretKey
     */
    secretKey: string
  }
}
