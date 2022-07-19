<template>
  <div style="position: relative">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="'http://liufusong.top:8080' + image.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索 -->
    <!-- <van-search
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
    </van-search> -->
    <SearchCity></SearchCity>
    <!-- 中部内容 -->
    <div class="con-nav">
      <div>
        <van-icon name="wap-home-o" @click="$router.push('/findhouse')" />
        <p>整租</p>
      </div>
      <div>
        <van-icon name="friends-o" @click="$router.push('/findhouse')" />
        <p>合租</p>
      </div>
      <div>
        <van-icon name="logistics" />
        <p>地图找房</p>
      </div>
      <div>
        <van-icon name="cash-back-record" @click="$router.push('/renthouse')" />
        <p>去出租</p>
      </div>
    </div>
    <!-- 租房--更多 -->
    <div class="rent">
      <div class="rent-more">
        <h3>租房小组</h3>
        <p>更多</p>
      </div>
      <div class="rent-item">
        <van-card
          v-for="item in rentHouse"
          :key="item.id"
          :desc="item.desc"
          :title="item.title"
          :thumb="'http://liufusong.top:8080' + item.imgSrc"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getSwiper, getRentHouse } from '@/api/home'
export default {
  created () {
    this.getSwiper(),
      this.getRentHouse()
  },
  data () {
    return {
      images: [],
      searchText: '',
      rentHouse: []
    }
  },
  methods: {
    async getSwiper () {
      try {
        const res = await getSwiper()
        console.log(res);
        this.images = res.data.body
        console.log(this.images);
      } catch (err) {
        console.log(err);
      }
    },
    async getRentHouse () {
      try {
        const res = await getRentHouse(this.$store.state.sCity.value)
        console.log(res);
        this.rentHouse = res.data.body
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.ditu {
  padding-top: 13px;
}
/deep/.weizhi {
  width: 720px;
  position: fixed;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: unset;
}
/deep/.van-swipe__track {
  width: 750px;
  height: 414px;
}
// .leftcity {
//   i {
//     border-right: 1px solid rgb(208, 206, 206);
//     padding-right: 15px;
//     padding-top: 10px;
//     padding-bottom: 10px;
//   }
// }
.con-nav {
  padding-top: 30px;
  display: flex;
  justify-content: space-around;
  div {
    text-align: center;
    i {
      font-size: 70px;
      color: rgb(75, 216, 145);
      background-color: rgb(237, 249, 243);
      padding: 15px;
      border-radius: 50%;
    }
    p {
      margin: 40px 0;
      font-size: 30px;
    }
  }
}
.rent {
  padding: 0 20px;
  background-color: rgb(241, 241, 241);
  .rent-more {
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    h3 {
      font-size: 30px;
    }
    p {
      font-size: 28px;
    }
  }
}
.rent-item {
  padding-bottom: 20px;
  .van-card {
    width: 345px;
    height: 140px;
    .van-card__thumb {
      width: 100px;
      height: 100px;
      /deep/:first-child {
        margin-top: 0.21333rem;
      }
    }
  }
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
