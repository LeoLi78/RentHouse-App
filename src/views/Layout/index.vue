<template>
  <div>
    <router-view />

    <van-tabbar route active-color="#21b97a" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/findhouse" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/infomation" icon="notes-o">资讯</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
