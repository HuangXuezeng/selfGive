webpackJsonp([36],{"5jml":function(e,a,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\nbody[data-v-5fe9ee6e] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.headerTag[data-v-5fe9ee6e] {\n  padding: 10px;\n}\n.headerTag p[data-v-5fe9ee6e] {\n  line-height: 30px;\n  padding: 8px 4px 8px 8px;\n  border-bottom: 1px solid #eee;\n  color: #969799;\n  font-size: 14px;\n}\n.headerTag .btn[data-v-5fe9ee6e] {\n  padding: 10px;\n  text-align: center;\n}\n.van-tag--mark[data-v-5fe9ee6e] {\n  padding: 0.4em 0.8em 0.4em 0.4em;\n}","",{version:3,sources:["D:/员工自助/selfGive_mobile/src/views/personAffairs/alreadyTouch.vue"],names:[],mappings:";AACA;EACE,0BAA0B,CAAC,sCAAsC;EACjE,uBAAuB,CAAC,iBAAiB;EACzC,sBAAsB,CAAC,YAAY;EACnC,kBAAkB;CACnB;AACD;EACE,cAAc;CACf;AACD;EACE,kBAAkB;EAClB,yBAAyB;EACzB,8BAA8B;EAC9B,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,iCAAiC;CAClC",file:"alreadyTouch.vue",sourcesContent:["\nbody[data-v-5fe9ee6e] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.headerTag[data-v-5fe9ee6e] {\n  padding: 10px;\n}\n.headerTag p[data-v-5fe9ee6e] {\n  line-height: 30px;\n  padding: 8px 4px 8px 8px;\n  border-bottom: 1px solid #eee;\n  color: #969799;\n  font-size: 14px;\n}\n.headerTag .btn[data-v-5fe9ee6e] {\n  padding: 10px;\n  text-align: center;\n}\n.van-tag--mark[data-v-5fe9ee6e] {\n  padding: 0.4em 0.8em 0.4em 0.4em;\n}"],sourceRoot:""}])},"7LXP":function(e,a,t){var n=t("5jml");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("rjj0")("f1fba088",n,!0,{})},Ousw:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("Fd2+"),s=t("6s/a"),o={data:function(){return{jobData:[],shr:""}},created:function(){this._getContact(),this._getShr()},methods:{_getContact:function(){var e=this,a={jobnumber:localStorage.getItem("jobNum")};Object(s.o)(a).then(function(a){e.jobData=a.obj})},_getShr:function(){var e=this,a={jobnumber:localStorage.getItem("jobNum")};Object(s.w)(a).then(function(a){e.shr=a.obj.names.join(",")})},back:function(){var e=this;n.a.confirm({title:"提示",message:"确定撤回修改吗？"}).then(function(){var a={jobnumber:localStorage.getItem("jobNum")};Object(s.f)(a).then(function(a){1e3==a.code?(Object(n.b)({type:"success",message:"撤回成功"}),e.$router.push({name:"touch"})):Object(n.b)({type:"danger",message:"当前无提交的修改项，不可点击“撤回修改”"})})}).catch(function(){Object(n.b)({type:"danger",message:"取消撤回"})})},backHome:function(){this.$router.push({name:"touch"})}}},r={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[null!==e.jobData?t("div",{staticClass:"headerTag"},[t("van-tag",{attrs:{mark:"",type:"warning"}},[e._v("已修改的联系信息")]),e._v(" "),t("p",[t("span",[e._v("手机号码：")]),t("span",[e._v(e._s(e.jobData.a01274))])]),e._v(" "),t("p",[t("span",[e._v("办公电话：")]),t("span",[e._v(e._s(e.jobData.a01093))])]),e._v(" "),t("p",[t("span",[e._v("办公地点：")]),t("span",[e._v(e._s(e.jobData.a01195))])]),e._v(" "),t("p",[t("span",[e._v("工位：")]),t("span",[e._v(e._s(e.jobData.a01193))])]),e._v(" "),t("p",[t("span",[e._v("E—mail：")]),t("span",[e._v(e._s(e.jobData.email))])]),e._v(" "),t("p",[t("span",[e._v("现住址：")]),t("span",[e._v(e._s(e.jobData.a01311))])]),e._v(" "),t("p",[t("span",[e._v("家庭住址：")]),t("span",[e._v(e._s(e.jobData.a01741))])]),e._v(" "),t("p",[t("span",[e._v("紧急联系人：")]),t("span",[e._v(e._s(e.jobData.a01506))])]),e._v(" "),t("p",[t("span",[e._v("紧急联系方式：")]),t("span",[e._v(e._s(e.jobData.a01172))])]),e._v(" "),t("p",[t("span",[e._v("紧急联系人关系：")]),t("span",[e._v(e._s(e.jobData.a011821))])]),e._v(" "),t("p",[t("span",[e._v("紧急联系人所在单位：")]),t("span",[e._v(e._s(e.jobData.a011831))])]),e._v(" "),t("p",[t("span",[e._v("车牌号：")]),e._v(" "),t("span",[e._v(e._s(e.jobData.a01196))])]),e._v(" "),t("p",[t("span",[e._v("审核人：")]),t("span",[e._v(e._s(e.shr))])]),e._v(" "),t("div",{staticClass:"btn"},[t("van-button",{staticStyle:{"font-size":"16px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.back}},[e._v("撤回")])],1)],1):e._e(),e._v(" "),t("div",{staticClass:"btns"},[t("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.backHome}},[e._v("返回列表")])],1)])},staticRenderFns:[]};var p=t("VU/8")(o,r,!1,function(e){t("7LXP")},"data-v-5fe9ee6e",null);a.default=p.exports}});
//# sourceMappingURL=36.2ab9d3d35fd4fa7a24e7.js.map