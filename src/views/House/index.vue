<template>
  <div class="bgc">
    <!-- header -->
    <van-nav-bar
      left-arrow
      :title="houseInfo.community"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 轮播图 -->

    <van-swipe :autoplay="3000" class="lunbo">
      <van-swipe-item v-for="(image, index) in houseInfo.houseImg" :key="index">
        <img v-lazy="'http://liufusong.top:8080' + image" />
      </van-swipe-item>
    </van-swipe>

    <!--主体 -->
    <!-- 基本信息 -->
    <div class="container">
      <p class="p1">{{ houseInfo.title }}</p>
      <span class="housetag">{{ housetags }}</span>
      <div class="houseinfo1">
        <div class="a">
          <p>{{ houseInfo.price + "元/月" }}</p>
          <span>租金</span>
        </div>
        <div class="a">
          <p>{{ houseInfo.roomType }}</p>
          <span>房型</span>
        </div>
        <div class="a">
          <p>{{ houseInfo.size }}</p>
          <span>面积</span>
        </div>
      </div>
      <div class="houseinfo2">
        <p>装修: {{ taggs }}</p>
        <p>朝向: {{ ori }}</p>
        <p>楼层: {{ houseInfo.floor }}</p>
        <p>类型: 普通住宅</p>
      </div>
    </div>

    <!-- 分区条 -->
    <div style="height: 10px; background-color: #f4f0f0"></div>

    <!-- 小区地图 -->
    <div class="xiaoqu">
      <p>小区：{{ houseInfo.community }}</p>
    </div>

    <!-- 房屋配套 -->
    <div style="height: 10px; background-color: #f4f0f0"></div>
    <div class="housedeploy">
      <h3>房屋配套</h3>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in supporting"
          :key="index"
          :text="item.name"
        >
          <template #icon>
            <i :class="item.namePinyin"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 房源概况 -->
    <div class="housedeploy">
      <h3>房源概况</h3>
      <div class="tupian">
        <van-image
          round
          width="60px"
          height="60px"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <van-button plain type="primary" size="small">朴素按钮</van-button>
      </div>
      <p>{{ houseInfo.description }}</p>
    </div>
    <div style="height: 10px; background-color: #f4f0f0"></div>
    <div class="housedeploy" style="margin-bottom: 70px">
      <h3>猜你喜欢</h3>
      <van-card
        v-for="item in 3"
        :key="item"
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
    <van-tabbar>
      <van-tabbar-item
        :icon="isFavorite ? 'star' : 'star-o'"
        :class="isFavorite ? 'addshouc' : ''"
        @click="collectSelect"
        >收藏</van-tabbar-item
      >
      <van-tabbar-item>在线咨询</van-tabbar-item>
      <van-tabbar-item class="t3">电话预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { pinyin } from 'pinyin-pro'
import { getHouseInfo, isCollect, addCollect, delCollect } from '@/api/house'
export default {
  name: 'House',
  props: {
    housecode: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getHouseInfo()
    this.isCollect()
  },
  data () {
    return {
      houseInfo: [],
      housetags: '',
      supporting: [],
      isFavorite: ''
    }
  },
  methods: {
    async getHouseInfo () {
      try {
        const res = await getHouseInfo(this.housecode)
        console.log(res)
        this.houseInfo = res.data.body
        this.housetags = this.houseInfo.tags.join(' ')
        this.houseInfo.supporting.forEach(item => {
          const Pinyin = 'renthouse ' + 'icon-' + pinyin(item, { toneType: 'none' }).replaceAll(' ', '')
          this.supporting.push({ name: item, namePinyin: Pinyin })
        })
      } catch (err) {
        console.log(err)
      }
    },
    async isCollect () {
      try {
        if (this.$store.state.user.token) {
          const res = await isCollect(this.houseInfo.houseCode)
          console.log(res)
          this.isFavorite = res.data.body.isFavorite
        } else {
          return
        }
      } catch (err) {
        console.log(err);
      }
    },
    async collectSelect () {
      if (this.$store.state.user.token) {
        try {
          if (this.isFavorite) {
            //取消收藏
            const res = await delCollect(this.houseInfo.houseCode)
            this.isCollect()
            console.log(res)
          } else {
            //关注
            const res = await addCollect(this.houseInfo.houseCode)
            this.isCollect()
            console.log(res)
          }
        } catch (err) {
          console.log(err)
        }

      } else {
        this.$dialog.confirm({
          title: '提示',
          message: '亲!您尚未登录请登录后操作哦'
        }).then(() => {
          this.$router.push('/login')
        })
          .catch(() => {

          });
      }
    }
  },
  computed: {
    taggs () {
      if (this.houseInfo.tags) {
        const tag = this.houseInfo.tags.join()
        return tag
      }
      return '不详'
    },
    ori () {
      if (this.houseInfo.oriented) {
        const tag = this.houseInfo.oriented.join()
        return tag
      }
      return '不详'
    },
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .addshouc {
  .van-tabbar-item__icon {
    color: red;
  }
}
/deep/ .t3 {
  background-color: #21b97a;
  color: #fff;
}
/deep/ .van-tabbar-item {
  display: flex;
  height: 100px;
  flex-direction: unset;
  .van-tabbar-item__text {
    font-size: 34px;
  }
}
/deep/ .van-tabbar-item--active {
  color: unset;
}
.housedeploy {
  p {
    font-size: 28px;
    padding: 20px 0px;
    padding-bottom: 40px;
  }
}
.tupian {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0px;
}
.container {
  .p1 {
    font-size: 32px;
    margin-top: 30px;
  }
}
/deep/ .renthouse {
  font-size: 46px;
}
.housedeploy {
  padding: 0px 30px;
  h3 {
    font-size: 30px;
    border-bottom: 1px solid rgb(216, 216, 216);
    padding: 35px 0px;
  }
}
.xiaoqu {
  margin-top: 20px;
}
.houseinfo2 {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 345px;
    font-size: 26px;
  }
}
/deep/ .bgc {
  background-color: #f4f0f4;
}
/deep/ .lunbo {
  height: 422px;
}
.container {
  padding: 0 30px;
  padding-bottom: 25px;
  background-color: #fff;
}
.housetag {
  font-size: 26px;
  background-color: #e1f5f8;
  color: #39becd;
  padding: 5px 15px;
  border-radius: 5px;
}
.houseinfo1 {
  display: flex;
  .a {
    flex: 1;
    text-align: center;
    border-top: 1px solid rgb(216, 216, 216);
    border-bottom: 1px solid rgb(216, 216, 216);
    margin: 30px 0px;
    padding: 24px 0px;
    p {
      font-size: 40px;
      height: 40px;
      color: red;
    }
    span {
      font-size: 28px;
    }
  }
}
</style>
