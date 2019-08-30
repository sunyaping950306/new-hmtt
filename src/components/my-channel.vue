<template>
  <el-select v-model="reqParams.channel_id">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      childData: '我是子组件的值'
    }
  },
  methods: {
    toParent () {
      // 给父组件传值
      this.$emit('input', this.childData)
    }
  },

  components: {}
}
</script>

<style lang="less">
</style>
