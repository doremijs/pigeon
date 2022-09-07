/* eslint-disable */
import { message } from 'antd'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { RequestFunctionArgs, ResponseObject } from './a2s.types'
import { useAuth } from '../stores/auth'

function errorHander<T>(resp: AxiosResponse): ResponseObject<T> {
  const { status, data, statusText } = resp
  if (status > 400 && status < 500) {
    useAuth.getState().logout()
    message.warning('您已自动退出登录')
  } else {
    message.error(data['message'] || statusText)
  }

  return {
    error: true,
    message: data['message'] || statusText
  }
}

export async function requestAdapter<T>(args: RequestFunctionArgs): Promise<ResponseObject<T>> {
  const { url, method, query, body } = args
  const token = useAuth.getState().token
  try {
    const rep = await axios.request({
      url,
      method,
      baseURL: '/',
      params: query,
      data: body,
      responseType: 'json',
      headers: token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    })
    const { status, data } = rep
    if (status < 300 && status >= 200) {
      return {
        error: false,
        data: data as T
      }
    }
    return errorHander(rep)
  } catch (error) {
    return errorHander((error as AxiosError).response!)
  }
}
