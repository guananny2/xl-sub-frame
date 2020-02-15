<template>
  <el-select v-model="selectVal" :placeholder="placeholder">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import { fetchList } from '@/api/select'

export default {
  name: 'XLRemoteSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    fetchList(this.url, this.query).then(({ code, data }) => {
      this.options = data
    })
  }
}
</script>

<style>

</style>
