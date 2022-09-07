import { applyDecorators, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Method } from 'axios'
import { Public } from './public'

type PigeonActionOptions = {
  public?: boolean
}

export function PigeonAction(
  method: Method,
  url: string,
  description: string,
  options: PigeonActionOptions = {
    public: false
  }
): MethodDecorator {
  const methodMap = {
    GET: Get(url),
    PUT: Put(url),
    PATCH: Patch(url),
    POST: Post(url),
    DELETE: Delete(url)
  }
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [
    methodMap[method.toUpperCase()],
    ApiOperation({ summary: description, description })
  ]
  if (options.public) {
    decorators.push(Public())
  }
  return applyDecorators(...decorators)
}
