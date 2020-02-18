<template>
  <el-row>
    <el-col :span="4">
      <el-tree
        :data="list"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      />
    </el-col>
    <el-col :span="20">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用电数据" name="first">
          <div class="chart-container">
            <chart height="100%" width="100%" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="污处异常" name="second">
          <span>污处异常</span>
        </el-tab-pane>
        <el-tab-pane label="减排异常" name="third">
          <span>减排异常</span>
        </el-tab-pane>
        <el-tab-pane label="企业档案" name="forth">
          <span>企业档案</span>
        </el-tab-pane>
        <el-tab-pane label="企业地图" name="fifth">
          <span>企业地图</span>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { fetchList } from '@/api/company-info'
import Chart from '@/components/Charts/LineMarker'

export default {

  name: 'CompanyInfo',
  components: {
    Chart
  },
  data() {
    return {
      activeName: 'first',
      defaultProps: {
        children: 'children',
        label: 'text',
        iconClass: 'icon'
      },
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(({ code, data }) => {
        this.list = [data]
        console.log('this data', data)
      })
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }

}
</script>

<style scoped>
.chart-container{
  border: 1px solid blue;
  position: relative;
  width: 100%;
  height: calc(100vh - 184px);
}
</style>
