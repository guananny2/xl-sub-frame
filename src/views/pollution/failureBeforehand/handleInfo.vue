<template>
  <span>
    企业申报详情
  </span>
</template>

<script>
export default {
  name: 'HandleInfo',
  data() {
    return {
      id: ''
    }
  },
  created() {
    if (this.$route && this.$route.params) {
      const { id } = this.$route.params
      this.id = id
    }
  }
}
</script>

<style>

</style>
