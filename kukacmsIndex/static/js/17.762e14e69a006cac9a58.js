webpackJsonp([17],{ZS0w:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("Fd2+");var a=n("6s/a"),o={data:function(){return{activeNames:[0,1,2,3,4,5,6,7,8],proList:[]}},created:function(){this._getProList()},methods:{_getProList:function(){var e=this,t={jobnumber:localStorage.getItem("jobNum")};Object(a.t)(t).then(function(t){e.proList=t.obj})},update:function(e){console.log(e),this.$router.push({name:"updatePro",params:{zData:e}})},add:function(){this.$router.push({name:"addPro"})},already:function(){this.$router.push({name:"alreadyPro"})}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"contentbox"},[e._l(e.proList,function(t,a){return n("van-collapse",{key:t.id,model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[n("van-collapse-item",{attrs:{name:a},scopedSlots:e._u([{key:"title",fn:function(){return[n("div",{staticClass:"fontweig"},[n("van-tag",{attrs:{mark:"",type:"primary",color:"#fc5f10"}},[e._v("项目经历"+e._s(a+1))])],1)]},proxy:!0}],null,!0)},[e._v(" "),n("p",[n("span",[e._v("项目名称：")]),n("span",[e._v(e._s(t.projectName))])]),e._v(" "),n("p",[n("span",[e._v("进入项目时间：")]),n("span",[e._v(e._s(t.startTime))])]),e._v(" "),n("p",[n("span",[e._v("退出项目时间：")]),n("span",[e._v(e._s(t.endTime))])]),e._v(" "),n("p",[n("span",[e._v("投入精力占比：")]),n("span",[e._v(e._s(t.trjlzb))])]),e._v(" "),n("p",[n("span",[e._v("任职类型：")]),n("span",[e._v(e._s(t.jobType))])]),e._v(" "),n("p",[n("span",[e._v("项目角色：")]),n("span",[e._v(e._s(t.projectRole))])]),e._v(" "),n("p",[n("span",[e._v("项目性质：")]),n("span",[e._v(e._s(t.projectProp))])]),e._v(" "),n("p",[n("span",[e._v("项目成果：")]),n("span",[e._v(e._s(t.projectResult))])])]),e._v(" "),n("div",{staticClass:"btn"},[0==t.sign?n("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:function(n){return e.update(t)}}},[e._v("修改")]):e._e(),e._v(" "),1==t.sign?n("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#ccc"}},[e._v("修改")]):e._e()],1)],1)}),e._v(" "),n("div",{staticClass:"btn"},[n("van-button",{staticStyle:{width:"100%","font-size":"16px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.add}},[e._v("添加")]),e._v(" "),n("van-button",{staticStyle:{width:"100%","font-size":"16px","margin-top":"10px"},attrs:{type:"primary",size:"small",color:"#fc5f10"},on:{click:e.already}},[e._v("审核列表")])],1)],2)])},staticRenderFns:[]};var p=n("VU/8")(o,s,!1,function(e){n("eVq6")},"data-v-9c3e15fc",null);t.default=p.exports},eVq6:function(e,t,n){var a=n("maQP");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("7d1a5ce5",a,!0,{})},maQP:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\nbody[data-v-9c3e15fc] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.contentbox[data-v-9c3e15fc] {\n  line-height: 27px;\n  width: 90%;\n  margin: 10px auto 0 auto;\n  padding: 5px 0 5px 0;\n  padding-left: 5px;\n  -webkit-box-shadow: 0px 8px 10px #eee;\n          box-shadow: 0px 8px 10px #eee;\n  border-radius: 6px;\n}\n.contentbox p[data-v-9c3e15fc] {\n  padding: 5px 0 5px 5px;\n  border-bottom: 1px solid #eee;\n}\n.contentbox .iconfont[data-v-9c3e15fc] {\n  color: #ee0a24;\n}\n.contentbox .btn[data-v-9c3e15fc] {\n  padding: 10px;\n}","",{version:3,sources:["D:/员工自助/selfGive_mobile/src/views/personAffairs/proExperience.vue"],names:[],mappings:";AACA;EACE,0BAA0B,CAAC,sCAAsC;EACjE,uBAAuB,CAAC,iBAAiB;EACzC,sBAAsB,CAAC,YAAY;EACnC,kBAAkB;CACnB;AACD;EACE,kBAAkB;EAClB,WAAW;EACX,yBAAyB;EACzB,qBAAqB;EACrB,kBAAkB;EAClB,sCAAsC;UAC9B,8BAA8B;EACtC,mBAAmB;CACpB;AACD;EACE,uBAAuB;EACvB,8BAA8B;CAC/B;AACD;EACE,eAAe;CAChB;AACD;EACE,cAAc;CACf",file:"proExperience.vue",sourcesContent:["\nbody[data-v-9c3e15fc] {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.contentbox[data-v-9c3e15fc] {\n  line-height: 27px;\n  width: 90%;\n  margin: 10px auto 0 auto;\n  padding: 5px 0 5px 0;\n  padding-left: 5px;\n  -webkit-box-shadow: 0px 8px 10px #eee;\n          box-shadow: 0px 8px 10px #eee;\n  border-radius: 6px;\n}\n.contentbox p[data-v-9c3e15fc] {\n  padding: 5px 0 5px 5px;\n  border-bottom: 1px solid #eee;\n}\n.contentbox .iconfont[data-v-9c3e15fc] {\n  color: #ee0a24;\n}\n.contentbox .btn[data-v-9c3e15fc] {\n  padding: 10px;\n}"],sourceRoot:""}])}});
//# sourceMappingURL=17.762e14e69a006cac9a58.js.map