<template>
  <el-select v-model="selectVal" :placeholder="placeholder">
    <span v-if="url !== '' || url !== null || url !== undefined">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </span>
    <span v-else>
      <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
    </span>
  </el-select>
</template>

<script>
import { fetchList } from '@/api/select'

export default {
  name: 'XLRemoteSelect',
  props: {
    data: {
      type: Array,
      default: () => []
    },
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
    if (this.url) {
      fetchList(this.url, this.query).then(({ code, data }) => {
        this.options = data
      })
    }
  }
}
</script>

<style>

</style>
