<template>
    <div>
        <div class="myContents">
            <div class="bgc">
            </div>
            <div style="clear:both">
              <div class="headTop">
                <div class="messageInfoos">
                    <span @click="uploadImg"><img class="img" :src="personObj.photo" alt=""></span>
                    <div style="padding-top:10px">
                      <span style="font-weight:700;font-size:16px">{{personObj.a0101}}</span>

                    </div>
                    <div><span class="resuName">{{personObj.a0190}}</span></div>
                    <!-- <div><span class="resuName">{{personObj.post}}</span></div> -->
                </div>
                <div class="infomessage">
                  <div class="infobox">
                    <span class="wname">岗位</span><br>
                    <span>{{personObj.post}}</span>
                  </div>
                  <div class="infobox">
                    <span class="wname">部门</span><br>
                    <span>{{personObj.dept}}</span>
                  </div>
                </div>
              </div>
            </div>
                <div class="contents">
                  <div>
                    <span style="font-weight:700;font-size:14px"><i class="iconfont icon--_caozuo"></i>操作指引</span>
                    <span style="float:right;color:#767676;font-size:14px" @click="seePdf">查看</span>
                  </div>
                </div>
            <div class="other">
              <div>
                <span class="border"></span>
                <span style="font-weight:900">个人信息</span>
              </div>
              <div class="_items">
                <div class="_item" v-for="item in gerenList" :key="item.recordid" @click="handlerClick(item)">
                  <img :src="item.path" alt="">
                  <span>{{item.menu}}</span>
                </div>
                <div class="edit" @click="edit">
                  <img src="../../assets/paixu2.png" alt="">
                </div>
              </div>
            </div>

            <div class="other">
              <div>
                <span class="border"></span>
                <span style="font-weight:900">我的团队</span>
              </div>
              <div class="_items">
                <div class="_item" v-for="item in leadList" :key="item.title" @click="handlerTeam(item)">
                  <img :src="item.img" alt="">
                  <span>{{item.title}}</span>
                </div>
              </div>
            </div>
            <div class="other">
              <div>
                <span class="border"></span>
                <span style="font-weight:900">其他应用</span>
              </div>
              <div class="_items">
                <div class="_item" @click="leadClick">
                  <img src="../../assets/rongyu.png" alt="">
                  <span>荣誉堂</span>
                </div>
                <div class="_item" @click="leadClick1">
                  <img src="../../assets/rencailogo.png" alt="">
                  <span>人才池</span>
                </div>
                <div class="_item" @click="leadClick2">
                  <img src="../../assets/gujiaren.png" alt="">
                  <span>顾家人</span>
                </div>
                <div class="_item" @click="leadClick3">
                  <img src="../../assets/tousu.jpg" alt="">
                  <span>投诉直通车</span>
                </div>
                <div class="_item" @click="leadClick4">
                  <img src="../../assets/xue.png" alt="">
                  <span>顾家学堂</span>
                </div>
              </div>
            </div>
        </div>
        <!-- 编辑菜单顺序弹窗 -->
        <van-popup
        v-model="show"
        position="top"
        :style="{ height: '80%' }"
        >
        <!-- 有过渡效果的 -->
          <transition-group
          type="transition"
          class="infoitems"
          :name="!drag ? 'flip-list' : null">
              <div
                  class="infoitem"
                  v-for="item in gerenLists" v-dragging="{ item: item, list: gerenLists, group: 'gerenLists' }"
                  :key="item.recordid"
                  @click="update(item)"
              >
              <img :src="item.path" alt="">
              <span>{{item.menu}}</span>
              </div>
          </transition-group>

          <!-- 无过渡效果的 -->
          <!-- <div class="infoitems">
              <div
                  class="infoitem"
                  v-for="item in gerenLists" v-dragging="{ item: item, list: gerenLists, group: 'gerenLists' }"
                  :key="item.recordid"
                  @click="update(item)"
              >
              <img :src="item.path" alt="">
              <span>{{item.menu}}</span>
              </div>
          </div> -->

          <div style="text-align:right;padding-right:10px">
            <span><van-button type="primary" size="small" @click="updateConfirm">确认修改</van-button></span>
          </div>
        </van-popup>
        <!-- 上传头像的弹窗 -->
        <van-popup
        v-model="showImg"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >

            <div class="uploadimg">
                <!-- <van-uploader v-model="fileList" :after-read="afterRead"  :max-count="1" /> -->
                <cube-upload
                :action="actions"
                v-model="fileData"
                :simultaneous-uploads="1"
                @files-added="filesAdded"
                @file-success="successImg"
                :max="1" />
            </div>
            <div class="imgText">
                请选择要上传的图片~(请选择1M以下的图片，选择后即上传)
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Button,Grid,GridItem,Icon,Popup,Notify } from 'vant'
import { mapMutations } from 'vuex'
import { setDDConfig } from '@/api/dd'
import fetch from '@/api/fetch'
import { queryPerson,getMenu,setMenu } from './api'
import draggable from 'vuedraggable'
import { getOrz } from "@/views/leadAffairs/api.js";
export default {
  data () {
    return {
      personObj: {},
      zanPhoto: '', //暂存头像
      showImg: false, //上传头像的弹窗
      fileData: [], //上传头像的数据
      actions: {
        target:'',
        checkSuccess:this.backRes
      },
      gerenList: [], //菜单项
      gerenLists: [], //弹窗获取全部
      newList: [], //排序后的顺序
      leadList: [
        {sortNum:0,title:'花名册',img:'http://192.168.249.18:7020/menuImage/huaming.png'},
        {sortNum:1,title:'流失率',img:'http://192.168.249.18:7020/menuImage/liushi.png'},
        {sortNum:2,title:'人员结构',img:'http://192.168.249.18:7020/menuImage/jiegou.png'},
        {sortNum:3,title:'人效分析',img:'http://192.168.249.18:7020/menuImage/renxiao.png'},
        {sortNum:4,title:'人员异动',img:'http://192.168.249.18:7020/menuImage/yidong.png'},
        {sortNum:5,title:'编制分析',img:'http://192.168.249.18:7020/menuImage/bianzhi.png'},
        {sortNum:6,title:'干部档案',img:'http://192.168.249.18:7020/menuImage/ganbu.png'},
        {sortNum:7,title:'薪资库',img:'http://192.168.249.18:7020/menuImage/xck.png'},
        {sortNum:8,title:'年薪分位值',img:'http://192.168.249.18:7020/menuImage/nxfw.png'},
        {sortNum:9,title:'人均年薪',img:'http://192.168.249.18:7020/menuImage/xck.png'},
        {sortNum:10,title:'人均工资',img:'http://192.168.249.18:7020/menuImage/xck.png'},
        {sortNum:11,title:'人工费用',img:'http://192.168.249.18:7020/menuImage/rgfy.png'},
        {sortNum:12,title:'奖励进度',img:'http://192.168.249.18:7020/menuImage/jljd.png'},
      ],
      colors: [{
            text: "Aquamarine"
        }, {
            text: "Hotpink"
        }, {
            text: "Gold"
        }, {
            text: "Crimson"
        }, {
            text: "Blueviolet"
        }, {
            text: "Lightblue"
        }, {
            text: "Cornflowerblue"
        }, {
            text: "Skyblue"
        }, {
            text: "Burlywood"
        }],
      show: false,
      drag: false
    };
  },
  created(){
    // localStorage.setItem('jobNum',6006212)
    localStorage.setItem('jobNum',9050104)
    // localStorage.setItem('jobNum',9102171)
    // localStorage.setItem('jobNum',9078825)
    // localStorage.setItem('jobNum',6003239)
    // localStorage.setItem('jobNum',9129738)
    this._getOrz()
    if(localStorage.getItem('jobNum') == '' || localStorage.getItem('jobNum') == null || localStorage.getItem('jobNum') == undefined){
      this.getUser()
    }else{
      this.getPerson()
      this._getMenu() //获取首页显示的菜单
      this._getMenus() //获取弹窗要排序显示的菜单
    }
  },
  methods:{
     //获取组织下的部门
    _getOrz() {
      let queryData = {
        jobnumber: 6006212
      };
      getOrz(queryData).then(res => {
        // this.deptData.push(res.obj.departments);
        localStorage.setItem('departRes',JSON.stringify(res))
        // localStorage.setItem()
      });
    },
    //获取用户基本信息
    getPerson(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum')
      }
      queryPerson(queryData).then(res=>{
        console.log(res.obj.photo)
        if(res.obj.photo == null || res.obj.photo == undefined || res.obj.photo == ''){
          res.obj.photo = require('@/assets/timg.jpg')
          this.personObj = res.obj
        }else{
          this.personObj = res.obj
        }
      })
    },
    //获取首页菜单
    _getMenu(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        type:'out'
      }
      getMenu(queryData).then(res=>{
        let userinfo = JSON.parse(localStorage.getItem('userinfo'))
           if( userinfo != null  && userinfo.isCadre != 'Y'){
             for(let i in res.obj){
               if(res.obj[i].menu == '团队培育'){
                 res.obj.splice(i,1)
               }
             }
           }
          this.gerenList = res.obj
      })
    },
    //弹窗排序需获取全部
    _getMenus(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum'),
        type:'in'
      }
      getMenu(queryData).then(res=>{
        let userinfo = JSON.parse(localStorage.getItem('userinfo'))
           if( userinfo != null  && userinfo.isCadre != 'Y'){
             for(let i in res.obj){
               if(res.obj[i].menu == '团队培育'){
                 res.obj.splice(i,1)
               }
             }
           }
        this.gerenLists = res.obj
      })
    },
    //上传头像
    uploadImg(){
      this.showImg = true
    },
    //选择上传图片
    filesAdded(){
        this.actions.target = `/kukacms/self/uploadAvatar?type=2&jobnumber=${localStorage.getItem('jobNum')}`
        this.showImg = false
    },
    //上传成功后的回调
    successImg(file){
        // debugger
        var that = this
        console.log(file)
        var files = file.file
        var reader = new FileReader(); //创建一个文件读取读取对象
        // console.log('reader'+reader)
        reader.readAsDataURL(files); //使用readAsDataURL（）方法，读取已获取的文件，并返回数据
        reader.onload = function() {
          //事件读取对象.onload 事件， onload事件 文件读取完成时触发
        //   that.src = reader.result;
        // for (var i in that.achlist){
            // 将img的src属性等于数据

          that.zanPhoto = reader.result
        // }
          console.log(reader.result);
        };
        that.showImg = false
    },
    //后台上传返回结果
    backRes(res){
      console.log(res)
      if(res.code == 1001){
        Notify({ type: 'warning', message: res.msg })
      }else{
        // this.personObj.photo = this.zanPhoto
        this.getPerson()
        this.fileData = []
      }
    },
    //判断跳转的页面
    handlerClick(item){
      console.log(item)
      let titName = item.menu
      let sortNum = item.sortNumber
      let urlPath = item.url
      switch(titName){
        case '基本信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '工资查询':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '顾家履历':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '社会履历':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '学历信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '联系信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '考勤信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '亲属关系':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '家庭成员':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '绩效考核':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '工作信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '职业资格':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '社会履历':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '联系信息':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '项目经历':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
        case '团队培育':
          // console.log(urlPath)
          this.save_type(sortNum)
          this.$router.push({name:urlPath})
          break;
      }
    },
    leadClick(){
      // var url='dingtalk://dingtalkclient/action/openapp?corpid=ding4f82ce64859fa82335c2f4657eb6378f&container_type=work_platform&app_id=798823910&redirect_type=jump&redirect_url=http://www.rc.kukahome.com:8880/mrt/'
      // const a = document.createElement('a'); // 创建a标签
      // a.setAttribute('href', url);// href链接
      // a.click();// 自执行点击事
      window.open('http://www.rc.kukahome.com:8880/mrt/')
    },
    leadClick1(){
      window.open('http://www.rc.kukahome.com:8880/hms/')
    },
    leadClick2(){
      window.open('http://family.kukahome.com:5080/kukacms/dist/')
    },
    leadClick3(){
      window.open('http://family.kukahome.com:5080/kukacms/tousu/')
    },
    leadClick4(){
      window.open('https://res.exexm.com/dingtalk/common-no-cache/dingtalkindex.html?tenantId=kukahome&dd_full_screen=true')
    },
    ...mapMutations({
      save_type:'save_type',
      to_Roster:'to_Roster'
    }),
    //编辑排序
    edit(){
      this.show = true
    },
    update(item){
      // console.log(item)
    },
    // //触摸事件开始
    // start(){
    //   console.log('开始')
    // },
    // //触摸事件进行
    // move(){
    //   console.log('移动中')
    // },
    // //触摸事件结束
    // end(){
    //   console.log('结束')
    // },

    //获取钉钉个人信息
    getUser(){
      // 获取用户 id
      setDDConfig().then(res => {
        var that = this
        let data = res
        var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
        if (!is_mobi) {
          // PC
          console.log('pc')
          DingTalkPC.ready(() => {
            DingTalkPC.runtime.permission.requestAuthCode({
                corpId: data.corpId, //企业ID
                onSuccess: function(result) {
                  let url = '/kukacms/self/login/getDingUserInfo?code=' + result.code
                  fetch({
                    url: url,
                    method: 'get'
                  }).then(res => {
                    console.log(res)
                    // that.save_userId(res.userId)
                    localStorage.setItem('jobNum',res.jobNumber)
                    localStorage.setItem('telNum',res.mobile) //手机号
                    that.getPerson()
                    that._getMenu() //获取首页显示的菜单
                    that._getMenus() //获取弹窗要排序显示的菜单
                  })
                },
                onFail: function(err) {
                  // window.location.reload()
                }
            })
          })
        } else {
          // 移动
          console.log('mobile')
          dd.ready(() => {
            dd.ui.webViewBounce.disable()
            dd.runtime.permission.requestAuthCode({
              corpId: data.corpId,
              onSuccess: function(result) {
                let url = '/kukacms/self/login/getDingUserInfo?code=' + result.code
                fetch({
                  url: url,
                  method: 'get'
                }).then(res => {
                  console.log('这是首页的自动登录')
                  console.log(res)
                  // that.save_userId(res.userId)
                  localStorage.setItem('jobNum',res.jobNumber)
                  localStorage.setItem('telNum',res.mobile) //手机号
                  console.log('首页获取的工号'+localStorage.getItem('jobNum'))
                  that.getPerson()
                  that._getMenu() //获取首页显示的菜单
                  that._getMenus() //获取弹窗要排序显示的菜单
                })
              },
              onFail : function(err) {
                // window.location.reload()
                alert(err)
              }
            })
          })
        }

      })
    },
    //确认排序
    updateConfirm(){
      console.log(this.newList)
      let queryData = {}
      queryData.obj = this.newList
      queryData.jobnumber = localStorage.getItem('jobNum')
      setMenu(queryData).then(res=>{
        if(res.code == 1000){
          this._getMenu() //获取首页显示的菜单
          Notify({ type: 'success', message: '成功修改排序' })
          this.show = false
        }else{
          Notify({ type: 'warning', message: '修改排序失败' })
          this.show = false
        }
      })
    },
    seePdf(){
      window.open('http://ehrfile.kukahome.com:7020/operation/%E5%91%98%E5%B7%A5%E8%87%AA%E5%8A%A9%E6%93%8D%E4%BD%9C%E6%8C%87%E5%BC%95.pdf')
    },
    handlerTeam(item){
      let teamName = item.title
      let sortNum = item.sortNum
      switch(teamName){
        case '花名册':
        this.save_type(sortNum)
        this.to_Roster(0)
        this.$router.push({name:'roster'})
        break;
        case '流失率':
        this.save_type(sortNum)
        this.$router.push({name:'retention'})
        break;
        case '人员结构':
        this.save_type(sortNum)
        this.$router.push({name:'perStructure'})
        break;
        case '人效分析':
        this.save_type(sortNum)
        this.$router.push({name:'humanEffect'})
        break;
        case '人员异动':
        this.save_type(sortNum)
        this.$router.push({name:'changes'})
        break;
        case '奖励进度':
        this.save_type(sortNum)
        this.$router.push({name:'ProgressRewards'})
        break;
         case '人均工资':
        this.save_type(sortNum)
        this.$router.push({name:'perCapitaWage'})
        break;
        case '干部档案':
        this.save_type(sortNum)
        this.$router.push({name:'cadreArchives'})
        break;
      }
    }
  },
  mounted() {
　　  this.$dragging.$on('dragged', ({ value }) => {
        // console.log(value.item)
        console.log(value.list)
        this.newList = value.list
        // console.log(value.otherData)
      })
      this.$dragging.$on('dragend', () => {

      })
　　},
  components: {
      draggable
  },
}
</script>
<style lang="stylus" scoped>
i{
  font-style normal
}
  .myContents{
    background-color #f6f6f8
    // height 100vh
    .infomes{
      display flex
      background-color #fff
      margin-left 72px
      .infobox{
        flex 1
        line-height 25px
      }
    }
    .wname{
      color #ccc
      font-size 14px
    }
    .contents{
      margin 108px 10px 0 10px
      border-radius 6px
      padding 10px
      background-color #fff
      ._items{
        padding 20px 10px 10px 0
        display flex
        flex-direction: row
        flex-wrap wrap
        ._item{
          width 25%
          height 100px
          line-height 40px
          text-align center
          img{
            display block
            width 45px
            height 45px
            margin 0 auto
          }
          span{
            font-size 14px
          }
        }
        .edit{
          height 100px
          line-height 60px
          text-align center
          width 25%
          color #ccc
          border-radius 50%
          img{
            width 30px
            height 30px
            line-height 30px
            padding-top 4px
          }
        }
      }
      .grid{
        padding-top 15px
        .persearch{
          padding-top 5px
          font-size 14px
        }
      }
      .border{
        border-left 4px solid #f51230
        padding-right 10px
      }
    }
    .other{
      margin 10px 10px 0 10px
      border-radius 6px
      padding 10px 0 0 10px
      background-color #fff
      ._items{
        padding 20px 10px 10px 0
        display flex
        flex-direction: row
        flex-wrap wrap
        ._item{
          width 25%
          height 100px
          line-height 40px
          text-align center
          img{
            display block
            width 45px
            height 45px
            margin 0 auto
          }
          span{
            font-size 14px
          }
        }
        .edit{
          height 100px
          line-height 60px
          text-align center
          width 25%
          color #ccc
          border-radius 50%
          img{
            width 30px
            height 30px
            line-height 30px
            padding-top 4px
          }
        }
      }
      .grid{
        padding-top 15px
        .persearch{
          padding-top 5px
          font-size 14px
        }
      }
      .border{
        border-left 4px solid #f51230
        padding-right 10px
      }
    }
    .bgc{
      height 120px
      // float left
      background-color #db4c3e
      border-bottom-left-radius 20px
      border-bottom-right-radius 20px
    }
    .headTop{
      width 95%
      height 198px
      display flex
      position absolute
      top:20px
      left 2.4vw
      padding-bottom 10px
      background #fff
      border-radius 8px
      .messageInfoos{
          width 40%
          font-size 14px
          padding 10px 10px 10px 2%
          line-height 185%
          text-align center
          .img{
            border-radius 50%
            border 1px solid #eee
            width 80px
            height 80px
            vertical-align middle
        }
      }
      .infomessage{
        width 60%
        padding 10px 10px 10px 8%
        line-height 28px
      }
    }
  }
   .infoitems{
      padding 10px 10px 10px 0
      display flex
      flex-direction: row
      flex-wrap wrap
      .infoitem{
        cursor: move
        width 25%
        height 100px
        line-height 40px
        text-align center
        img{
          display block
          width 50px
          height 50px
          margin 0 auto
        }
        span{
          font-size 14px
        }
      }
    }
.flip-list-move {
  // transition: transform 0.5s;
  // transition: transform 0.1s ease
}
.no-move {
  transition: transform 0s;
}
.uploadimg{
    text-align center
    padding-top 10vh
    padding-left 40%
  }
.imgText{
  text-align center
  font-size 12px
  color #ccc
}
.icon--_caozuo{
  color #ff943e
  padding-right 5px
}
</style>
