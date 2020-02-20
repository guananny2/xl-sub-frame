<template>
  <div>

    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="industryList"
      :columns="tableColumns"
      :stripe="false"
      :show-summary="true"
      :summary-method="getSummaries"
    />
  </div>
</template>

<script>
import { fetchIndustryList } from '@/api/tracking-company-list'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'

export default {
  name: 'IndustryList',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      industryList: [],
      query: {
        token: 6480533415686144,
        companyName: '', // 名称
        userId: 0,
        queryType: 1,
        searchType: 1,
        orgId: 15542, // 机构
        industryId: 200,
        statusId: -1 // 生产状态
      },
      formList: [
        {
          label: '名称',
          field: 'companyName',
          type: 'input',
          dataType: 'text',
          placeholder: '请输入名称'
        },
        {
          label: '机构',
          field: 'orgId',
          type: 'treeSelect',
          placeholder: '请选择机构',
          url: '/search/selectTree'
        },
        {
          label: '生产状态',
          field: 'statusId',
          type: 'select',
          placeholder: '请选择生产状态',
          url: '/search/select'
        }
      ],
      tableColumns: [
        {
          label: '机构',
          prop: 'date1',
          headerAlign: 'center',
          align: 'center',
          width: '100',
          render: (row, index) => {
            return (
              <router-link to={`/table/company-info/${row.date1}`} class='link-type'>{ row.date1 }</router-link>
            )
          }
        },
        {
          label: '企业数量(家)',
          align: 'center',
          prop: 'date2',
          headerAlign: 'center'
        },
        {
          label: '产污设施数量(处)',
          prop: 'date3',
          headerAlign: 'center',
          align: 'center',
          width: '120'
        },
        {
          label: '污处设施数量(处)',
          prop: 'date4',
          headerAlign: 'center',
          align: 'center',
          width: '120'
        },
        {
          label: '监测点数量（个）',
          align: 'center',
          headerAlign: 'center',
          children: [
            {
              label: '总数',
              align: 'center',
              headerAlign: 'center',
              prop: 'name1',
              width: '100'
            },
            {
              label: '运行',
              align: 'center',
              headerAlign: 'center',
              prop: 'name2',
              width: '100'
            },
            {
              label: '停用',
              align: 'center',
              headerAlign: 'center',
              prop: 'name3',
              width: '100'
            },
            {
              label: '调试',
              align: 'center',
              headerAlign: 'center',
              prop: 'name4',
              width: '100'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    getValue(value) {
      console.log('父组件中的值', value)
      this.query.businessId = value
    },
    getList() {
      fetchIndustryList(this.query).then(({ code, data }) => {
        this.industryList = data
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = '-'
        }
      })
      return sums
    },
    queryList(val) {
      this.query = { ...this.query, ...val }
      this.getList()
    }
  }
}
</script>

<style>

</style>
