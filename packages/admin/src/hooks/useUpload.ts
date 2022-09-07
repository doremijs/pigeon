import { message, Upload } from 'antd'
// @ts-ignore
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useCallback, useEffect, useState } from 'react'
import { upload } from '@/utils/upload'
import { sizeFormat } from '@/utils/size'

export default function useUpload(
  value?: string,
  onChange?: (file: string) => void,
  opt?: {
    mimeTypes: string[]
    maxSize: number
  }
) {
  const [uploadFile, setUploadFile] = useState(value)
  const [loading, setLoading] = useState(false)

  const mimeTypes = opt?.mimeTypes
  const maxSize = opt?.maxSize

  useEffect(() => {
    setUploadFile(value)
  }, [value])

  const handleChange = useCallback(
    info => {
      const { status } = info.file
      if (status === 'uploading') {
        setLoading(true)
        return
      }
      if (status === 'removed') {
        setUploadFile('')
        onChange?.('')
      }
    },
    [onChange]
  )

  const customRequest: (opt: UploadRequestOption) => void = async ({
    file,
    onSuccess,
    onError
  }) => {
    // @ts-ignore
    const resp = await upload(file as File)
    if (!resp) {
      onError!(new Error('上传失败'))
    } else {
      onSuccess!(resp)
      setUploadFile(resp)
      setLoading(false)
      // onChange?.(resp)
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
        message.error(`图片大小必须小于 ${sizeFormat(maxSize)}!`)
      }
    }
    return (matchTypes && matchSize) ? true : Upload.LIST_IGNORE
  }

  return {
    file: uploadFile,
    loading,
    clean: () => setUploadFile(''),
    handleChange,
    customRequest,
    beforeUpload
  }
}
