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
      <el-row>
        s
      </el-row>
      <el-row>
        <div class="chart-container">
          <chart height="100%" width="100%" />
        </div>
      </el-row>
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
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
