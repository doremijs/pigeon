import { ComponentProps, useEffect, useState } from 'react'
import { ProFormSelect } from "@ant-design/pro-components"
import type { SelectProps } from 'antd'
import { ServiceKeys, services } from '@/services'

interface ProFormDictSelectProps extends ComponentProps<typeof ProFormSelect>  {
  valueField?: string
  labelField?: string
  serviceKey: ServiceKeys
  otherParams?: Record<string, any>
}

const ProFormDictSelect = (props: ProFormDictSelectProps) => {
  const { valueField = 'id', labelField = 'name', serviceKey, otherParams, ...rest } = props
  const [options, setOptions] = useState<SelectProps<any>['options']>([])

  useEffect(() => {
    async function loadData() {
      if (serviceKey && valueField && labelField) {
        const { error, data } = await services[serviceKey]({
          page: 1,
          pageSize: 2000,
          ...otherParams
        })
        setOptions(error ? [] : data.data.map((item: any) => ({
          label: item[labelField],
          value: item[valueField]
        })))
      }
    }
    loadData()
  }, [valueField, labelField])

  return (
    <ProFormSelect {...rest} options={options} />
  )
}

export default ProFormDictSelect
