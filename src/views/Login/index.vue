<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.back()"/>

    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    // onClickLeft () {
    //   this.$toast('返回')
    // },

    async onSubmit (values) {
      console.log('submit', values);
      // let userN = /^[a-zA-Z0-9_-]{4,16}$/
      // let passW = /^[0-9A-Za-z]{6,16}$/
      try {
        const res = await login(values)
        console.log(res);
        if(res.data.status === 400 ){
          return 
          // alert(res.data.data.description)
        }
        this.$store.commit('setUser', res.data.body)
        this.$toast.success('Login in success')
        this.$router.push('/my')
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>
<style scoped lang='less'>
.login-btn {
  background-color: #21b97a;
  border: none;
}
</style>
