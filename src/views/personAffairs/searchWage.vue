<template>
    <div>
        <div class="sidebox">
            <div class="imgs">
                <img :src="personObj.photo" alt="">
                <p>{{personObj.a0190}}</p>
            </div>
            <div class="inputs">
                <!-- <van-field v-model="value" type="password" clearable placeholder="请输入6位数密码" /> -->
                <cube-input 
                v-model="value"  
                placeholder="请输入6位数字密码"
                :maxlength="maxlength"
                 :eye="eye"
                 :type="type"
                 clearable>
                </cube-input>
            </div>
            <div class="forget"><span @click="forget">忘记密码？</span></div>
            <div class="bottom">
                <van-button type="primary" class="btn" color="#fc5f10" size="small" style="width:100%;font-size:16px" @click="search">查 询</van-button>
            </div>
        </div>
        <!-- 忘记密码的弹窗 -->
        <van-dialog
        get-container="body"
        v-model="show" 
        title="修改密码" 
        show-cancel-button
        @confirm="confirm"
        @cancel="cancel">
            <van-field v-model="oldpsw" maxlength="6" type="password" label="新密码" placeholder="请输入6位数字密码"/>
            <van-field v-model="newpsw" maxlength="6" type="password" label="确认密码" placeholder="请确认密码"/>
            <van-field v-model="checkMa" type="text" label="验证码" placeholder="请输入验证码"/>
            <p class="send" @click="send" v-if="sendflag">点击发送验证码</p>
            <!-- 点击发送验证码后显示的等待内容 -->
            <p class="sends" v-if="!sendflag">验证码已发送~请稍等<span style="color:#f00">{{ times }}</span>秒</p>
        </van-dialog>
        
        <!-- 新用户首次登陆注册的弹窗 -->
        <van-dialog 
        get-container="body"
        :safe-area-inset-bottom="false"
        v-model="showNew" 
        title="设置密码" 
        show-cancel-button
        @confirm="confirmNew"
        @cancel="cancelNew">
            <van-field size="large" v-model="newpassword" maxlength="6" type="password" label="新密码：" placeholder="请输入6位数字密码"/>
            <!-- <p class="send" @click="sendNew">点击发送验证码</p> -->
        </van-dialog>
    </div>
</template>
<script>
import { Button,Field,Dialog,Notify } from 'vant'
import { checkPwd,setPwd,login,resetPwd,sendCode,PasswordInput, NumberKeyboard } from './api.js'
import { queryPerson } from '../selfHome/api'
export default {
  data () {
    return {
        showKeyboard: true, //密码框
        value: '',
        personObj: {}, //人员基本信息获取
        placeholder: '请输入内容',
        type: 'password',
        maxlength:6,
        eye: {
            open: true,
            reverse: true
        },
        show: false,  //忘记密码弹窗
        showNew: false,  //新用户注册弹窗
        oldpsw: '',
        newpsw: '', //忘记密码
        newpassword: '', //新用户注册密码
        checkMa: '', //验证码
        codeMa: '', //手机发送过来的验证码
        sendflag: true, //验证码发送过后的显示等待
        sendflags: false, //验证码发送过后的显示等待,
        times: 60
    }
  },
  created(){
    this.getPwd()
    this.getPerson()
  },
  methods:{
    //个人信息
    //获取用户基本信息
    getPerson(){
      let queryData = {
        jobnumber:localStorage.getItem('jobNum')
      }
      queryPerson(queryData).then(res=>{
        // console.log(res.obj.photo)
        if(res.obj.photo == null || res.obj.photo == undefined || res.obj.photo == ''){
          res.obj.photo = require('@/assets/timg.jpg')
          this.personObj = res.obj
        }else{
          this.personObj = res.obj
        }
      })
    },
    //查询工资
    search(){
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(this.value)){
            // Notify({ type: 'danger', message: '请输入数字密码！' });
            Dialog.alert({
                title: '提示',
                message: '请输入数字密码！',
            }).then(() => {
            // on close
            })
        }else{
            let queryData = {
                jobnumber:localStorage.getItem('jobNum'),
                password: this.value
            }
            login(queryData).then(res=>{
                if(res.code == 1000){
                    this.$router.push({name:'searchWageInfo',params:{'loginData':this.value}})
                }else{
                    Notify({ type: 'danger', message: '密码错误哦！' });
                }
            })
        }
    },
    //忘记密码
    forget(){
        this.show = true
    },
    //确认修改密码
    confirm(){
        if(this.oldpsw !== this.newpsw){
            Notify({ type: 'danger', message: '密码不一致！' });
        }else{
            let queryData = {
                jobnumber:localStorage.getItem('jobNum'),
                password:this.oldpsw,
                rePassword:this.newpsw,
                code:this.checkMa,
                codeToken:this.codeMa
            }
            resetPwd(queryData).then(res=>{

            })
        }
    },
    //取消修改密码
    cancel(){

    },
    //发送验证码
    send(){
        if(this.oldpsw !== this.newpsw){
            Notify({ type: 'danger', message: '密码不一致！' });
        }else{
            this.sendflag = false
            let queryData = {
                phoneNumber:localStorage.getItem('telNum')
            }
            sendCode(queryData).then(res=>{
                this.codeMa = res.obj
            })
            //定时器
            this.timer = setInterval(()=>{
                this.times--
                if(this.times===0){
                this.sendflag = true
                clearInterval(this.timer)
                }
            },1000)
        }
    },
    //确认设置新密码
    confirmNew(){
        if(this.newpassword == ''){
            this.getPwd()
        }else{
            let queryData = {
                jobnumber:localStorage.getItem('jobNum'),
                password:this.newpassword
            }
            setPwd(queryData).then(res=>{
                if(res.code == 1000){
                    Notify({ type: 'success', message: '设置密码成功！' });
                }else{
                    Notify({ type: 'danger', message: '设置密码失败！' });
                }
            })
        }
    },
    //取消注册
    cancelNew(){
        this.$router.push({name:'selfHome'})
    },
    //登陆进来判断用户有无密码
    getPwd(){
        let queryData = {
            jobnumber:localStorage.getItem('jobNum')
        }
        checkPwd(queryData).then(res=>{
            if(res.code == 1000){
                return
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '您需要设置登陆密码哦！'
                    }).then(() => {
                        this.showNew = true
                    }).catch(() => {
                    // on cancel
                })
            }
        })
    },
    //密码弹出键盘
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  }
}
</script>
<style lang="stylus" scoped>
    .sidebox{
        position relative
        padding-top 30%
        height 70vh
        .imgs{
            text-align center
            img{
                width 100px
                height 100px
                border-radius 50%
            }
            p{
                padding-top 5px
            }
        }
        .inputs{
            width 70%
            margin 0 auto
            padding-top 10%
        }
        .forget{
            padding-top 10%
            padding-right 10px
            color #2e7cfb
            text-align right
        }
        .bottom{
            // padding-top 15%
            // padding-bottom 20%
            width 70%
            margin 8% auto
        }
    }
    .send{
        text-align center
        padding 10px
        color #2e7cfb
    }
    .sends{
        text-align center
        padding 10px
        color #5f6368
    }
    .van-cell{
        border-bottom 1px solid #ccc
        margin-bottom 10px
        font-weight 700
    }
</style>