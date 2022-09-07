import { message, Upload } from 'antd'
import type { RcFile, UploadFile } from 'antd/lib/upload/interface'
// @ts-ignore
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useCallback, useMemo, useRef, useState } from 'react'
import { upload } from '@/utils/upload'
import { sizeFormat } from '@/utils/size'

export default function useUploads(
  value: string[],
  onChange?: (file: string[]) => void,
  opt?: {
    mimeTypes?: string[]
    maxSize?: number
  }
) {
  const fileMap = useRef<Record<string, UploadFile>>({})

  const generateUploadFiles = useCallback((value?: string[]) => {
    return (value ?? []).map<UploadFile>(item => {
      if (fileMap.current[item]) {
        return fileMap.current[item]
      }
      const urlSplited = item.split('/')
      const uploadFile: UploadFile = {
        uid: item,
        name: decodeURIComponent(urlSplited[urlSplited.length - 1] ?? ''),
        status: 'done',
        url: item
      }
      fileMap.current[item] = uploadFile
      return uploadFile
    })
  }, [])

  const fileList = useMemo(() => generateUploadFiles(value) ?? [], [value])
  const [loading, setLoading] = useState(false)

  const mimeTypes = opt?.mimeTypes
  const maxSize = opt?.maxSize

  const handleChange = useCallback(
    info => {
      const { status, url } = info.file
      if (status === 'uploading') {
        setLoading(true)
      } else if (status === 'removed') {
        const clone = [...value]
        const index = value.indexOf(url)
        if (index > -1) {
          clone.splice(index, 1)
          onChange?.(clone)
        }
      }
    },
    [onChange, value]
  )

  const customRequest: (opt: UploadRequestOption) => void = async ({
    file,
    onSuccess,
    onError
  }) => {
    // @ts-ignore
    const resp = await upload(file as RcFile)
    if (!resp) {
      onError?.(new Error('上传出错'))
    } else {
      // @ts-ignore
      onSuccess?.(resp!)
      setLoading(false)
      onChange?.([...(value ?? []), resp])
    }
  }

  function beforeUpload(file: File) {
    let matchTypes = true
    let matchSize = true
    if (mimeTypes) {
      matchTypes = mimeTypes.includes(file.type)
      if (!matchTypes) {
        message.error(`仅支持上传 ${mimeTypes.join(' ')} 格式的文件!`)
      }
    }
    if (maxSize) {
      matchSize = file.size < maxSize
      if (!matchSize) {
        message.error(`文件必须小于 ${sizeFormat(maxSize)}!`)
      }
    }
    return (matchTypes && matchSize) ? true : Upload.LIST_IGNORE
  }

  return {
    fileList,
    loading,
    handleChange,
    customRequest,
    beforeUpload
  }
}
