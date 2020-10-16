<template>
    <div>
        <div>
            <p style="padding-left:16px">证件号码：<span>{{a0177}}</span></p>
            <p style="padding-left:16px">有效证件类型：<span>{{yxsfzjlx}}</span></p>
            <p style="padding-left:16px">性别：<span>{{a0107}}</span></p>
            <p style="padding-left:16px">年龄：<span>{{a01101}}</span></p>
            <p style="padding-left:16px">出生日期：<span>{{A0111}}</span></p>
            <van-field v-model="a01121" label="身份证详细地址：" label-width="8em" rows="2" autosize type="textarea" placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="police" label="签证机关：" placeholder="必填"/>
            <van-field v-model="a01157" label="身份证有效期：" placeholder="必填">
                 <template #button>
                    <i size="small" type="primary" @click="showAlert7"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="a0121" label="民族：" @click="showMing = true" readonly placeholder="必填"/>
            <van-field v-model="a01740" label="籍贯：" placeholder="必填"/>
            <van-field v-model="a01188" label="国籍：" @click="showGuo = true" readonly placeholder="必填"/>
            <van-field v-model="a0127" label="婚姻状况：" @click="showHun = true" readonly placeholder="必填"/>
            <van-field v-model="a01577" label="政治面貌：" @click="showZheng = true" readonly placeholder="必填"/>
            <van-field v-model="a01503" label="户籍性质：" @click-input="showHu = true" readonly placeholder="必填">
                <template #button>
                    <i size="small" type="primary" @click="showAlert1"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <van-field v-model="A0141" type="text" @click="handTimeClick" label="参加工作时间：" readonly label-width="8em" placeholder="必填"/>
            <van-field v-model="a01191" label="银行名称：" @click="showBank = true" readonly placeholder="必填"/>
            <van-field v-model="a01113" label="开户行：" placeholder="必填"/>
            <van-field v-model="a01102" label="银行卡号：" placeholder="必填"/>
            <van-field 
            v-model="a01185"
            label-width="7.4em" 
            @click="showSure = true" 
            label="是否为退伍军人：" 
            readonly 
            placeholder="必填"/>
            <van-field 
            v-model="a01003"
            label-width="7.4em" 
            @click-input="showEnglish = true" 
            label="英语是否可做工作语言：" 
            readonly 
            placeholder="必填">
            <template #button>
                    <i size="small" type="primary" @click="showAlert8"><van-icon name="question-o" color="red"/></i>
                </template>
            </van-field>
            <p style="padding-left:16px;color:#323233">
                请上传身份证（双面）/体检报告/银行卡：
                <span><van-button type="primary" color="#ccc" size="mini" @click="dialogOpen" style="font-size:12px;padding:2px">上传</van-button></span>
            </p>
            <p style="padding-left:16px">公积金客户号：<span>{{a01602}}</span></p>
            <p style="padding-left:16px">驻外医疗：<span>{{a01600}}</span></p>
            <p style="padding-left:16px"><span>身份证正面：</span><span @click="seePdf"><span style="border-bottom:1px solid #ccc;padding:2px">{{idcardFileName1}}</span></span></p>
            <p style="padding-left:16px"><span>身份证反面：</span><span @click="seePdf1"><span style="border-bottom:1px solid #ccc;padding:2px">{{idcardFileName2}}</span></span></p>
            <p style="padding-left:16px"><span>银行卡：</span><span @click="seePdf2"><span style="border-bottom:1px solid #ccc;padding:2px">{{bankFileName}}</span></span></p>
            <p style="padding-left:16px"><span>体检报告：</span><span @click="seePdf3"><span style="border-bottom:1px solid #ccc;padding:2px">{{reportFileName}}</span></span></p>
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
        <!-- 选择国籍弹窗 -->
        <van-popup v-model="showGuo" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns2"
                @cancel="showGuo = false"
                value-key="mc0000"
                @confirm="confirm2"
            />
        </van-popup>
        <!-- 是否为退伍军人弹窗 -->
        <van-popup v-model="showSure" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="showSure = false"
                value-key="text"
                @confirm="confirm1"
            />
        </van-popup>
        <!-- 是否英语弹窗 -->
        <van-popup v-model="showEnglish" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns11"
                @cancel="showEnglish = false"
                value-key="text"
                @confirm="confirm11"
            />
        </van-popup>
        <!-- 选择民族弹窗 -->
        <van-popup v-model="showMing" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns3"
                @cancel="showMing = false"
                value-key="mc0000"
                @confirm="confirm3"
            />
        </van-popup>
        <!-- 选择户籍性质弹窗 -->
        <van-popup v-model="showHu" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns4"
                @cancel="showHu = false"
                value-key="text"
                @confirm="confirm4"
            />
        </van-popup>
        <!-- 选择整治面貌弹窗 -->
        <van-popup v-model="showZheng" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns5"
                @cancel="showZheng = false"
                value-key="text"
                @confirm="confirm5"
            />
        </van-popup>
        <!-- 选择银行名称弹窗 -->
        <van-popup v-model="showBank" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns6"
                @cancel="showBank = false"
                value-key="mc0000"
                @confirm="confirm6"
            />
        </van-popup>
         <!-- 选择婚姻状况弹窗 -->
        <van-popup v-model="showHun" round position="bottom" get-container="body">
            <van-picker
                show-toolbar
                :columns="columns7"
                @cancel="showHun = false"
                value-key="text"
                @confirm="confirm7"
            />
        </van-popup>
        <!-- 上传附件 -->
        <van-popup
        v-model="showImg"
        get-container="body"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            <div class="uploadbtn">
                <div class="title">（请上传身份证（双面)、体检报告、银行卡，上传内容需为图片或PDF格式）</div>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadBasicFiles"
                :data="uploadData"
                :on-preview="handlePreview3"
                :on-remove="handleRemove"
                :on-success="handSuccess"
                :before-remove="beforeRemove"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button style="background:#fc5f10;border:1px #fc5f10;width:112px" size="small" type="primary" @click="uploadCard">上传身份证正面</el-button>
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard1">上传身份证反面</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadBank">上传银行卡</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10;margin-top:10px;margin-right:90%" size="small" type="primary" @click="uploadTijian">上传体检报告</el-button> -->
                </el-upload>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadBasicFiles"
                :data="uploadData"
                :on-preview="handlePreview3"
                :on-remove="handleRemove1"
                :on-success="handSuccess1"
                multiple
                :limit="10"
                :file-list="fileList">
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard">上传身份证正面</el-button> -->
                <el-button style="background:#fc5f10;border:1px #fc5f10;width:112px" size="small" type="primary" @click="uploadCard1">上传身份证反面</el-button>
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadBank">上传银行卡</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10;margin-top:10px;margin-right:90%" size="small" type="primary" @click="uploadTijian">上传体检报告</el-button> -->
                </el-upload>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadBasicFiles"
                :data="uploadData"
                :on-preview="handlePreview3"
                :on-remove="handleRemove2"
                :on-success="handSuccess2"
                multiple
                :limit="10"
                :file-list="fileList">
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard">上传身份证正面</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard1">上传身份证反面</el-button> -->
                <el-button style="background:#fc5f10;border:1px #fc5f10;width:112px" size="small" type="primary" @click="uploadBank">上传银行卡</el-button>
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10;margin-top:10px;margin-right:90%" size="small" type="primary" @click="uploadTijian">上传体检报告</el-button> -->
                </el-upload>
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadBasicFiles"
                :data="uploadData"
                :on-preview="handlePreview3"
                :on-remove="handleRemove3"
                :on-success="handSuccess3"
                multiple
                :limit="10"
                :file-list="fileList">
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard">上传身份证正面</el-button>
                <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadCard1">上传身份证反面</el-button> -->
                <!-- <el-button style="background:#fc5f10;border:1px #fc5f10" size="small" type="primary" @click="uploadBank">上传银行卡</el-button> -->
                <el-button style="background:#fc5f10;border:1px #fc5f10;width:112px" size="small" type="primary" @click="uploadTijian">上传体检报告</el-button>
                </el-upload>
            </div>
            <!-- <div class="uploadbtn" style="padding-top:20px">
                <el-upload
                class="upload-demo"
                action="/kukacms/self/uploadAvatar"
                :data="uploadData"
                :on-preview="handlePreview4"
                :on-remove="handleRemove4"
                multiple
                :limit="10"
                :file-list="fileList">
                <el-button size="small" type="primary" @click="uploadTou">上传头像</el-button>
                </el-upload>
            </div> -->
        </van-popup>
        <!-- 查看pdf -->
        <van-popup v-model="showPopup" get-container="body" position="top" :style="{ height: '90%' }">
            <iframe :src="pdf" width="100%" height="100%" frameborder="none"></iframe>
        </van-popup>
        <!-- 查看图片 -->
        <van-image-preview v-model="showPhoto" get-container="body" :images="images" :closeable='true' @close="onClose">
            
        </van-image-preview>
    </div>
</template>
<script>
import { Field,Button,DatetimePicker,Popup,Notify,Dialog,Picker,ImagePreview } from 'vant'
import { updateJb,backJb,queryNationality,queryNation,queryBank,deleteFile } from './api'
export default {
  data () {
    return {
        showPhoto: false, //图片
        images: [],
        fileList: [], //element上传测试
        showPopup: false, //pdf和图片
        pdf: '',
        uploadData: {
            jobnumber: '',
            state: '',
            type: '',
            id: '',
        }, //element上传的参数
        saveId: '',
        idcardPath1: '', //身份证正面
        idcardPath2: '', //身份证反面
        reportPath: '', //体检报告
        bankPath: '', //银行卡号
        idcardFileName1: '', 
        idcardFileName2: '', 
        bankFileName: '', 
        reportFileName: '', 
        showImg: false, //上传头像的弹窗
        a01121: '',
        police: '',
        a01157: '',
        a0121: '', //民族显示的值
        minzu: '', //民族发送的值
        a01740: '',
        a01188: '', //国籍显示的值
        guoji: '', //国籍发送的值
        a0127: '',
        hunyin: '', //婚姻状况发送值
        a01577: '', //政治面貌
        face: '', //政治面貌发送值
        a01503: '', //户籍性质
        huji: '', //户籍性质发送值
        A0141: '',
        a01191: '',
        bankVal: '', //银行选择发送的值
        a01113: '',
        a01102: '',
        a01185: '', //退伍军人显示的值
        a01003: '', //是否英语显示的值
        sure: '', //退伍军人发送的值
        english: '', //是否英语发送的值
        a0177: '',
        yxsfzjlx: '',
        a0107: '',
        a01602: '',
        a01600: '',
        a01101: '',
        A0111: '',
        a0121Key: '', 
        a01188Key: '', 
        a01577Key: '', 
        a01503Key: '', 
        a01191Key: '', 
        a0127Key: '', 
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        showTime: false,
        showSure: false, //是否退伍军人弹窗
        showEnglish: false, //是否英语弹窗
        showGuo: false, //选择国籍弹窗
        showMing: false, //选择民族弹窗
        showHu: false, //选择民族弹窗
        showZheng: false, //选择整治面貌弹窗
        showBank: false, //选择银行名称弹窗
        showHun: false, //选择婚姻状况弹窗
        columns1: [
            {'keyId':1,'text':"是"},
            {'keyId':2,'text':"否"},
        ],
        columns11: [
            {'keyId':1,'text':"是"},
            {'keyId':2,'text':"否"},
        ],
        columns2: [],
        columns3: [],
        columns4: [
          {'keyId':'01','text':"本地城镇_主城区"},
          {'keyId':'02','text':"外地城镇_省内"},
          {'keyId':'03','text':"外地城镇_省外"},
          {'keyId':'04','text':"本地农村_主城区"},
          {'keyId':'05','text':"外地农村_省内"},
          {'keyId':'06','text':"外地农村_省外"},
          {'keyId':'99','text':"港澳台"},
        ],
        columns5: [
          {'keyId':'01','text':"中共党员"},
          {'keyId':'02','text':"中共预备党员"},
          {'keyId':'03','text':"共青团员"},
          {'keyId':'04','text':"其他党派"},
          {'keyId':'05','text':"群众"},
        ],
        columns6: [],
        columns7: [
          {'keyId':'1','text':"未婚"},
          {'keyId':'2','text':"已婚"},
          {'keyId':'3','text':"丧偶"},
          {'keyId':'4','text':"离婚"},
          {'keyId':'5','text':"其他"},
        ],
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
            if(this.minzu == ''){
                this.minzu = this.a0121Key
            }
            if(this.guoji == ''){
                this.guoji = this.a01188Key
            }
            if(this.hunyin == ''){
                this.hunyin = this.a0127Key
            }
            if(this.face == ''){
                this.face = this.a01577Key
            }
            if(this.huji == ''){
                this.huji = this.a01503Key
            }
            if(this.bankVal == ''){
                this.bankVal = this.a01191Key
            }
            if(this.sure == ''){
                this.sure = this.a01185
            }
            if(this.english == ''){
                this.english = this.a01003
            }
            let sendData = {
                a01121:this.a01121,
                POLICE:this.police,
                a01157:this.a01157,
                a0121:this.minzu,
                a01740: this.a01740,
                a01188: this.guoji,
                a0127: this.hunyin,
                a01577: this.face,
                a01503: this.huji,
                a01191: this.bankVal,
                a01113: this.a01113,
                a01102: this.a01102,
                A0141: this.A0141,
                a01185: this.sure,
                a01003: this.english,
                a0190: localStorage.getItem('jobNum'),
                idcardFile1: this.idcardPath1, //身份证正面
                idcardFile2: this.idcardPath2, //身份证反面
                reportFile: this.reportPath, //体检报告
                bankFile: this.bankPath, //银行卡号
            }
            if( this.a01121 == '' || this.a01121 == null ||
                this.police == '' || this.police == null ||
                this.a01157 == '' || this.a01157 == null ||
                this.a0121 == '' || this.a0121 == null ||
                this.a01740 == '' || this.a01740 == null ||
                this.a01188 == '' || this.a01188 == null ||
                this.a0127 == '' || this.a0127 == null ||
                this.a01577 == '' || this.a01577 == null ||
                this.a01503 == '' || this.a01503 == null ||
                this.A0141 == '' || this.A0141 == null ||
                this.a01191 == '' || this.a01191 == null ||
                this.a01113 == '' || this.a01113 == null ||
                this.a01102 == '' || this.a01102 == null ||
                this.a01185 == '' || this.a01185 == null ||
                this.a01003 == '' || this.a01003 == null
                ){
                    Notify({ type: 'danger', message: '您有必填写未填写，请填写后提交！' })
                }else{
                    updateJb(sendData).then(res=>{
                        if(res.code == 1000){
                            Notify({ type: 'success', message: '已提交修改，进入待审核状态' })
                            this.$router.push({name:'searchInformation'})
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
    //取消
    backHome(){
        this.$router.push({name:'searchInformation'})
    },
    //选择是否退伍军人
    confirm1(picker) {
        console.log(picker)
        this.sure = picker.keyId
        this.a01185 = picker.text
        this.showSure = false;
    },
    //选择是否英语
    confirm11(picker) {
        console.log(picker)
        this.english = picker.keyId
        this.a01003 = picker.text
        this.showEnglish = false;
    },
    //选择国籍
    confirm2(picker) {
        console.log(picker)
    //   this.value = value;
        this.guoji = picker.bm0000
        this.a01188 = picker.mc0000
        this.showGuo = false;
    },
    //选择民族
    confirm3(picker) {
        console.log(picker)
    //   this.value = value;
        this.minzu = picker.bm0000
        this.a0121 = picker.mc0000
        this.showMing = false;
    },
    //选择户籍
    confirm4(picker) {
        console.log(picker)
    //   this.value = value;
        this.huji = picker.keyId
        this.a01503 = picker.text
        this.showHu = false;
    },
    //选择整治面貌
    confirm5(picker) {
        console.log(picker)
    //   this.value = value;
        this.face = picker.keyId
        this.a01577 = picker.text
        this.showZheng = false;
    },
    //选择银行名称
    confirm6(picker) {
        console.log(picker)
    //   this.value = value;
        this.bankVal = picker.bm0000
        this.a01191 = picker.mc0000
        this.showBank = false;
    },
    //选择婚姻状况
    confirm7(picker) {
        console.log(picker)
    //   this.value = value;
        this.hunyin = picker.keyId
        this.a0127 = picker.text
        this.showBank = false;
    },
    //默认带进来的数据
    initData(){
        console.log(this.$route.params.jbData)
        let jbData = this.$route.params.jbData
        this.a01121 = jbData.a01121
        this.a0121Key = jbData.a0121Key
        this.police = jbData.police
        this.a01157 = jbData.a01157
        this.a0121 = jbData.a0121
        this.a01740 = jbData.a01740
        this.a01188 = jbData.a01188
        this.a01188Key = jbData.a01188Key
        this.a0127 = jbData.a0127
        this.a0127Key = jbData.a0127Key
        this.a01577 = jbData.a01577
        this.a01577Key = jbData.a01577Key
        this.a01503 = jbData.a01503
        this.a01503Key = jbData.a01503Key
        this.a01191 = jbData.a01191
        this.a01191Key = jbData.a01191Key
        this.a01113 = jbData.a01113
        this.a01102 = jbData.a01102
        this.a01185 = jbData.a01185
        this.a01003 = jbData.a01003
        this.A0141 = jbData.A0141
        this.idcardPath1 = jbData.idcardFile1
        this.idcardPath2 = jbData.idcardFile2
        this.reportPath = jbData.reportFile
        this.bankPath = jbData.bankFile
        this.idcardFileName1 = jbData.idcardFileName1
        this.idcardFileName2 = jbData.idcardFileName2
        this.bankFileName = jbData.bankFileName
        this.reportFileName = jbData.reportFileName
        
        //展示不可修改的值
        this.a0177 = jbData.a0177
        this.yxsfzjlx = jbData.yxsfzjlx
        this.a0107 = jbData.a0107
        this.a01602 = jbData.a01602
        this.a01600 = jbData.a01600
        this.a01101 = jbData.a01101
        this.A0111 = jbData.A0111
        queryNationality().then(res=>{
            this.columns2 = res.obj
        })
        queryNation().then(res=>{
            this.columns3 = res.obj
        })
        queryBank().then(res=>{
            this.columns6 = res.obj
        })
    },
    //打开时间选择器
    handTimeClick(){
        this.showTime = true
    },
    //确认选中时间
    confirm(val){
        // console.log(val)
        this.A0141 = this.formatDate(val)
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
    //填写时的介绍弹窗
    showAlert() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请填写身份证上的住址（需要精确到门牌号）',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert1() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请对应浙江省杭州市填写。选项解释：①本地：杭州；②外地：非杭州（区分浙江省内/外）；③农村/城镇需参照户口本。',
        icon: 'cubeic-alert'
      }).show()
    },
    // showAlert5() {
    //   this.$createDialog({
    //     type: 'alert',
    //     title: '提示',
    //     content: '可拨打95599咨询。',
    //     icon: 'cubeic-alert'
    //   }).show()
    // },
    // showAlert6() {
    //   this.$createDialog({
    //     type: 'alert',
    //     title: '提示',
    //     content: '请填写中国农业银行卡号。',
    //     icon: 'cubeic-alert'
    //   }).show()
    // },
    showAlert7() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '请按照正确格式填写，如2020.08.26-2040.08.25',
        icon: 'cubeic-alert'
      }).show()
    },
    showAlert8() {
      this.$createDialog({
        type: 'alert',
        title: '提示',
        content: '是否能在全英语环境下正常开展工作',
        icon: 'cubeic-alert'
      }).show()
    },
     //上传附件弹窗
    dialogOpen(){
        this.showImg = true
    },
     //上传身份证正面
    handleRemove(file) {
        // console.log(file);
        let queryData = {
            filePath:file.response.obj.idcardPath1
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.idcardFileName1 = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview3(file) {
        console.log(file);
    },
    //上传成功
    handSuccess(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.idcardPath1 = response.obj.idcardPath1
        this.idcardFileName1 = response.obj.idcardPath1Name
    },
    beforeRemove(file, fileList){
        console.log(file)
        console.log(fileList)
    },
    uploadCard(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 1
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
     //上传身份证反面
    handleRemove1(file) {
        // console.log('aaa'+file)
        let queryData = {
            filePath:file.response.obj.idcardPath2
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.idcardFileName2 = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview3(file) {
    console.log(file);
    },
    //上传成功
    handSuccess1(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.idcardPath2 = response.obj.idcardPath2
        this.idcardFileName2 = response.obj.idcardPath2Name
    },
    uploadCard1(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 2
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传银行卡
    handleRemove2(file) {
        // console.log(file);
        let queryData = {
            filePath:file.response.obj.bankPath
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.bankFileName = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview3(file) {
    console.log(file);
    },
    //上传成功
    handSuccess2(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.bankPath = response.obj.bankPath
        this.bankFileName = response.obj.bankPathName
    },
    uploadBank(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 4
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传体检报告
    handleRemove3(file) {
        // console.log(file, fileList);
        let queryData = {
            filePath:file.response.obj.reportPath
        }
        deleteFile(queryData).then(res=>{
            if(res.code == 1000){
                this.reportFileName = ''
            }else{
                Notify({ type: 'danger', message: res.msg })
            }
        })
    },
    handlePreview3(file) {
        console.log(file);
    },
    //上传成功
    handSuccess3(response){
        if(response.code == 1001){
            Notify({ type: 'warning', message: response.msg })
        }
        console.log(response)
        this.saveId = response.obj.id
        this.reportPath = response.obj.reportPath
        this.reportFileName = response.obj.reportPathName
    },
    uploadTijian(){
        this.uploadData.id = this.saveId
        this.uploadData.state = 1
        this.uploadData.type = 3
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    //上传头像
    handleRemove4(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview4(file) {
    console.log(file);
    },
    uploadTou(){
        this.uploadData.type = 2
        this.uploadData.jobnumber = localStorage.getItem('jobNum')
    },
    seePdf(){
        if(this.idcardPath1 == null || this.idcardPath1 == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.idcardPath1.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.idcardPath1)
        }else{
            // this.showPopup = true
            // this.pdf = this.idcardPath1
            window.open(this.idcardPath1)
        }
    },
    seePdf1(){
        if(this.idcardPath2 == null || this.idcardPath2 == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.idcardPath2.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.idcardPath2)
        }else{
            // this.showPopup = true
            // this.pdf = this.idcardPath2
            window.open(this.idcardPath2)
        }
    },
    seePdf2(){
        if(this.bankPath == null || this.bankPath == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.bankPath.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.bankPath)
        }else{
            // this.showPopup = true
            // this.pdf = this.bankPath
            window.open(this.bankPath)
        }
    },
    seePdf3(){
        if(this.reportPath == null || this.reportPath == ''){
            Notify({ type: 'danger', message: '没有附件可查看哦~' })
        }else if(this.reportPath.indexOf('pdf') == -1){
            this.showPhoto = true
            this.images.push(this.reportPath)
        }else{
            // this.showPopup = true
            // this.pdf = this.reportPath
            window.open(this.reportPath)
        }
    },
    //关闭事件
    onClose() {
        this.images = []
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
        color #c9c9ca
        font-size 14px
        span{
            padding-left 5px
        }
    }
    .uploadbtn{
        padding 60px 10px 0 10px
        .title{
            padding 15px
            line-height 20px
            color red
        }
    }
    .upload-demo{
        line-height 50px
        text-align center
    }
</style>