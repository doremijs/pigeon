import { CommonErrorResponse } from '@/types/error.response'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  getResponse(exception: any): CommonErrorResponse {
    // prisma 错误
    if (exception instanceof PrismaClientValidationError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: exception.message,
        stack: exception.stack
      }
    }
    if (exception instanceof PrismaClientUnknownRequestError) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        stack: exception.stack
      }
    }
    if (exception instanceof PrismaClientKnownRequestError) {
      let message: string
      let status: number
      switch (exception.code) {
        // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
        // common
        case 'P1000':
        case 'P1001':
        case 'P1002':
        case 'P1003':
        case 'P1009':
        case 'P1010':
        case 'P1011':
        case 'P1012':
        case 'P1013':
        case 'P1014':
        case 'P1015':
        case 'P1016':
        case 'P1017':
          status = HttpStatus.INTERNAL_SERVER_ERROR
          message = '数据库连接失败'
          break;
        case 'P1008':
          status = HttpStatus.INTERNAL_SERVER_ERROR
          message = '数据操作超时'
          break
        case 'P2000':
        case 'P2001':
          status = HttpStatus.INTERNAL_SERVER_ERROR
          message = '数据库内部错误'
          break
        case 'P2002':
          status = HttpStatus.BAD_REQUEST
          message = `字段 ${exception.meta!.target} 的数据已存在`
          break
        case 'P2003':
          status = HttpStatus.BAD_REQUEST
          message = exception.message
          break
        case 'P2004':
          status = HttpStatus.BAD_REQUEST
          message = exception.message
          break
        default:
          status = HttpStatus.BAD_REQUEST
          message = exception.message
          break;
      }
      return {
        status,
        message,
        stack: exception.stack
      }
    }

    // http 错误
    if (exception instanceof HttpException) {
      const response = exception.getResponse()
      let message: string
      if (typeof response === 'string') {
        message = response
      } else if (Array.isArray(response)) {
        message = response.map(item => JSON.stringify(item)).join(', ')
      } else {
        if (exception.getStatus() === HttpStatus.BAD_REQUEST && 'message' in response) {
          message = response['message'].join(', ')
        } else {
          message = JSON.stringify(response)
        }
      }
      return {
        status: exception.getStatus(),
        message: message ?? exception.message ?? '服务器内部错误',
        stack: exception.stack
      }
    }

    // 身份认证错误
    if (
      exception?.name === 'JsonWebTokenError' &&
      exception.message === 'invalid signature'
    ) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'token 无效'
      }
    }

    // 默认错误
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.message ?? '',
      stack: exception
    }
  }

  catch(exception: any, host: ArgumentsHost) {
    Logger.debug(exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const ret = this.getResponse(exception)

    // TODO 记录日志

    response.status(ret.status).json(ret)
  }
}
