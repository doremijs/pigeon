/* eslint-disable */
import { requestAdapter } from './a2s.adapter'
import type { ApiDocuments } from './a2s.namespace'
import { extract, replacePath } from './a2s.utils'

export const services = {
  '认证@登录'(args: ApiDocuments.LoginDto) {
    return requestAdapter<ApiDocuments.UserProfileDto>({
      url: replacePath('/api/auth/login/local', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  '认证@注册'(args: ApiDocuments.RegisterUserDto) {
    return requestAdapter<any>({
      url: replacePath('/api/auth/register/local', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  '认证@个人信息'(args?: any) {
    return requestAdapter<ApiDocuments.UserProfileDto>({
      url: replacePath('/api/auth/me', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  '用户@/api/users'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/users', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  '文章分类@创建文章分类'(args: ApiDocuments.CreatePostCategoryDto) {
    return requestAdapter<any>({
      url: replacePath('/api/post-categories', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  '文章分类@查询文章分类列表'(args: {
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 排序，越大越靠前
     */
    sort?: number
    /**
     * @description 当前页
     */
    page?: number
    /**
     * @description 每页条数
     */
    pageSize?: number
    /**
     * @description 排序字段:方法
     * @example sorter=abc,def:asc
     */
    sorter: string
  }) {
    return requestAdapter<ApiDocuments.PostCategoryListDto>({
      url: replacePath('/api/post-categories', args),
      method: 'GET',
      ...extract('GET', args, ['name', 'sort', 'page', 'pageSize', 'sorter'], [])
    })
  },
  '文章分类@查询文章分类详情'(args: { id: string }) {
    return requestAdapter<ApiDocuments.PostCategoryModel>({
      url: replacePath('/api/post-categories/{id}', args),
      method: 'GET',
      ...extract('GET', args, [], ['id'])
    })
  },
  '文章分类@更新文章分类'(
    args: {
      id: string
    } & ApiDocuments.UpdatePostCategoryDto
  ) {
    return requestAdapter<ApiDocuments.PostCategoryModel>({
      url: replacePath('/api/post-categories/{id}', args),
      method: 'PATCH',
      ...extract('PATCH', args, [], ['id'])
    })
  },
  '文章分类@删除文章分类'(args: { id: string }) {
    return requestAdapter<any>({
      url: replacePath('/api/post-categories/{id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['id'])
    })
  },
  '文章内容@创建文章内容'(args: ApiDocuments.CreatePostDto) {
    return requestAdapter<any>({
      url: replacePath('/api/posts', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  '文章内容@查询文章内容列表'(args: {
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
     * @description 发布时间
     */
    publishedAt?: string
    /**
     * @description 当前页
     */
    page?: number
    /**
     * @description 每页条数
     */
    pageSize?: number
    /**
     * @description 排序字段:方法
     * @example sorter=abc,def:asc
     */
    sorter: string
  }) {
    return requestAdapter<ApiDocuments.PostListDto>({
      url: replacePath('/api/posts', args),
      method: 'GET',
      ...extract(
        'GET',
        args,
        [
          'categoryId',
          'source',
          'author',
          'title',
          'banners',
          'cover',
          'content',
          'attachments',
          'isTop',
          'publishedAt',
          'page',
          'pageSize',
          'sorter'
        ],
        []
      )
    })
  },
  '文章内容@查询文章内容详情'(args: { id: string }) {
    return requestAdapter<ApiDocuments.PostModel>({
      url: replacePath('/api/posts/{id}', args),
      method: 'GET',
      ...extract('GET', args, [], ['id'])
    })
  },
  '文章内容@更新文章内容'(
    args: {
      id: string
    } & ApiDocuments.UpdatePostDto
  ) {
    return requestAdapter<ApiDocuments.PostModel>({
      url: replacePath('/api/posts/{id}', args),
      method: 'PATCH',
      ...extract('PATCH', args, [], ['id'])
    })
  },
  '文章内容@删除文章内容'(args: { id: string }) {
    return requestAdapter<any>({
      url: replacePath('/api/posts/{id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['id'])
    })
  },
  '上传@获取配置'(args?: any) {
    return requestAdapter<ApiDocuments.MinioDto>({
      url: replacePath('/api/upload/config', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  '上传@获取文件上传地址'(args?: any) {
    return requestAdapter<string>({
      url: replacePath('/api/upload/presigned', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<typeof services[T]>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<ReturnType<typeof services[T]>>['data']
