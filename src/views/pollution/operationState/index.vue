<template>
  <el-row>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <card-list ref="children" :card-list="cards" />

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-tabs v-model="activeName.firstPanel">
          <el-tab-pane label="污处异常企业" name="first">
            <BarChart :x-axis-data="abnormalObj.xAxisData" :data="abnormalObj.AbnormalComList" />
          </el-tab-pane>
          <el-tab-pane label="检查企业" name="second">
            <BarChart :data="abnormalObj.InValidComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
          <el-tab-pane label="立案处罚企业" name="third">
            <BarChart :data="abnormalObj.CheckedComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
          <el-tab-pane label="处罚金额" name="fourth">
            <BarChart :data="abnormalObj.PunishedComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-tabs v-model="activeName.secondPanel">
          <el-tab-pane label="异常时长Top5" name="first">
            <HeapUpBarChart :y-axis-data="abnormalTopObj.yAxisData" :data="abnormalTopObj.data" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.thirdPanel">
          <el-tab-pane label="异常企业行业分布" name="first">
            <!-- <BarChart /> -->
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.fourthPanel">
          <el-tab-pane label="异常原因统计" name="first">
            <!-- <BarChart /> -->
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.fifthPanel">
          <el-tab-pane label="异常查处率" name="first">
            <!-- <BarChart /> -->
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </el-row>

</template>

<script>
import XLQueryForm from '@/components/XLQueryForm'
import moment from 'moment'
import { fetchOperationStateList } from '@/api/operationState'
import CardList from './components/CardList'
import BarChart from './components/BarChart'
import HeapUpBarChart from './components/HeapUpBarChart'

export default {
  name: 'OperationState',
  components: {
    XLQueryForm,
    CardList,
    BarChart,
    HeapUpBarChart
  },
  data() {
    return {
      statistics: [],
      query: {
        orgId: '',
        startDate: '',
        endDate: '',
        queryType: 1,
        token: 6480533415686144
      },
      formList: [
        {
          label: '机构',
          field: 'orgId',
          type: 'treeSelect',
          placeholder: '请选择机构',
          url: '/search/selectTree'
        },
        {
          label: '时间',
          field: 'time',
          type: 'daterange',
          placeholder: '请选择生产日期'
        }
      ],
      cards: [
        {
          title: '污处异常企业',
          prop: 'AbnormalComNum',
          count: 0,
          unit: '家',
          url: 'abnormal-tracking-company-list'
        },
        {
          title: '有效申报企业',
          prop: 'DeclaredComNum',
          count: 0,
          unit: '家',
          url: 'abnormal-tracking-company-list'
        },
        {
          title: '无效申报企业',
          prop: 'UndeclaredComNum',
          count: 0,
          unit: '家',
          url: 'abnormal-tracking-company-list'
        },
        {
          title: '已检查企业',
          prop: 'CheckedComNum',
          count: 0,
          unit: '家',
          url: 'abnormal-tracking-company-list'
        },
        {
          title: '立案处罚企业',
          prop: 'PunishedComNum',
          count: 0,
          unit: '家',
          url: 'abnormal-tracking-company-list'
        },
        {
          title: '处罚金额',
          prop: 'PunishedMoney',
          count: 0,
          unit: '万元',
          url: 'abnormal-tracking-company-list'
        }
      ],
      activeName: {
        firstPanel: 'first',
        secondPanel: 'first',
        thirdPanel: 'first',
        fourthPanel: 'first',
        fifthPanel: 'first'
      },
      abnormalObj: {
        AbnormalComList: [],
        InValidComList: [],
        CheckedComList: [],
        PunishedComList: [],
        xAxisData: []
      },
      abnormalTopObj: {
        yAxisData: [],
        data: []
      }
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      fetchOperationStateList(this.query).then(({ code, data }) => {
        this.statistics = data
        console.log('this.staticssss', this.statistics)
        this.cards.map(item => {
          item.count = this.statistics.Data[item.prop]
        })
        this.statistics.Data.AbnormalComDistribution.map(item => {
          this.abnormalObj.xAxisData.push(item.OrgName)
          this.abnormalObj.AbnormalComList.push(item.AbnormalComList.length)
          this.abnormalObj.InValidComList.push(item.InValidComList.length)
          this.abnormalObj.CheckedComList.push(item.CheckedComList.length)
          this.abnormalObj.PunishedComList.push(item.PunishedComList.length)
        })
        this.statistics.Data.AbnormalComTop10.map(item => {
          this.abnormalTopObj.data.push(item.AbnormalNum)
          this.abnormalTopObj.yAxisData.push(item.CompanyName)
        })
      })
    },
    queryList(data) {
      const { time, orgId } = data
      this.query = { ...this.query,
        startDate: moment(time[0]).format('YYYY-MM-DD'),
        endDate: moment(time[1]).format('YYYY-MM-DD'),
        orgId
      }
      this.fetchInfo()
    }
  }
}
</script>

<style>

</style>
