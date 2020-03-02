<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="companyList"
      :pagination="pagination"
      :columns="tableColumns"
    />

  </div>
</template>

<script>
import { fetchOperationCompanyList, fetchOperationSelectOptions } from '@/api/operationState'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'
import moment from 'moment'

export default {
  name: 'BusinessList',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      query: {
        token: 6480533415686144,
        orgId: 15542,
        otherType: 0,
        ind: 0, // 行业
        sdt: '', // 生产状态
        edt: ''
      },
      formList: [
        {
          label: '单位',
          field: 'orgId',
          type: 'treeSelect',
          placeholder: '请选择单位',
          url: '/search/selectTree'
        },
        {
          label: '行业',
          field: 'ind',
          type: 'select',
          placeholder: '请选择行业',
          data: this.treeEpIndustry
        },
        {
          label: '筛选条件',
          field: 'otherType',
          type: 'select',
          defaultValue: 0,
          placeholder: '请选择筛选条件',
          url: '/operationState/select'
        },
        {
          label: '时间',
          field: 'time',
          type: 'daterange',
          placeholder: '请选择生产日期'
        }
      ],
      treeOrg: {},
      treeEpIndustry: [],
      companyList: [],
      tableColumns: [
        {
          label: '单位',
          prop: 'OrgName',
          align: 'center',
          sortable: true
        },
        {
          label: '企业名称',
          prop: 'ComName',
          align: 'center',
          sortable: true,
          render: (row, index) => {
            return (
              <router-link to={`/table/company-info/${row.CompanyName}`} class='link-type'>{ row.ComName }</router-link>
            )
          }
        },
        {
          label: '行业',
          prop: 'IndustryName',
          align: 'center',
          sortable: true
        },
        {
          label: '异常次数',
          prop: 'InvalidNum',
          align: 'center',
          sortable: true
        },
        {
          label: '现场检查次数',
          prop: 'CheckNum',
          align: 'center',
          sortable: true
        },
        {
          label: '立案处罚次数',
          prop: 'PunishNum',
          align: 'center',
          sortable: true
        },
        {
          label: '处罚金额(万元)',
          prop: 'Money',
          align: 'center',
          sortable: true
        }
      ]
    }
  },
  created() {
    if (this.$route && this.$route.query) {
      const { id } = this.$route.query
      this.query.otherType = id
      // 初始化 从运行状况分析跳转到企业列表时筛选的默认值
      this.formList[2].defaultValue = Number(id || 0)
    }
    this.getSelectOptions()
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    getSelectOptions() {
      const params = {
        method: 'GetIndustry'
      }
      fetchOperationSelectOptions(params).then(({ code, data }) => {
        const { TreeOrg, TreeEpIndustry } = data
        this.treeOrg = TreeOrg
        this.treeEpIndustry = TreeEpIndustry

        console.log(this.treeEpIndustry)
      })
    },
    getList() {
      fetchOperationCompanyList(this.query).then(({ code, data }) => {
        this.companyList = data
      })
    },
    queryList(val) {
      const { time } = val
      const { token, orgId, otherType, ind } = this.query
      this.query = {
        token,
        orgId,
        otherType,
        ind,
        sdt: time ? moment(time[0]).format('YYYY-MM-DD') : '',
        edt: time ? moment(time[1]).format('YYYY-MM-DD') : ''
      }
      this.getList()
    }
  }
}
</script>

<style>

</style>
