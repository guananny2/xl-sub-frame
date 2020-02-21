<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    yAxisData: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: function(newVal, oldVal) {
      const option = this.chart.getOption()
      option.series[0].data = newVal
      option.yAxis[1].data = newVal
      this.chart.setOption(option)
    },
    yAxisData: function(newVal, oldVal) {
      const option = this.chart.getOption()
      option.yAxis[0].data = newVal
      this.chart.setOption(option)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 35,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: this.yAxisData
        },
        {
          type: 'category',
          position: 'right',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: this.data
        }
        ],
        series: [
          {
            name: '污处设施异常',
            type: 'bar',
            stack: '总量',
            data: this.data,
            animationDuration
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>
