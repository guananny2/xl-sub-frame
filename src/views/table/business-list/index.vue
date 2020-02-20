<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="list"
      :pagination="pagination"
      :columns="tableColumns"
      :stripe="false"
      :height="500"
      column-type="index"
      @xl-size-change="handleSizeChange"
      @current-page-change="handlePageChange"
      @xl-selection-change="handleSelectionChange"
      @xl-cell-click="handleCellClick"
    />
  </div>
</template>

<script>
import { fetchCompantList } from '@/api/tracking-company-list'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'

export default {
  name: 'BusinessList',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      value: '',
      query: {
        token: 6480533415686144,
        queryType: 0,
        searchType: 1,
        companyName: '',
        orgId: 13920,
        industryId: -1,
        Pf_statusId: -1,
        classfiyCompany: -1,
        pIdx: 1,
        pSize: 100
      },
      list: [],
      pagination: {
        pageSize: 10,
        total: 11,
        pageIndex: 1
      },
      tableColumns: [
        {
          label: '机构',
          prop: 'OrgName',
          headerAlign: 'center',
          align: 'center',
          width: '100',
          sortable: true
        },
        {
          label: '企业',
          align: 'center',
          headerAlign: 'center',
          sortable: true,
          render: (row, index) => {
            return (
              <router-link to={`/table/company-info/${row.CompanyName}`} class='link-type'>{ row.CompanyName }</router-link>
              // <router-link to={`business-list/${row.date1}`} class='link-type'>{ row.date1 }</router-link>
            )
          }
        },
        {
          label: '行业',
          prop: 'IndustryName',
          headerAlign: 'center',
          align: 'center',
          width: '120',
          sortable: true
        },
        {
          label: '企业状态',
          prop: 'StatusName',
          headerAlign: 'center',
          align: 'center',
          width: '120',
          sortable: true,
          formatter: (row, column, index1, idx2) => {
            return row.StatusName + '##'
          }
        },
        {
          label: '生产状态',
          prop: 'EP_PfName',
          headerAlign: 'center',
          align: 'center',
          width: '120',
          sortable: true
        },
        {
          label: '产污设施数量',
          prop: 'EP_PfCount',
          headerAlign: 'center',
          align: 'center',
          width: '150',
          sortable: true
        },
        {
          label: '污处设施数量',
          prop: 'EP_EpCount',
          headerAlign: 'center',
          align: 'center',
          width: '150',
          sortable: true
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
              prop: 'DeviceCount',
              width: '100',
              sortable: true
            },
            {
              label: '运行',
              align: 'center',
              headerAlign: 'center',
              prop: 'RunCount',
              width: '100',
              sortable: false
            },
            {
              label: '停用',
              align: 'center',
              headerAlign: 'center',
              prop: 'DisabledCount',
              width: '100',
              sortable: true
            },
            {
              label: '调试',
              align: 'center',
              headerAlign: 'center',
              prop: 'DebugCount',
              width: '100',
              sortable: true
            }
          ]
        },
        {
          label: '操作',
          align: 'right',
          headerAlign: 'center',
          buttonGroups: [
            {
              name: '编辑',
              type: 'success',
              icon: 'el-icon-edit',
              click(row, index) {
                console.log(row)
              }
            }
          ]
        }
      ],
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
          label: '行业',
          field: 'industryId',
          type: 'select',
          placeholder: '请选择行业',
          url: '/search/select'
        },
        {
          label: '生产状态',
          field: 'Pf_statusId',
          type: 'select',
          placeholder: '请选择生产状态',
          url: '/search/select'
        },
        {
          label: '运维公司',
          field: 'classfiyCompany',
          type: 'select',
          placeholder: '请选择运维公司',
          url: '/search/select'
        }
      ]
    }
  },
  created() {
    this.value = this.$route.params
    this.getList()
  },
  methods: {
    getList() {
      fetchCompantList(this.query).then(({ code, Data, PageIndex, TotalCount }) => {
        this.list = Data
      })
    },
    handleSizeChange(val) {
      this.pagination = {
        ...this.pagination,
        pageIndex: 1,
        pageSize: val
      }
      console.log('size change', this.pagination)

      this.query = {
        ...this.query,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      this.getList()
    },
    handlePageChange(val) {
      this.pagination = {
        ...this.pagination,
        pageIndex: val
      }
      console.log('page ...', this.pagination)
      this.query = {
        ...this.query,
        pageIndex: val
      }
      this.getList()
    },
    handleSelectionChange(val) {
      console.log('change ', val)
    },
    handleCellClick(row, column, cell, event) {
      console.log('row', row)
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
