<template>
    <div>
        <div>
            <van-field v-model="email" label="E-mail：" placeholder="必填"/>
            <van-field v-model="a01741" label="家庭住址：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert2"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a01093" type="number" label="办公电话：" placeholder="选填"/>
            <van-field v-model="a01195" label="办公地点：" @click="showOffice = true" readonly placeholder="必填"/>
            <van-field v-model="a01193" label="工位：" placeholder="选填"/>
            <van-field v-model="a01311" label="现住址：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert3"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a01506" label="紧急联系人：" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert4"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a011821" label="紧急联系人关系：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a01172" type="tel" label="紧急联系方式：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a011831" label="紧急联系人单位：" label-width="8em" placeholder="必填"/>
            <van-field v-model="a01196" label="车牌号：" placeholder="选填"/>
            <p style="padding-left:16px">手机号码：<span>{{a01274}}</span></p>
            <p style="padding-left:16px">手机号码归属地：<span>{{a01505}}</span></p>
            <p style="padding-left:16px">车位使用开始日期：<span>{{A01513}}</span></p>
            <!-- <van-field v-model="A01513" @click="handTimeClick" label="车位使用开始日期" readonly/> -->
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="update" style="font-size:16px">确认修改</van-button>
                <van-button type="primary" size="small" color="#fc5f10" @click="backHome" style="font-size:16px">取消</van-button>
            </div>
        </div>
        <!-- 弹出选择时间 -->
        <van-popup
        get-container="body"
        v-model="showTime"
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
        <!-- 选择银行名称弹窗 -->
        <van-popup v-model="showOffice" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showOffice = false"
                value-key="mc0000"
                @confirm="confirm1"
            />
        </van-popup>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,Picker } from 'vant'
import { updateLx,backLx,queryOffice } from './api'
export default {
  data () {
    return {
        email: '',
        a01741: '',
        a01093: '',
        a01274: '',
        a01195: '',
        office: '', //选取值
        a01193: '',
        a01311: '',
        a01506: '',
        a011821: '',
        a01172: '',
        a011831: '',
        a01196: '',
        A01513: '',
        a01505: '',
        a01195Key: '',
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false, //时间弹窗
        showOffice: false, //办公地点弹窗
        columns: [] //办公地点取值
    };
  },
  created(){
    this.initData()
  },
  methods:{
    //提交确认修改
    update(){
        Dialog.confirm({
            // style="position:absolute;width:100%",
            title: '提示',
            message: '确认提交修改？'
            }).then(() => {
            // on confirm
            if(this.office == ''){
                this.office = this.a01195Key
            }
            let sendData = {
                email: this.email,
                a01741: this.a01741,
                a01093: this.a01093,
                a01274: this.a01274,
                a01195: this.office,
                a01193: this.a01193,
                a01311: this.a01311,
                a01506: this.a01506,
                a011821: this.a011821,
                a01172: this.a01172,
                a011831: this.a011831,
                a01196: this.a01196,
                // A01513: this.A01513,
                a0190: localStorage.getItem('jobNum')
            }
            if( this.email == null || this.email == '' ||
                this.a01741 == null || this.a01741 == '' ||
                this.a01274 == null || this.a01274 == '' ||
                this.a01195 == null || this.a01195 == '' ||
                this.a01311 == null || this.a01311 == '' ||
                this.a01506 == null || this.a01506 == '' ||
                this.a011821 == null || this.a011821 == '' ||
                this.a01172 == null || this.a01172 == '' ||
                this.a011831 == null || this.a011831 == ''
            // this.a01196 == ''
            ){
                Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
            }else{
                updateLx(sendData).then(res=>{
                    if(res.code == 1000){
                        Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                        this.$router.push({name:'touch'})
                    }else{
                        Notify({ type: 'danger', message: res.msg })
                    }
                })
            }
            // console.log(sendData)
            }).catch(() => {
            // on cancel
            Notify({ type: 'danger', message: '已取消修改' })
        })
    },
    //选择办公地点
    confirm1(picker) {
        console.log(picker)
    //   this.value = value;
        this.office = picker.bm0000
        this.a01195 = picker.mc0000
        this.showOffice = false;
    },
    //默认带进来的数据
    initData(){
        // console.log(this.$route.params.lxData)
        let lxData = this.$route.params.lxData
        this.email = lxData.email
        this.a01741 = lxData.a01741
        this.a01093 = lxData.a01093
        this.a01274 = lxData.a01274
        this.a01195 = lxData.a01195
        this.a01195Key = lxData.a01195Key
        this.a01193 = lxData.a01193
        this.a01311 = lxData.a01311
        this.a01506 = lxData.a01506
        this.a011821 = lxData.a011821
        this.a01172 = lxData.a01172
        this.a011831 = lxData.a011831
        this.a01196 = lxData.a01196
        this.a01505 = lxData.a01505
        this.A01513 = lxData.A01513
        //获取办公地点
        queryOffice().then(res=>{
            this.columns = res.obj
        })
    },
    //取消
    backHome(){
        this.$router.push({name:'touch'})
    },
    //打开时间选择器
    handTimeClick(){
        this.showTime = true
    },
    //确认选中时间
    confirm(val){
        // console.log(val)
        this.A01513 = this.formatDate(val)
        this.showTime = false
    },
    //取消选择
    cancel(){
        this.showTime = false
    },
     //转换时间戳
    formatDate(date) {    
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    d = d < 10 ? ('0' + d) : d;       
        return y + '-' + m + '-' + d 
    },
    //提示信息
    showAlert2() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写家庭固定居住地址。（若住宿在非本人房屋内请填写老家地址，需要精确到门牌号）',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert3() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写现阶段居住地址（需要精确到门牌号）。',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert4() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写直系亲属。',
        icon: 'cubeic-alert'
      }).show()
    },
  }
}
</script>
<style lang="stylus" scoped>
    .btn{
        padding 10px
        text-align center
    }
    p{
        padding 10px 0 10px 10px
        line-height 24px
        border-bottom 1px solid #eee
        font-size 14px
        color #ccc
        span{
            padding-left 5px
        }
    }
</style>