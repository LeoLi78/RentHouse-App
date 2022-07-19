<template>
  <van-search
    class="weizhi"
    v-model="searchText"
    show-action
    placeholder="请输入小区或地址"
  >
    <template #label>
      <div class="leftcity" @click="$router.push('/citylist')">
        {{ $store.state.sCity.label }}
        <i class="renthouse icon-xiala"></i>
      </div>
    </template>
    <template #action>
      <van-icon name="location-o" size="28" color="#fff" class="ditu" />
    </template>
  </van-search>
</template>

<script>
export default {
  name: 'SearchCity',
  created () { },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.weizhi {
  width: 720px;
  position: fixed;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: unset;
}
.leftcity {
  i {
    border-right: 1px solid rgb(208, 206, 206);
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
