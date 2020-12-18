<template>
    <div>
      <div class="box clearfix">
        <div class="box_left" v-if="flag">
          <!-- 左导航栏 -->
          <van-sidebar
          v-model="activeKey"
          class="van-sidebar"
          @change="handChange">
              <van-sidebar-item
              v-for="item in gerenList"
              :key="item.recordid"
              v-html="item.menu"
       
              :to="item.url"/>
          </van-sidebar>
        </div>
        <div class="box_right" ref="right">
          <!-- <button @click="hiddle">haha</button> -->
          <span @click="hiddle" class="arrow" v-if="hideleArr">
            <van-icon name="arrow-left" color="orange" />
          </span>
          <span @click="show" class="arrow" v-if="showArr">
            <van-icon name="arrow" color="orange" />
          </span>
          <router-view />
        </div>
      </div>
    </div>
</template>
<script>
import { Sidebar,SidebarItem,Icon } from 'vant'
// import * as dd from "dingtalk-jsapi"
import '../../components/comstyle/style.css'
import { mapState,mapMutations } from 'vuex'
import { getMenu } from './api'
export default {
  data () {
    return {
      // activeKey: '',
      flag: true,
      hideleArr: true,
      showArr: false,
      gerenList: [], //获取菜单
    };
  },
  computed: {
    // ...mapState({
    //   activeKey: state => state.type
    // }),
    activeKey:{
      //getter  获取activeKey默认值
      get: function(){
        return this.$store.state.type
      },
      //setter  修改activeKey的默认值
      set: function(newVal){
        this.$store.state.type = newVal
      }
    }

  },
  created(){
    this._getMenu()
  },
  methods:{
    //获取菜单
    _getMenu(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        type:'in'
      }
      getMenu(queryData).then(res=>{
        this.gerenList = res.obj
        if(localStorage.getItem('userinfo')){
          let userinfo = JSON.parse(localStorage.getItem('userinfo'))
           if( userinfo != null && userinfo.isCadre != 'Y'){
             for(let i in this.gerenList){
               if(this.gerenList[i].url == "teamFoster"){
                 this.gerenList.splice(i, 1);
               }
             }
          }
        }
        // let userinfo = JSON.parse(localStorage.getItem('userinfo'))


      })
    },
    //隐藏导航栏
    hiddle(){
      this.flag = false
      this.showArr = true
      this.hideleArr = false
      // document.getElementsByClassName('box_right')[0].style.width = 100+'%'
      this.$refs.right.style.width = 100+'%'
      // console.log(this.$refs)
      this.$refs.right.children[0].style.left = 0
    },
    show(){
      this.flag = true
      this.hideleArr = true
      this.showArr = false
      this.$refs.right.style.width = ''
      this.$refs.right.children[0].style.left = ''
      // this.$refs.arrow.style.left = ''
    },
    handChange(index){
      // console.log(this.activeKey)
      console.log(index)
      this.save_type(index)
    },
    //页面滚动
    handleScroll(){
      console.log('object')
    },
    handleFn(){
      this.$router.push({name:'selfHome'})
    },
    ...mapMutations({
      save_type:'save_type'
    })
  },
  mounted() {
    let that = this
    dd.ready(() => {
      dd.biz.navigation.setRight({
          // show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
          text: '首页',//控制显示文本，空字符串表示显示默认文本
          onSuccess : function(result) {
              //如果control为true，则onSuccess将在发生按钮点击事件被回调
              /*
              {}
              */
            that.$router.push({name:'selfHome'})
          },
          onFail : function(err) {}
      });
    })

    //pc端返回事件
    DingTalkPC.ready(() => {
      DingTalkPC.addEventListener('leftBtnClick', handleFn)
    })
  },
}
</script>
<style lang="stylus" scoped>
  .box{
    width 100%
    height 100%
    .headtop{
      height 190px
      width 100%
      padding 10px
      background-color #fff
      margin-bottom 10px
      .header{
          padding-top 10px
          text-align center
          img{
              width 60px
              height 60px
              border-radius 50%
          }
          p{
              text-align center
              padding-top 4px
              font-weight 700
          }
      }
      .contain{
          padding 10px 15px
          line-height 28px
          .iconfont{
              color #ee0a24
          }
      }
      .headinfo{
        width 95%
        height 100%
        border-radius 8px
        box-shadow 0 10px 10px #eee
      }
    }
    .box_left{
      float left
      height 100%
      width 23%
      background-color #f7f8fa
      .van-sidebar{
        position fixed
        top 0
        bottom  0
        overflow-y auto
        overflow-x hidden
        background-color #f7f8fa
        width 23%
        .van-sidebar-item--select, .van-sidebar-item--select:active {
            color #ee0a24
            font-weight 700
        }
      }
    }
    .box_right{
      // position relative
      float right
      height 100%
      overflow auto
      width 77%
      .arrow{
        position fixed
        z-index: 99
        left 22%
        bottom 50%
      }
    }
  }
</style>
