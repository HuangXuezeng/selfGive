webpackJsonp([34],{"4iwA":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,s=n("bOdI"),o=n.n(s),i=(n("lxjj"),n("Fd2+")),p=n("6s/a"),d={data:function(){return{showPopup:!1,showPhoto:!1,images:[],value:"",pdf:"",personList:{},personObj:{},fileList:[],uploadData:{jobnumber:"",state:"",type:"",id:""},saveId:"",showImg:!1}},created:function(){this.getPerson(),this.getSome()},methods:(a={getPerson:function(){var e=this,t={jobnumber:localStorage.getItem("jobNum")};Object(p.K)(t).then(function(t){e.personList=t.obj})},getSome:function(){var e=this,t={jobnumber:localStorage.getItem("jobNum")};Object(p.P)(t).then(function(t){null==t.obj.photo||void 0==t.obj.photo||""==t.obj.photo?(t.obj.photo=n("Vmam"),e.personObj=t.obj):e.personObj=t.obj})},update:function(){this.$router.push({name:"updatePerson",params:{jbData:this.personList}})},already:function(){this.$router.push({name:"alreadyPerson"})},dialogOpen:function(){this.showImg=!0},filesAdded:function(){this.actions="/kukacms/self/uploadFiles?module=jbxx&jobnumber="+localStorage.getItem("jobNum"),this.showImg=!1},handleRemove3:function(e,t){console.log(e,t)},handlePreview3:function(e){console.log(e)},handSuccess:function(e){console.log(e),this.saveId=e.obj.id},uploadCard:function(){this.uploadData.id=this.saveId,this.uploadData.state=1,this.uploadData.type=1,this.uploadData.jobnumber=localStorage.getItem("jobNum")}},o()(a,"handleRemove3",function(e,t){console.log(e,t)}),o()(a,"handlePreview3",function(e){console.log(e)}),o()(a,"handSuccess",function(e){console.log(e),this.saveId=e.obj.id}),o()(a,"uploadCard1",function(){this.uploadData.id=this.saveId,this.uploadData.state=1,this.uploadData.type=2,this.uploadData.jobnumber=localStorage.getItem("jobNum")}),o()(a,"handleRemove3",function(e,t){console.log(e,t)}),o()(a,"handlePreview3",function(e){console.log(e)}),o()(a,"handSuccess",function(e){console.log(e),this.saveId=e.obj.id}),o()(a,"uploadBank",function(){this.uploadData.id=this.saveId,this.uploadData.state=1,this.uploadData.type=4,this.uploadData.jobnumber=localStorage.getItem("jobNum")}),o()(a,"handleRemove3",function(e,t){console.log(e,t)}),o()(a,"handlePreview3",function(e){console.log(e)}),o()(a,"handSuccess",function(e){console.log(e),this.saveId=e.obj.id}),o()(a,"uploadTijian",function(){this.uploadData.id=this.saveId,this.uploadData.state=1,this.uploadData.type=3,this.uploadData.jobnumber=localStorage.getItem("jobNum")}),o()(a,"handleRemove4",function(e,t){console.log(e,t)}),o()(a,"handlePreview4",function(e){console.log(e)}),o()(a,"uploadTou",function(){this.uploadData.type=2,this.uploadData.jobnumber=localStorage.getItem("jobNum")}),o()(a,"seePdf",function(){null==this.personList.idcardFile1||""==this.personList.idcardFile1?Object(i.b)({type:"danger",message:"没有附件可查看哦~"}):-1==this.personList.idcardFile1.indexOf("pdf")?(this.showPhoto=!0,this.images.push(this.personList.idcardFile1)):window.open(this.personList.idcardFile1)}),o()(a,"seePdf1",function(){null==this.personList.idcardFile2||""==this.personList.idcardFile2?Object(i.b)({type:"danger",message:"没有附件可查看哦~"}):-1==this.personList.idcardFile2.indexOf("pdf")?(this.showPhoto=!0,this.images.push(this.personList.idcardFile2)):window.open(this.personList.idcardFile2)}),o()(a,"seePdf2",function(){null==this.personList.bankFile||""==this.personList.bankFile?Object(i.b)({type:"danger",message:"没有附件可查看哦~"}):-1==this.personList.bankFile.indexOf("pdf")?(this.showPhoto=!0,this.images.push(this.personList.bankFile)):window.open(this.personList.bankFile)}),o()(a,"seePdf3",function(){null==this.personList.reportFile||""==this.personList.reportFile?Object(i.b)({type:"danger",message:"没有附件可查看哦~"}):-1==this.personList.reportFile.indexOf("pdf")?(this.showPhoto=!0,this.images.push(this.personList.reportFile)):window.open(this.personList.reportFile)}),o()(a,"onClose",function(){this.images=[]}),a),mounted:function(){}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("div",{staticClass:"sidebox"},[n("div",{staticClass:"contain clearfix"},[n("div",[n("div",[n("span",{staticStyle:{"font-weight":"700"}},[e._v(e._s(e.personObj.a0101))]),n("span",{staticStyle:{float:"right"}},[n("img",{attrs:{src:e.personObj.photo,alt:""}})])]),e._v(" "),n("span",[e._v(" 工号："+e._s(e.personObj.a0190))])]),e._v(" "),n("div",[n("span",[e._v(" 岗位：")]),n("span",[e._v(e._s(e.personObj.post))]),n("br"),e._v(" "),n("span",[e._v(" 部门：")]),e._v(e._s(e.personObj.dept)),n("span")])])]),e._v(" "),n("div",{staticClass:"message"},[n("p",[n("span",[e._v("证件号码：")]),n("span",[e._v(e._s(e.personList.a0177))])]),e._v(" "),n("p",[n("span",[e._v("有效证件类型：")]),n("span",[e._v(e._s(e.personList.yxsfzjlx))])]),e._v(" "),n("p",[n("span",[e._v("身份证详细地址：")]),n("span",[e._v(e._s(e.personList.a01121))])]),e._v(" "),n("p",[n("span",[e._v("签证机关：")]),n("span",[e._v(e._s(e.personList.police))])]),e._v(" "),n("p",[n("span",[e._v("身份证有效期：")]),n("span",[e._v(e._s(e.personList.a01157))])]),e._v(" "),n("p",[n("span",[e._v("性别：")]),n("span",[e._v(e._s(e.personList.a0107))])]),e._v(" "),n("p",[n("span",[e._v("出生日期：")]),n("span",[e._v(e._s(e.personList.A0111))])]),e._v(" "),n("p",[n("span",[e._v("年龄：")]),n("span",[e._v(e._s(e.personList.a01101))])]),e._v(" "),n("p",[n("span",[e._v("户籍性质：")]),n("span",[e._v(e._s(e.personList.a01503))])]),e._v(" "),n("p",[n("span",[e._v("民族：")]),n("span",[e._v(e._s(e.personList.a0121))])]),e._v(" "),n("p",[n("span",[e._v("籍贯：")]),n("span",[e._v(e._s(e.personList.a01740))])]),e._v(" "),n("p",[n("span",[e._v("国籍：")]),n("span",[e._v(e._s(e.personList.a01188))])]),e._v(" "),n("p",[n("span",[e._v("婚姻状况：")]),n("span",[e._v(e._s(e.personList.a0127))])]),e._v(" "),n("p",[n("span",[e._v("政治面貌：")]),n("span",[e._v(e._s(e.personList.a01577))])]),e._v(" "),n("p",[n("span",[e._v("参加工作时间：")]),n("span",[e._v(e._s(e.personList.A0141))])]),e._v(" "),n("p",[n("span",[e._v("银行名称：")]),n("span",[e._v(e._s(e.personList.a01191))])]),e._v(" "),n("p",[n("span",[e._v("开户行：")]),n("span",[e._v(e._s(e.personList.a01113))])]),e._v(" "),n("p",[n("span",[e._v("银行卡号：")]),n("span",[e._v(e._s(e.personList.a01102))])]),e._v(" "),n("p",[n("span",[e._v("公积金客户号：")]),n("span",[e._v(e._s(e.personList.a01602))])]),e._v(" "),n("p",[n("span",[e._v("驻外医疗：")]),n("span",[e._v(e._s(e.personList.a01600))])]),e._v(" "),n("p",[n("span",[e._v("是否为退伍军人：")]),n("span",[e._v(e._s(e.personList.a01185))])]),e._v(" "),n("p",[n("span",[e._v("英语是否可做工作语言：")]),n("span",[e._v(e._s(e.personList.a01003))])]),e._v(" "),n("p",[n("span",[e._v("身份证正面：")]),n("span",{staticStyle:{"border-bottom":"1px solid #ccc",padding:"2px"},on:{click:e.seePdf}},[e._v(e._s(e.personList.idcardFileName1))])]),e._v(" "),n("p",[n("span",[e._v("身份证反面：")]),n("span",{staticStyle:{"border-bottom":"1px solid #ccc",padding:"2px"},on:{click:e.seePdf1}},[e._v(e._s(e.personList.idcardFileName2))])]),e._v(" "),n("p",[n("span",[e._v("银行卡：")]),n("span",{staticStyle:{"border-bottom":"1px solid #ccc",padding:"2px"},on:{click:e.seePdf2}},[e._v(e._s(e.personList.bankFileName))])]),e._v(" "),n("p",[n("span",[e._v("体检报告：")]),n("span",{staticStyle:{"border-bottom":"1px solid #ccc",padding:"2px"},on:{click:e.seePdf3}},[e._v(e._s(e.personList.reportFileName))])]),e._v(" "),n("span",[0==e.personList.sign?n("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.update}},[e._v("修改")]):e._e(),e._v(" "),1==e.personList.sign?n("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#ccc"}},[e._v("修改")]):e._e()],1),e._v(" "),n("div",{staticClass:"btn"},[n("van-button",{staticStyle:{width:"100%","font-size":"16px","margin-top":"10px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.already}},[e._v("审核列表")])],1)]),e._v(" "),n("van-popup",{style:{height:"50%"},attrs:{"get-container":"body",closeable:"","close-icon":"close",position:"bottom"},model:{value:e.showImg,callback:function(t){e.showImg=t},expression:"showImg"}},[n("div",{staticClass:"uploadbtn"},[n("div",{staticClass:"title"},[e._v("（请上传身份证（双面)、体检报告、银行卡，上传内容需为图片或PDF）")]),e._v(" "),n("el-upload",{staticClass:"upload-demo",attrs:{action:"/kukacms/self/uploadBasicFiles",data:e.uploadData,"on-preview":e.handlePreview3,"on-remove":e.handleRemove3,"on-success":e.handSuccess,multiple:"",limit:10,"file-list":e.fileList}},[n("el-button",{staticStyle:{background:"#fc5f10",border:"1px #fc5f10"},attrs:{size:"small",type:"primary"},on:{click:e.uploadCard}},[e._v("上传身份证正面")]),e._v(" "),n("el-button",{staticStyle:{background:"#fc5f10",border:"1px #fc5f10"},attrs:{size:"small",type:"primary"},on:{click:e.uploadCard1}},[e._v("上传身份证反面")]),e._v(" "),n("el-button",{staticStyle:{background:"#fc5f10",border:"1px #fc5f10"},attrs:{size:"small",type:"primary"},on:{click:e.uploadBank}},[e._v("上传银行卡")]),e._v(" "),n("el-button",{staticStyle:{background:"#fc5f10",border:"1px #fc5f10","margin-top":"10px","margin-right":"90%"},attrs:{size:"small",type:"primary"},on:{click:e.uploadTijian}},[e._v("上传体检报告")])],1)],1),e._v(" "),n("div",{staticClass:"uploadbtn",staticStyle:{"padding-top":"20px"}},[n("el-upload",{staticClass:"upload-demo",attrs:{action:"/kukacms/self/uploadAvatar",data:e.uploadData,"on-preview":e.handlePreview4,"on-remove":e.handleRemove4,multiple:"",limit:10,"file-list":e.fileList}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.uploadTou}},[e._v("上传头像")])],1)],1)]),e._v(" "),n("van-popup",{style:{height:"90%"},attrs:{position:"top","get-container":"body"},model:{value:e.showPopup,callback:function(t){e.showPopup=t},expression:"showPopup"}},[n("iframe",{attrs:{id:"iframe-shrink",src:e.pdf,width:"100%",height:"100%"}})]),e._v(" "),n("van-image-preview",{attrs:{"get-container":"body",images:e.images,closeable:!0},on:{close:e.onClose},model:{value:e.showPhoto,callback:function(t){e.showPhoto=t},expression:"showPhoto"}})],1)},staticRenderFns:[]};var c=n("VU/8")(d,l,!1,function(e){n("K1TQ")},"data-v-6076c6da",null);t.default=c.exports},JzlR:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\nbody[data-v-6076c6da] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.content[data-v-6076c6da] {\n  background-color: #fff;\n}\n.content .sidebox[data-v-6076c6da] {\n  margin: 10px;\n  border-radius: 6px;\n  -webkit-box-shadow: 0px 10px 10px #eee;\n          box-shadow: 0px 10px 10px #eee;\n}\n.content .header[data-v-6076c6da] {\n  padding-top: 20px;\n  text-align: center;\n}\n.content .header img[data-v-6076c6da] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n}\n.content .header p[data-v-6076c6da] {\n  text-align: center;\n  padding-top: 4px;\n  font-weight: 700;\n}\n.content .contain[data-v-6076c6da] {\n  padding: 10px;\n  line-height: 35px;\n}\n.content .contain .iconfont[data-v-6076c6da] {\n  color: #ee0a24;\n}\n.content .message[data-v-6076c6da] {\n  padding: 10px;\n  line-height: 25px;\n  font-size: 14px;\n  color: #969799;\n  -webkit-box-shadow: 0px 10px 10px #eee;\n          box-shadow: 0px 10px 10px #eee;\n}\n.content .message .iconfont[data-v-6076c6da] {\n  color: #ee0a24;\n}\n.content .message p[data-v-6076c6da] {\n  border-bottom: 1px solid #eee;\n  padding: 5px 0 5px 5px;\n}\n.content img[data-v-6076c6da] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n}\n.uploadbtn[data-v-6076c6da] {\n  padding: 60px 10px 0 10px;\n}\n.uploadbtn .title[data-v-6076c6da] {\n  padding: 15px;\n  line-height: 20px;\n  color: #f00;\n}\n.el-upload[data-v-6076c6da] {\n  text-align: left;\n  line-height: 42px;\n}","",{version:3,sources:["D:/员工自助/selfGive_mobile/src/views/personAffairs/searchInformation.vue"],names:[],mappings:";AACA;EACE,0BAA0B,CAAC,sCAAsC;EACjE,uBAAuB,CAAC,iBAAiB;EACzC,sBAAsB,CAAC,YAAY;EACnC,kBAAkB;CACnB;AACD;EACE,uBAAuB;CACxB;AACD;EACE,aAAa;EACb,mBAAmB;EACnB,uCAAuC;UAC/B,+BAA+B;CACxC;AACD;EACE,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;CAClB;AACD;EACE,cAAc;EACd,kBAAkB;CACnB;AACD;EACE,eAAe;CAChB;AACD;EACE,cAAc;EACd,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,uCAAuC;UAC/B,+BAA+B;CACxC;AACD;EACE,eAAe;CAChB;AACD;EACE,8BAA8B;EAC9B,uBAAuB;CACxB;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;CACpB;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,cAAc;EACd,kBAAkB;EAClB,YAAY;CACb;AACD;EACE,iBAAiB;EACjB,kBAAkB;CACnB",file:"searchInformation.vue",sourcesContent:["\nbody[data-v-6076c6da] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.content[data-v-6076c6da] {\n  background-color: #fff;\n}\n.content .sidebox[data-v-6076c6da] {\n  margin: 10px;\n  border-radius: 6px;\n  -webkit-box-shadow: 0px 10px 10px #eee;\n          box-shadow: 0px 10px 10px #eee;\n}\n.content .header[data-v-6076c6da] {\n  padding-top: 20px;\n  text-align: center;\n}\n.content .header img[data-v-6076c6da] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n}\n.content .header p[data-v-6076c6da] {\n  text-align: center;\n  padding-top: 4px;\n  font-weight: 700;\n}\n.content .contain[data-v-6076c6da] {\n  padding: 10px;\n  line-height: 35px;\n}\n.content .contain .iconfont[data-v-6076c6da] {\n  color: #ee0a24;\n}\n.content .message[data-v-6076c6da] {\n  padding: 10px;\n  line-height: 25px;\n  font-size: 14px;\n  color: #969799;\n  -webkit-box-shadow: 0px 10px 10px #eee;\n          box-shadow: 0px 10px 10px #eee;\n}\n.content .message .iconfont[data-v-6076c6da] {\n  color: #ee0a24;\n}\n.content .message p[data-v-6076c6da] {\n  border-bottom: 1px solid #eee;\n  padding: 5px 0 5px 5px;\n}\n.content img[data-v-6076c6da] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n}\n.uploadbtn[data-v-6076c6da] {\n  padding: 60px 10px 0 10px;\n}\n.uploadbtn .title[data-v-6076c6da] {\n  padding: 15px;\n  line-height: 20px;\n  color: #f00;\n}\n.el-upload[data-v-6076c6da] {\n  text-align: left;\n  line-height: 42px;\n}"],sourceRoot:""}])},K1TQ:function(e,t,n){var a=n("JzlR");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("c73800ea",a,!0,{})}});
//# sourceMappingURL=34.435d0d6141644b3e8fc7.js.map