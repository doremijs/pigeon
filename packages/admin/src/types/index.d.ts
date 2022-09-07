import { ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'

export * from '@/features/auth/types'

export type MenuRouteItem = Omit<RouteObject, 'children'> & {
  name: string
  icon?: ReactNode
  children?: MenuRouteItem[]
}

declare module '*.module.less' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.less'
}
