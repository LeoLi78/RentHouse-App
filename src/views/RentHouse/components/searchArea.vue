<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
    </form>
    <van-cell
      v-for="(item, index) in areaList"
      :key="index"
      :title="item.communityName"
      @click="areaItem(item)"
    />
  </div>
</template>

<script>
import { getCommunity } from '@/api/city'
let timer = null
export default {
  name: 'searchArea',
  created () { },
  data () {
    return {
      searchText: '',
      areaList: []
    }
  },
  methods: {
    onCancel () {
      this.$emit('show', false)
    },
    areaItem (item) {
      this.$emit('areaItem', item)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            console.log(newVal);
            const res = await getCommunity({ name: newVal, id: this.$store.state.sCity.value })
            console.log(res)
            this.areaList = res.data.body
          } catch (err) {
            console.log(err)
          }
        }, 600)
      }
    },
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
