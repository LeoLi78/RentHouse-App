<template>
  <van-dropdown-item :title="ways" ref="selectHidden" @opened="getIndex">
    <template #default>
      <van-picker
        show-toolbar
        value-key="label"
        defaultIndex="0"
        :columns="item"
        ref="getIndex"
        @cancel="closeSelectHidden"
        @confirm="selectConditionHouse"
      />
    </template>
  </van-dropdown-item>
</template>

<script>
export default {
  name: "SelectItem",
  props: {
    item: {
      type: Array,
      required: true
    },
    ways: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    closeSelectHidden () {
      this.$refs.selectHidden.toggle(false)
    },
    selectConditionHouse (val) {
      console.log(val)
      console.log(this.ways);
      const areaIndex = this.getIndex()
      console.log(areaIndex);
      if (this.ways === '方式') {
        this.$emit('selectHouse', { property: 'rentType', value: val.value })
      }

      if (this.ways === '价格') {
        this.$emit('selectHouse', { property: 'price', value: val.value })
      }

      if (this.ways === '区域') {
        // 区域
        if (areaIndex[0] === 0) {
          console.log(this.item[0]);
          if (areaIndex[2] === 0 && areaIndex[1] !== 0) {
            const value = this.item[0].children[areaIndex[1]].value
            // console.log(value)
            this.$emit('selectHouse', { property: 'area', value: value })
          } else if (areaIndex[1] === 0) {
            this.$emit('selectHouse', { property: 'area', value: null })
          } else {
            const value = this.item[0].children[areaIndex[1]].children[areaIndex[2]].value
            console.log(value);
            this.$emit('selectHouse', { property: 'area', value: value })
          }
        } else {
          // 地铁
          if (areaIndex[2] === 0 && areaIndex[1] !== 0) {
            const value = this.item[1].children[areaIndex[1]].value
            this.$emit('selectHouse', { property: 'subway', value: value })
          } else if (areaIndex[1] === 0) {
            this.$emit('selectHouse', { property: 'subway', value: null })
          } else {
            const value = this.item[1].children[areaIndex[1]].children[areaIndex[2]].value
            this.$emit('selectHouse', { property: 'subway', value: value })
          }
        }
      }
      this.$refs.selectHidden.toggle(false)
    },
    // 获取区域索引
    getIndex () {
      return this.$refs.getIndex.getIndexes()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // this.$refs.getIndex.getIndexes()
    // console.log(this.$refs.getIndex)
  },
}
</script>

<style scoped lang='less'>
</style>
