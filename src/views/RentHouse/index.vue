<template>
  <div style="font-size: 15px">
    <!-- header -->
    <van-nav-bar
      left-arrow
      title="发布房源"
      @click-left="$router.back()"
    ></van-nav-bar>
    <p class="border-b">房源信息</p>
    <van-cell-group>
      <van-cell
        title="小区名称"
        is-link
        :value="
          areaItemInfo.communityName
            ? areaItemInfo.communityName
            : '请输入小区名称'
        "
        @click="showPopup"
      />
      <!-- 弹出层 -->
      <!-- 区域 -->
      <van-popup v-model="show" :style="{ width: '100%', height: '100%' }">
        <SearchArea
          @show="show = $event"
          @areaItem="areaItem($event)"
        ></SearchArea>
      </van-popup>
      <!-- 租金 -->
      <van-field
        v-model="price"
        label="租金"
        type="number"
        placeholder="请输入租金/月"
      >
        <template #extra>
          <p>￥/月</p>
        </template>
      </van-field>
      <!-- 面积 -->
      <van-field
        v-model="size"
        clearable
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #extra>
          <p>m<sup>2</sup></p>
        </template>
      </van-field>

      <!-- 户型选择 -->
      <van-cell
        title="户型"
        is-link
        :value="roomType.label ? roomType.label : '请选择'"
        @click="hxShow = true"
      />
      <van-popup v-model="hxShow" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="户型"
          show-toolbar
          value-key="label"
          :columns="$store.state.roomType"
          @confirm="hxConfirm"
          @cancel="hxShow = false"
      /></van-popup>

      <!-- 楼层选择 -->
      <van-cell
        title="所在楼层"
        is-link
        :value="floor.label ? floor.label : '请选择'"
        @click="lcShow = true"
      />
      <van-popup v-model="lcShow" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="所在楼层"
          show-toolbar
          value-key="label"
          :columns="$store.state.floor"
          @confirm="lcConfirm"
          @cancel="lcShow = false"
      /></van-popup>
      <!-- 朝向 -->
      <van-cell
        title="朝向"
        is-link
        :value="oriented.label ? oriented.label : '请选择'"
        @click="cxShow = true"
      />
      <van-popup v-model="cxShow" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="所在楼层"
          show-toolbar
          value-key="label"
          :columns="$store.state.oriented"
          @confirm="cxConfirm"
          @cancel="cxShow = false"
      /></van-popup>
    </van-cell-group>
    <div class="pad hig">
      <!-- 房屋标题 -->
      <p class="pad-l-r-b">房屋标题</p>
      <input
        v-model="houseTitle"
        class="tit-inp"
        type="textarea"
        placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
      />
    </div>
    <!-- 房屋图像 -->
    <div class="pad">
      <p class="pad-l-r-b">房屋图像</p>
      <van-field name="uploader" ref="updatafile">
        <template #input>
          <van-uploader v-model="uploader" multiple :after-read="afterRead" />
        </template>
      </van-field>
    </div>
    <!-- 房屋配置 -->
    <div class="pad">
      <p class="pad-l-r-b">房屋配置</p>
      <van-checkbox-group v-model="result" direction="horizontal">
        <van-checkbox
          :name="item.name"
          v-for="(item, index) in supported"
          :key="index"
          :class="value ? 'selectColor' : ''"
          checked-color="#21b97a"
        >
          <template #icon="props">
            <i
              :class="
                props.checked ? `selectColor ${item.pinyin}` : `${item.pinyin}`
              "
            />
          </template>
          <template #default>
            <p>{{ item.name }}</p>
          </template>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <!-- 分区条 -->
    <div style="height: 20px; background-color: #f4f0f0"></div>
    <!-- 房屋描述 -->
    <div class="pad higg">
      <p class="pad-l-r-b">房屋描述</p>
      <input
        v-model="houseMiaoshu"
        type="textarea"
        placeholder="请输入房屋描述信息"
      />
    </div>
    <div class="anniu">
      <van-button plain type="primary" block>取消</van-button>
      <van-button type="primary" block @click="fabuHouse">确认</van-button>
    </div>
  </div>
</template>

<script>
import { addHouse, addImage } from '@/api/house'
import { pinyin } from 'pinyin-pro'
import SearchArea from './components/searchArea.vue'
export default {
  name: 'RentHouse',
  created () { },
  data () {
    return {
      value: false,
      lcShow: false,
      hxShow: false,
      cxShow: false,
      show: false,
      areaItemInfo: {},//区域信息
      price: '', //
      size: '', //
      roomType: {}, //房屋类型
      floor: {}, //楼层
      oriented: {}, //朝向
      houseTitle: '',//标题
      uploader: [],//原始图片
      tupainzu: [],
      support: ['衣柜', '洗衣机', '空调', '天然气', '冰箱', '暖气', '电视', '热水器', '宽带', '沙发'],//
      result: [],//配置支持
      houseMiaoshu: ''//房屋描述
    }
  },
  methods: {
    showPopup () {
      this.show = true;
    },
    areaItem (item) {
      console.log(item)
      this.areaItemInfo = item
      this.show = false
    },
    hxConfirm (value) {
      console.log(value);
      this.roomType = value
      this.hxShow = false
    },
    lcConfirm (value) {
      console.log(value);
      this.floor = value
      this.lcShow = false
    },
    cxConfirm (value) {
      console.log(value);
      this.oriented = value
      this.cxShow = false
    },
    // 图片上传，并把数据处理到tupianzu
    async afterRead (file) {
      console.log(file)
      const img = new FormData()
      img.append('file', file.file)
      console.log(img)
      try {
        const res = await addImage(img)
        console.log(res)
        this.tupainzu.push(res.data.body[0])
      } catch (err) {
        this.$toast('上传失败')
        console.log(err)
      }
    },
    async fabuHouse () {
      console.log(this.allInfo)
      if (this.tupainzu.length === 0) {
        this.$toast.fail('房屋图片不能为空哦')
      }
      try {
        const res = await addHouse(this.allInfo)
        console.log(res)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
        console.log(err)
      }
    }
  },
  computed: {
    supported () {
      let arr = []
      this.support.forEach(item => {
        const Pinyin = 'renthouse ' + 'icon-' + pinyin(item, { toneType: 'none' }).replaceAll(' ', '')
        arr.push({ name: item, pinyin: Pinyin })
      })
      return arr
    },
    allInfo () {
      return {
        title: this.houseTitle,
        description: this.houseMiaoshu,
        houseImg: this.tupainzu.join('|'),
        oriented: this.oriented.value,
        supporting: this.result.join('|'),
        price: this.price,
        roomType: this.roomType.value,
        size: this.size,
        floor: this.floor.value,
        community: this.areaItemInfo.community
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    SearchArea
  }
}
</script>

<style scoped lang='less'>
.anniu {
  display: flex;
  position: fixed;
  bottom: 0px;
  width: 750px;
}
/deep/ .selectColor {
  color: #21b97a;
}
/deep/ .van-checkbox {
  margin: 30px 0px;
  width: 138px;
  flex-direction: column;
  justify-content: center;
  i {
    padding-left: 15px;
    font-size: 46px;
    height: 60px;
  }
  p {
    margin-top: 20px;
  }
}
.dingwei {
  position: relative;
  .zujin {
    position: absolute;
    background-color: pink;
  }
}

.higg {
  height: 400px;
  margin-bottom: 90px;
}
.hig {
  height: 200px;
}
.tit-inp {
  width: 690px;
}
.pad {
  padding: 0px 30px;
}
.pad-l-r-b {
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 234, 234);
}
.border-b {
  border-bottom: 1px solid rgb(240, 234, 234);
  padding: 25px 30px;
  color: #21b97a;
}
</style>
