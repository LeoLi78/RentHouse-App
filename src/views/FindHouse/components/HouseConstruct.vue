<template>
  <div>
    <!-- 户型 -->
    <p class="pcss">户型</p>
    <van-checkbox-group
      v-model="result"
      direction="horizontal"
      class="mar-left"
      ref="checkboxGroup"
    >
      <van-checkbox
        :name="item.value"
        v-for="(item, index) in roomType"
        :key="index"
      >
        <template #icon="props">
          <div
            :class="props.checked ? 'fangxin selected' : 'fangxin unselected'"
          >
            {{ item.label }}
          </div>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <!-- 朝向 -->
    <p class="pcss">朝向</p>
    <van-checkbox-group
      v-model="result"
      direction="horizontal"
      class="mar-left"
      ref="checkboxGroup"
    >
      <van-checkbox
        :name="item.value"
        v-for="(item, index) in oriented"
        :key="index"
      >
        <template #icon="props">
          <div
            :class="props.checked ? 'fangxin selected' : 'fangxin unselected'"
          >
            {{ item.label }}
          </div>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <!-- 楼层 -->
    <p class="pcss">楼层</p>
    <van-checkbox-group
      v-model="result"
      direction="horizontal"
      class="mar-left"
      ref="checkboxGroup"
    >
      <van-checkbox
        :name="item.value"
        v-for="(item, index) in floor"
        :key="index"
      >
        <template #icon="props">
          <div
            :class="props.checked ? 'fangxin selected' : 'fangxin unselected'"
          >
            {{ item.label }}
          </div>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <!-- 房屋亮点 -->
    <p class="pcss">房屋亮点</p>
    <van-checkbox-group
      v-model="result"
      direction="horizontal"
      class="mar-left"
      ref="checkboxGroup"
    >
      <van-checkbox
        :name="item.value"
        v-for="(item, index) in characteristic"
        :key="index"
      >
        <template #icon="props">
          <div
            :class="props.checked ? 'fangxin selected' : 'fangxin unselected'"
          >
            {{ item.label }}
          </div>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <!-- 清除--确认 -->
    <van-sticky offset-top="100vh" class="floorselect">
      <van-row>
        <van-col span="8">
          <van-button block @click="checkAll">清除</van-button>
        </van-col>
        <van-col span="16">
          <van-button color="#21b97a" block @click="submitCondition"
            >确定</van-button
          >
        </van-col>
      </van-row>
    </van-sticky>
  </div>
</template> 
<script>
import { mapState } from 'vuex'
export default {
  name: 'HouseConstruct',
  created () { },
  data () {
    return {
      result: [],
      checked: false,
      more: []
    }
  },
  methods: {
    checkAll () {
      this.$refs.checkboxGroup.toggleAll(false);
    },
    submitCondition () {
      let moreStr = this.result.join()
      // console.log(moreStr)
      this.$emit('submitCondition', moreStr)
      this.result = []
    }
  },
  computed: {
    ...mapState(['floor', 'characteristic', 'oriented', 'roomType'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.mar-left {
  margin-left: 100px;
}
.pcss {
  width: 450px;
  font-size: 35px;
  padding-top: 30px;
  padding-left: 20px;
}
/deep/.van-checkbox__icon {
  height: 64px;
  line-height: 64px;
  // text-align: center;
}
.fangxin {
  width: 140px;
  height: 64px;
  border-radius: 6px;
  font-size: 30px;
}
.selected {
  border: 1px solid #21b97a;
  text-align: center;
  color: #21b97a;
  background-color: #f1fcf1;
}
.unselected {
  border: 1px solid #c8c9c9;
  text-align: center;
}
.img-icon {
  height: 20px;
}
.floorselect {
  position: sticky;
  bottom: 0px;
}
.van-row {
  .van-col {
    .van-button {
      border-radius: unset;
      border: 0 solid #ebedf0;
    }
  }
}
/deep/.van-checkbox--horizontal {
  margin-right: 40px;
  margin-top: 20px;
}
/deep/.van-sticky--fixed {
  position: unset;
}
</style>
