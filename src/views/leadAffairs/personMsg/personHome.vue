<template>
    <div>
      <div class="box clearfix">
        <van-sticky>
          <div style="background-color:#fff">
            <div class="sidebox">
              <div class="back" @click="backRoster" v-if="seeFlag == 0">
                <i class="iconfont icon-fanhui"></i> 返回
              </div>
              <div class="back" @click="backChanges" v-if="seeFlag == 1">
                <i class="iconfont icon-fanhui"></i> 返回
              </div>
              <div class="back" @click="backperStr" v-if="seeFlag == 2">
                <i class="iconfont icon-fanhui"></i> 返回
              </div>
              <div class="back" @click="backRetStr" v-if="seeFlag == 3">
                <i class="iconfont icon-fanhui"></i> 返回
              </div>
                <div class="contain">
                    <div>
                        <div><span style="font-weight:700">{{personObj.a0101}}</span><span style="float:right"><img class="img" :src="personObj.photo" alt=""></span></div>
                        <span> 工号：{{personObj.a0190}}</span>
                    </div>
                    <div>
                        <span> 岗位：</span><span>{{personObj.post}}</span><br>
                        <span> 部门：</span>{{personObj.dept}}<span></span>
                    </div>
                </div>
            </div> 
          </div>
        </van-sticky>
        <div class="box_left" v-if="flag" ref="left">
          <!-- 左导航栏 -->
          <van-sidebar 
          v-model="activeKey" 
          class="van-sidebar"
          @change="handChange">
              <van-sidebar-item 
              title="基本信息" 
              to="basicMsg"/>
              <van-sidebar-item 
              title="学历信息" 
              to="eduMsg"/>
              <van-sidebar-item 
              title="顾家履历" 
              to="kukaExp"/>
              <van-sidebar-item 
              title="社会履历" 
              to="socialExp"/>
              <van-sidebar-item 
              title="工作信息" 
              to="workMsg"/>
              <van-sidebar-item 
              title="职业资格" 
              to="zhiyeMsg"/>
              <van-sidebar-item 
              title="联系信息" 
              to="touchMsg"/>
              <van-sidebar-item 
              title="亲属关系" 
              to="relMsg"/>
              <!-- <van-sidebar-item 
              title="家庭成员" 
              to="memberMsg"/> -->
              <!-- <van-sidebar-item 
              title="绩效考核" 
              to="jixiaoMsg"/> -->
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
import { Sidebar,SidebarItem,Icon,Sticky } from 'vant'
import '../../../components/comstyle/style.css'
import { mapState,mapMutations } from 'vuex'
import { querySome } from '../../personAffairs/api'
export default {
  data () {
    return {
      activeKey: '',
      flag: true,
      hideleArr: true,
      showArr: false,
      personObj: {},
      seeFlag: '', //从哪个页面点过来的
    };
  },
  computed: {},
  created(){
    this.getSome()
    this.seeFlag = this.$store.state.fromPage
    console.log(this.seeFlag)
  },
  methods:{
    //隐藏导航栏
    hiddle(){
      this.flag = false
      this.showArr = true
      this.hideleArr = false
      // document.getElementsByClassName('box_right')[0].style.width = 100+'%'
      this.$refs.right.style.width = 100+'%'
      console.log(this.$refs)
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
    handChange(){

    },
    //获取头部用户基本信息
    getSome(){
      let queryData = {
        jobnumber:this.$store.state.jobNumber
      }
      querySome(queryData).then(res=>{
        // console.log(res.obj.photo)
        if(res.obj.photo == null || res.obj.photo == undefined || res.obj.photo == ''){
          res.obj.photo = require('@/assets/timg.jpg')
          this.personObj = res.obj
        }else{
          this.personObj = res.obj
        }
      })
    },
    //返回花名册
    backRoster(){
      this.$router.push({name:'roster',params:{scrollTop:this.$store.state.scrollTop}})
      this.scroll_top(0)
    },
    //返回人员异动
    backChanges(){
      this.$router.push({name:'changes',params:{scrollTop:this.$store.state.scrollTop}})
      this.scroll_top(0)
    },
    //返回人员结构
    backperStr(){
      this.$router.push({name:'perStructure'})
      this.scroll_top(0)
    },
    //返回流失率
    backRetStr(){
      this.$router.push({name:'retention'})
      this.scroll_top(0)
    },
    ...mapMutations({
      scroll_top:'scroll_top'
    })
  },
  mounted() {
    // console.log(this.$refs.left.style)
    // this.$refs.left.style.height =  981+'px'
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
      position fixed
      height 100vh
      background-color #f7f8fa
      .van-sidebar{
        overflow-y auto
        overflow-x hidden
        background-color #f7f8fa
        width 100%
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
    .sidebox{
        margin-bottom  10px
        // border-radius 6px
        box-shadow 0px 5px 5px #eee
        .back{
          height 30px
          line-height 30px
          padding-left 10px
          color #ee0a24
        }
      }
      .contain{
          padding 10px
          line-height 35px
          // box-shadow 0px 10px 10px #eee
          .iconfont{
              color #ee0a24
          }
      }
  }
  .img{
      width 60px
      height 60px
      border-radius 50%
    }
</style>