<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="名称:">
        <el-input v-model="query.companyName" placeholder="输入企业" />
      </el-form-item>
      <el-form-item label="行业:">
        <XlTreeSelect
          :props="props"
          :data="optionData"
          :v-model="query.industryId"
          accordion
          @getValue="getValue($event)"
        />
      </el-form-item>
      <el-form-item label="生产状态:">
        <XLSelect
          v-model="query.statusId"
          placeholder="请选择生产状态1"
          :data="statusList"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <XLTable
      :data="businessList"
      :pagination="pagination"
      :columns="tableColumns"
      :show-summary="true"
      :summary-method="getSummaries"
    />

  </div>
</template>

<script>
import { fetchBusinessList } from '@/api/tracking-company-list'
import XlTreeSelect from '@/components/XLTreeSelect'
import XLSelect from '@/components/XLSelect'
import XLTable from '@/components/XLTable'

export default {
  name: 'BusinessList',
  components: {
    XlTreeSelect,
    XLSelect,
    XLTable
  },
  data() {
    return {
      query: {
        token: 6480533415686144,
        companyName: '', // 名称
        userId: 0,
        queryType: 1,
        searchType: 0,
        orgId: 15542,
        industryId: 0, // 行业
        statusId: -1 // 生产状态
      },
      pagination: {
        pageSize: 10,
        total: 0,
        pageIndex: 1
      },
      businessList: [],
      statusList: [
        { label: '全部', value: -1 },
        { label: '正常', value: 0 },
        { label: '限产', value: 13 },
        { label: '停产', value: 14 }
      ],
      props: { // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      list: [
        { id: 1, parentId: 0, name: '一级菜单A', rank: 1 },
        { id: 2, parentId: 0, name: '一级菜单B', rank: 1 },
        { id: 3, parentId: 0, name: '一级菜单C', rank: 1 },
        { id: 4, parentId: 1, name: '二级菜单A-A', rank: 2 },
        { id: 5, parentId: 1, name: '二级菜单A-B', rank: 2 },
        { id: 6, parentId: 2, name: '二级菜单B-A', rank: 2 },
        { id: 7, parentId: 4, name: '三级菜单A-A-A', rank: 3 },
        { id: 8, parentId: 4, name: '三级菜单A-A-B', rank: 3 },
        { id: 9, parentId: 4, name: '三级菜单A-A-C', rank: 3 },
        { id: 15, parentId: 0, name: '一级菜单eeC1', rank: 1 },
        { id: 16, parentId: 0, name: '一级菜单D', rank: 1 },
        { id: 17, parentId: 0, name: '一级菜单E', rank: 1 },
        { id: 18, parentId: 0, name: '一级菜单F', rank: 1 },
        { id: 19, parentId: 0, name: '一级菜单G', rank: 1 },
        { id: 20, parentId: 0, name: '一级菜单H', rank: 1 },
        { id: 21, parentId: 0, name: '一级菜单I', rank: 1 },
        { id: 22, parentId: 0, name: '一级菜单J', rank: 1 },
        { id: 23, parentId: 0, name: '一级菜单K', rank: 1 },
        { id: 24, parentId: 0, name: '一级菜单L', rank: 1 },
        { id: 25, parentId: 0, name: '一级菜单M', rank: 1 },
        { id: 26, parentId: 0, name: '一级菜单N', rank: 1 },
        { id: 27, parentId: 0, name: '一级菜单O', rank: 1 },
        { id: 40, parentId: 0, name: '一级菜单end', rank: 1 }
      ],
      tableColumns: [
        {
          label: '机构',
          prop: 'date1',
          align: 'center',
          render: (row, index) => {
            return (
              <router-link to={`business-list/${row.date1}`} class='link-type'>{ row.date1 }</router-link>
            )
          }
        },
        {
          label: '企业数量(家)',
          prop: 'date2',
          align: 'center'
        },
        {
          label: '产污设施数量(处)',
          prop: 'date3',
          align: 'center'
        },
        {
          label: '污处设施数量(处)',
          prop: 'date4',
          align: 'center'
        },
        {
          label: '监测点数量(个)',
          prop: 'Index',
          align: 'center',
          children: [
            {
              label: '总数',
              prop: 'name1',
              align: 'center'
            },
            {
              label: '运行',
              prop: 'name2',
              align: 'center'
            },
            {
              label: '停用',
              prop: 'name3',
              align: 'center'
            },
            {
              label: '调试',
              prop: 'name4',
              align: 'center'
            }
          ]
        }
      ]
    }
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      const cloneData = JSON.parse(JSON.stringify(this.list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
        return father.parentId === 0 // 返回第一层
      })
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
      this.query.industryId = value
    },
    getList() {
      fetchBusinessList(this.query).then(({ code, data }) => {
        this.businessList = data
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
    }
  }
}
</script>

<style>

</style>
