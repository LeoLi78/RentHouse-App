<template>
  <div>
    <!-- header搜索房屋 -->
    <div class="header" ref="aaa">
      <van-icon name="arrow-left" color="#fff" @click="$router.push('/home')" />
      <SearchCity></SearchCity>
    </div>
    <!-- 房屋筛选 区域 方式 价格-->
    <van-sticky>
      <van-dropdown-menu active-color="#21b97a">
        <SelectItem
          v-for="(item, index) in allSelect"
          :key="index"
          :item="item"
          :ways="ways[index]"
          @selectHouse="selectHouse($event)"
        ></SelectItem>

        <!-- 筛选弹出层 -->
        <van-dropdown-item title="筛选" @open="flag = true"></van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-popup position="right" style="height: 100%; width: 70%" v-model="flag">
      <!-- 筛选组件 -->
      <HouseContruct @submitCondition="confirmSubmit($event)"></HouseContruct>
    </van-popup>

    <!-- 房屋Item -->
    <!-- 兄弟之间传值 -->
    <HouseItem :queryHouseObj="queryHouseObj"></HouseItem>
  </div>
</template>

<script>
import SelectItem from './components/SelectItem.vue'
import HouseContruct from './components/HouseConstruct.vue'
import HouseItem from '@/components/HouseItem.vue'
import { getHouseCondition } from '@/api/house'
export default {
  name: 'FindHouse',
  created () {
    this.getHouseCondition()
  },
  data () {
    return {
      flag: false,
      areaSelect: [],
      rentWays: [],
      rentPrice: [],
      selectCondition: [],
      allSelect: [],
      ways: ['区域', '方式', '价格'],
      queryHouseObj: {
        cityId: this.$store.state.sCity.value,
        area: null,
        subway: null,
        rentType: null,
        price: null,
        more: null,
        start: 1,
        end: 10,
      },
    }
  },
  methods: {
    // async getHouseCondition () {
    //   try {
    //     const res = await getHouseCondition(this.$store.state.sCity.value)
    //     console.log(res)
    //     let area = { text: '', children: [], value: null }
    //     console.log(area);
    //     if (res.data.body.area) {
    //       let area1 = res.data.body.area
    //       area.text = area1.label
    //       area.value = area1.value
    //       if (area1.children) {
    //         area1.children.forEach(item => {
    //           let sanji = []
    //           if (item.children) {
    //             item.children.forEach(item1 => {
    //               sanji.push({ text: item1.label, value: item1.value })
    //             })
    //           } else {
    //             sanji.push({ text: '' })
    //           }
    //           area.children.push({ text: item.label, children: sanji, value: item.value })
    //         });
    //       }
    //     }
    //     let subway = { text: '', children: [], value: null }
    //     if (res.data.body.subway) {
    //       let subway1 = res.data.body.subway
    //       subway.text = subway1.label
    //       subway.value = subway1.value
    //       if (subway1.children) {
    //         subway1.children.forEach(item => {
    //           let sanji = []
    //           if (item.children) {
    //             item.children.forEach(item1 => {
    //               sanji.push({ text: item1.label, value: item1.value })
    //             })
    //           } else {
    //             sanji.push({ text: '' })
    //           }

    //           subway.children.push({ text: item.label , value: item.value })
    //         });
    //       }
    //     }
    //     console.log(area);
    //     console.log(subway);
    //     this.firstShowbyID.push(area)
    //     this.firstShowbyID.push(subway)
    //     console.log(this.firstShowbyID)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    async getHouseCondition () {
      try {
        const res = await getHouseCondition(this.$store.state.sCity.value)
        console.log(res)
        res.data.body.area.children[0].children = [{ label: '' }]
        res.data.body.subway.children[0].children = [{ label: '' }]
        this.areaSelect = [res.data.body.area, res.data.body.subway,]
        this.rentWays = res.data.body.rentType
        this.rentPrice = res.data.body.price
        this.floor = res.data.body.floor
        this.$store.commit('setFloor', res.data.body.floor)
        this.characteristic = res.data.body.characteristic
        this.$store.commit('setCha', res.data.body.characteristic)
        this.oriented = res.data.body.oriented
        this.$store.commit('setOri', res.data.body.oriented)
        this.roomType = res.data.body.roomType
        this.$store.commit('setRT', res.data.body.roomType)
        this.allSelect = [this.areaSelect, this.rentWays, this.rentPrice]
        console.log(this.allSelect)
      } catch (err) {
        console.log(err)
      }
    },
    selectHouse (ways) {
      this.queryHouseObj[ways.property] = ways.value
    },
    confirmSubmit (moreStr) {
      this.flag = false
      if (moreStr) {
        this.queryHouseObj.more = moreStr
      }

    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {
    HouseItem,
    HouseContruct,
    SelectItem
  },
  mounted () {
  }
}
</script>

<style scoped lang='less'>
/deep/.van-picker {
  padding-bottom: 100px;
  .van-picker__toolbar {
    position: absolute;
    bottom: 0px;
    .van-picker__cancel {
      width: 250px;
      color: #21b97a;
      font-size: 36px;
    }
    .van-picker__confirm {
      width: 500px;
      background-color: #21b97a;
      color: #fff;
      font-size: 36px;
      border: none;
    }
  }
}

.header {
  width: 100%;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  background-color: #21b97a;
}
/deep/.van-search__content {
  width: 560px;
}
/deep/.weizhi {
  background-color: #21b97a;
}
</style>
