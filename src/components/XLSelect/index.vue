<template>
  <el-select v-model="selectVal" :placeholder="placeholder">
    <el-option
      v-for="item in options"
      :key="valueKey ? item[valueKey] : item.value"
      :label="labelKey ? item[labelKey] : item.label"
      :value="valueKey ? item[valueKey] : item.value"
    />
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
    labelKey: {
      type: String,
      default: null
    },
    valueKey: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number],
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
  watch: {
    data: function(newVal, oldVal) {
      this.options = newVal
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
