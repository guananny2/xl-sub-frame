<template>
  <el-select v-model="selectVal" :placeholder="placeholder">
    <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
export default {
  name: 'XLSelect',
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
  }
}
</script>

<style>

</style>
