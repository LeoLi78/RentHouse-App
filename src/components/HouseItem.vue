<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="buttonshow"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <van-card
        currency=""
        :price="item.price ? item.price + '元/月' : ''"
        :desc="item.desc"
        :title="item.title"
        :thumb="url + item.houseImg"
        @click="
          $router.push({ name: 'house', params: { housecode: item.houseCode } })
        "
      >
        <template #tags>
          <van-tag plain type="danger">{{ item.tags[0] }}</van-tag>
        </template>
      </van-card>
    </van-cell>
  </van-list>
</template>

<script>
import { mapState } from 'vuex'
import { getAllSelectHouse } from '@/api/house'
export default {
  props: {
    queryHouseObj: {
      type: Object,
      required: true
    }
  },
  name: 'HouseItem',
  created () {
    this.getAllSelectHouse()
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      url: "http://liufusong.top:8080",
      cityId: this.sCity,
    }
  },
  methods: {
    async getAllSelectHouse () {
      try {
        const res = await getAllSelectHouse(this.queryHouseObj)
        console.log(res);
        if (res.data.body.list.length === 0) {
          this.finished = true
        }
        this.list.push(...res.data.body.list)
        this.loading = false
      } catch (err) {
        console.log(err);
      }
    },
    onLoad () {
      this.getAllSelectHouse()
    },
    toHouse (houseCode) {

    }
  },
  computed: {
    ...mapState(['sCity'])
  },
  watch: {
    queryHouseObj: {
      handler () {
        this.list = []
        this.getAllSelectHouse()
        console.log('queryHouseObj changed :', this.queryHouseObj)
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-card__title {
  font-weight: bold;
  font-size: 30px;
}
.buttonshow {
  padding-bottom: 100px;
}
</style>
