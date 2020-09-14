<template>
  <cube-tab-bar
    class="m-tab"
    v-model="selectedLabelDefault"
    :data="tabs"
    :inline="inline"
    @click="clickHandler"
    @change="changeHandler">
    <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
      <!-- 默认插槽 -->
      <i slot="icon" :class="item.icon"></i>
      <p class="tab-item" >{{item.name}}</p>
    </cube-tab>
  </cube-tab-bar>
</template>

<script>
export default {
  data () {
    return {
      selectedLabelDefault: 'index',
      inline: false,
      tabs: [
        {
          label: 'index',
          name: '首页',
          icon: 'cubeic-home'
        }, 
        {
          label: 'past',
          name: '期刊',
          icon: 'cubeic-time'
        }, 
        {
          label: 'me',
          name: '我的',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      // console.log(label)
      this.$router.push({
        name: label
      })
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}
</script>
<style lang="stylus" scoped>
  .m-tab {
    height 8vh;
    background-color #f4f5f6
    font-size 20px; /*no*/
    box-sizing border-box
    font-weight bold
  }
  .tab-item {
    font-size 10px; /*no*/
    letter-spacing 5px
    text-indent 5px
    // margin-top 5px
  }
</style>