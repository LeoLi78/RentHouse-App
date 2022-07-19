<template>
  <div>
    <!-- headers -->
    <div class="header">
      <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />
    </div>
    <div class="container">
      <!-- 当前城市 -->
      <van-index-bar :index-list="saidIndexList">
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell
          :title="$store.state.sCity.label"
          @click.stop="$router.back()"
        />
        <!-- 热门城市 -->
        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
          v-for="(item, index1) in hotCity"
          :key="'index' + index1"
          :title="item.label"
          @click.stop="goHomeCity(item)"
        />
        <!-- 城市 -->
        <!-- 待实现    
    一是点击右侧字母的时候，城市列表出现相应首字母下的城市
    二是鼠标在字母表上滑动的时候，城市列表实时跟着变化 -->
        <div v-for="item in A_ZCitys" :key="item.firstPinyin">
          <van-index-anchor :index="item.firstPinyin" />
          <van-cell
            v-for="item1 in item.citys"
            :key="item1.value"
            :title="item1.label"
            @click="goHomeCity(item1)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getAllCity, getHotCity } from '@/api/city'
export default {
  created () {
    this.getHotCity()
    this.getAllCity()
  },
  data () {
    return {
      CityListA_Z: [],
      hotCity: [],
      allCitys: [],
      A_ZCitys: [],
      saidIndexList: []
    };
  },
  methods: {
    //获取热门城市
    async getHotCity () {
      try {
        const hotcitys = await getHotCity()
        console.log(hotcitys);
        this.hotCity = hotcitys.data.body
      } catch (err) {
        console.log(err);
      }
    },
    //获取所有城市
    async getAllCity () {
      try {
        const allcitys = await getAllCity(1)
        console.log(allcitys);
        this.allCitys = allcitys.data.body
        // console.log(this.allCitys);
        this.getQuenCitys()
        console.log(this.A_ZCitys);
      } catch (err) {
        console.log(err);
      }
    },
    // 城市排序A_Z
    getQuenCitys () {
      for (let i = 0; i < 26; i++) {
        let a = String.fromCharCode(65 + i)
        this.saidIndexList.push(a)
        let citys = []
        this.allCitys.forEach(item => {
          if (a == item.short.charAt(0).toUpperCase()) {
            citys.push({ label: item.label, value: item.value })
          }
        })
        if (citys.length === 0) {
          citys.push({ label: '暂无城市' })
        }
        this.A_ZCitys.push({ firstPinyin: a, citys })
      }
      // console.log(this.A_ZCitys);
      this.saidIndexList.unshift('热')
      this.saidIndexList.unshift('#')
      console.log(this.saidIndexList);
    },
    //点击城市回到首页并显示相应城市
    goHomeCity (city) {
      if (city.label === '暂无城市') return
      this.$store.commit('setCity', city)
      this.$router.go(-1)
    },
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {},
  mounted () {
  },
}
</script>

<style scoped lang='less'>
/deep/ .van-index-bar__sidebar {
  margin-top: 50px;
  width: 40px;
  margin-right: 20px;
  .van-index-bar__index {
    height: 40px;
    width: 40px;
    padding-top:6px;
    padding-left: 13px;
    font-size: 16px;
    
  }
  .van-index-bar__index--active{
    color:#fff;
    background-color: #21b97a;
    border-radius: 50%;
  }
}

.container {
  margin-top: 92px;
  overflow: auto;
  height: calc(100vh - 92px);
}
.header {
  width: 750px;
  height: 92px;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
}
.nowCity {
  font-size: 14px;
  padding: 10px 15px px;
  color: #999;
}
.van-cell {
  border-bottom: 1px solid rgb(231, 231, 231);
}
</style>
