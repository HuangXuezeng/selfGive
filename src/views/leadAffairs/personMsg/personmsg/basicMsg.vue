<template>
    <div class="content">
        <!-- <div class="sidebox">
            <div class="contain">
                <div>
                    <div><span style="font-weight:700">{{personObj.a0101}}</span><span style="float:right"><img :src="personObj.photo" alt=""></span></div>
                    <span> 工号：{{personObj.a0190}}</span>
                </div>
                <div>
                    <span> 岗位：</span><span>{{personObj.post}}</span><br>
                    <span> 部门：</span>{{personObj.dept}}<span></span>
                </div>
            </div>
        </div>  -->
        <div class="message">
            <p><span>证件号码：</span><span>{{personList.a0177}}</span></p>
            <p><span>有效证件类型：</span><span>{{personList.yxsfzjlx}}</span></p>
            <p><span>身份证详细地址：</span><span>{{personList.a01121}}</span></p>
            <p><span>签证机关：</span><span>{{personList.police}}</span></p>
            <p><span>身份证有效期：</span><span>{{personList.a01157}}</span></p>
            <p><span>性别：</span><span>{{personList.a0107}}</span></p>
            <p><span>出生日期：</span><span>{{personList.A0111}}</span></p>
            <p><span>年龄：</span><span>{{personList.a01101}}</span></p>
            <p><span>户籍性质：</span><span>{{personList.a01503}}</span></p>
            <p><span>民族：</span><span>{{personList.a0121}}</span></p>
            <p><span>籍贯：</span><span>{{personList.a01740}}</span></p>
            <p><span>国籍：</span><span>{{personList.a01188}}</span></p>
            <p><span>婚姻状况：</span><span>{{personList.a0127}}</span></p>
            <p><span>政治面貌：</span><span>{{personList.a01577}}</span></p>
            <p><span>参加工作时间：</span><span>{{personList.A0141}}</span></p>
            <p><span>银行名称：</span><span>{{personList.a01191}}</span></p>
            <p><span>开户行：</span><span>{{personList.a01113}}</span></p>
            <p><span>银行卡号：</span><span>{{personList.a01102}}</span></p>
            <p><span>公积金客户号：</span><span>{{personList.a01602}}</span></p>
            <p><span>驻外医疗：</span><span>{{personList.a01600}}</span></p>
            <p><span>是否为退伍军人：</span><span>{{personList.a01185}}</span></p>
            <!-- <p><span>身份证正面：</span><span @click="seePdf" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName1}}</span></p>
            <p><span>身份证反面：</span><span @click="seePdf1" style="border-bottom:1px solid #ccc;padding:2px">{{personList.idcardFileName2}}</span></p>
            <p><span>银行卡：</span><span @click="seePdf2" style="border-bottom:1px solid #ccc;padding:2px">{{personList.bankFileName}}</span></p>
            <p><span>体检报告：</span><span @click="seePdf3" style="border-bottom:1px solid #ccc;padding:2px">{{personList.reportFileName}}</span></p> -->
        </div>
        <van-empty v-if="personList == ''" description="无数据" />
    </div>
</template>
<script>
// import '../../components/comstyle/style.css'
import { Button,Uploader,ImagePreview,Notify } from 'vant'
import { queryPerson,querySome } from '../../../personAffairs/api'
// import { mapState,mapMutations } from 'vuex'
export default {
  data () {
    return {
        personList: {},
        personObj: {},
    };
  },
  created(){
      this.getPerson()
      this.getSome()
  },
  methods:{
    //获取个人基本信息
    getPerson(){
        let queryData = {
            jobnumber:this.$store.state.jobNumber
        }
        queryPerson(queryData).then(res=>{
            this.personList = res.obj
        })
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
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped>
    .content{
        background-color #fff
        .sidebox{
            margin  10px
            border-radius 6px
            box-shadow 0px 10px 10px #eee
        }
        .contain{
            padding 10px
            line-height 35px
            .iconfont{
                color #ee0a24
            }
        }
        .message{
            padding 10px
            line-height 25px
            font-size 14px
            color #969799
            box-shadow 0px 10px 10px #eee
            .iconfont{
                color #ee0a24
            }
            p{
                border-bottom 1px solid #eee
                padding 5px 0 5px 5px
            }
        }
        img{
                width 60px
                height 60px
                border-radius 50%
            }
    }
</style>