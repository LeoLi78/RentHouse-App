<template>
  <div>
    <!-- 登录 -->
    <div class="nobg" v-if="$store.state.user && $store.state.user.token">
      <!-- header -->
      <div class="wigthB">
        <div class="header_logout">
          <div class="yuan">
            <img :src="'http://liufusong.top:8080'+userInfo.avatar" alt="" /> 
          </div>
          <p>{{ userInfo.nickname }}</p>
          <van-button
            color="#21b97a"
            size="small"
            v-if="$store.state.user && $store.state.user.token"
            @click="logout"
            >退出登录</van-button
          >
          <p>编辑个人资料<van-icon name="play" /></p>
        </div>
      </div>
      <!-- 主体 -->
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="paid" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="phone-circle-o" text="联系我们" />
      </van-grid>
      <img class="join" src="@/assets/join.png" alt="" />
    </div>

    <!-- 未登录 -->
    <div class="nobg" v-else>
      <!-- header -->
      <div class="wigthB">
        <div class="header_logout">
          <div class="yuan">
            <img src="@/assets/avatar1.png" alt="" />
          </div>
          <p>游客</p>
          <van-button
            color="#21b97a"
            size="small"
            @click="$router.push('/login')"
            >去登录</van-button
          >
        </div>
      </div>
      <!-- 主体 可以在此用to 来实现页面跳转-->
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="paid" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="phone-circle-o" text="联系我们" />
      </van-grid>
      <img class="join" src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  async created () {
    if (this.$store.state.user && this.$store.state.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: 'Are you sure to logout' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
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
.nobg {
  width: 750px;
  background: url("@/assets/nologin_bg.png") no-repeat;
  background-size: contain;
  padding-top: 260px;
  // margin-bottom: 100px;
  .join {
    padding-right: 30px;
    padding-left: 30px;
  }
  .wigthB {
    width: 560px;
    height: 300px;
    background-color: #fff;
    box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.2);
    margin-left: 95px;
    margin-bottom: 15px;
    .header_logout {
      text-align: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -23%);
      .span {
        font-size: 14px;
      }
      .yuan {
        background-color: #fff;
        height: 140px;
        width: 140px;
        border-radius: 50%;
        box-shadow: 0px 1px 10px 4px rgba(0, 0, 0, 0.2);
        img {
          margin-top: 10px;
          width: 120px;
          height: 120px;
          display: inline-block;
        }
      }
      p {
        margin-top: 20px;
        font-size: 14px;
        .van-icon {
          display: inline;
        }
      }
    }
  }
}
</style>
