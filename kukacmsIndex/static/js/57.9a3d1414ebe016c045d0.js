webpackJsonp([57],{L0wC:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("NDjl"),o=t("gOYh"),s=t("Fd2+"),r=t("TTtu"),a=t("MqSQ"),A={components:{cadArcTanbber:i.a,loadingSpin:r.a,manageInfoCompon:a.a},data:function(){return{activeIndex:0,deptList:[],achlist:[],defaultAvatar:"src/assets/timg.jpg",nextDeptlist:{deptId:"000"},historyList:[]}},created:function(){this.queryInstitiu()},methods:{queryInstitiu:function(){var n=this,e={};e="000"==this.nextDeptlist.deptId?{deptId:this.$route.params.dept}:this.nextDeptlist,this.$refs.loadingSpin&&this.$refs.loadingSpin.showUp(),Object(o.d)(e).then(function(t){if(1e3==t.code){for(var i in t.obj)t.obj[i].text=t.obj[i].content,t.obj[i].badge=t.obj[i].allCount,t.obj[i].children=t.obj[i].jobnumbers;n.deptList=t.obj,n.achlist=t.obj[0].children,n.nextDeptlist=n.deptList[0],n.historyList.unshift(e)}else s.c.fail(t.msg);n.$refs.loadingSpin.shutdown()})},historyInstitiu:function(){var n=this;this.historyList.splice(0,1),this.historyList.length?(this.$refs.loadingSpin.showUp(),Object(o.d)(this.historyList[0]).then(function(e){if(1e3==e.code){for(var t in e.obj)e.obj[t].text=e.obj[t].content,e.obj[t].badge=e.obj[t].allCount,e.obj[t].children=e.obj[t].jobnumbers;n.deptList=e.obj,n.achlist=e.obj[0].children,n.nextDeptlist=n.deptList[0]}else s.c.fail(e.msg);n.$refs.loadingSpin.shutdown()})):this.$router.push({name:"institutions"})},leftClick:function(n){this.nextDeptlist=this.deptList[n],this.achlist=this.deptList[n].children},instituMore:function(){this.queryInstitiu()},onClickLeft:function(){this.historyInstitiu()},tabMoreClick:function(){this.$refs.manageInfo.faMore()}}},l={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("van-nav-bar",{attrs:{title:"子部门","left-text":"上一部门","left-arrow":""},on:{"click-left":n.onClickLeft},scopedSlots:n._u([{key:"right",fn:function(){return[t("van-button",{attrs:{round:"",icon:"weapp-nav",color:"linear-gradient(to right, #ff6034, #ee0a24)",size:"small"},on:{click:n.tabMoreClick}},[n._v("更多子部门")])]},proxy:!0}])}),n._v(" "),t("van-tree-select",{attrs:{height:"150vw",items:n.deptList,"main-active-index":n.activeIndex},on:{"update:mainActiveIndex":function(e){n.activeIndex=e},"update:main-active-index":function(e){n.activeIndex=e},"click-nav":n.leftClick}},[t("template",{slot:"content"},[t("manageInfoCompon",{ref:"manageInfo",attrs:{Fachlist:n.achlist,manInfoFlag:2},on:{institutionsChild:n.instituMore}})],1)],2),n._v(" "),t("cadArcTanbber"),n._v(" "),t("loadingSpin",{ref:"loadingSpin"})],1)},staticRenderFns:[]};var d=t("VU/8")(A,l,!1,function(n){t("nhDX")},null,null);e.default=d.exports},SLeV:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\nbody {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.headbgc {\n  height: 15vh;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ff3334), to(#fd9d9d));\n  background-image: -webkit-linear-gradient(#ff3334, #fd9d9d);\n  background-image: linear-gradient(#ff3334, #fd9d9d);\n}\n.bgccolor {\n  border-radius: 16px;\n}\n.marginsides {\n  border-radius: 5px;\n  margin-top: 10px;\n}\n.messageInfoos {\n  font-size: 14px;\n  padding: 5px 0 5px 10px;\n  background-color: #fff;\n  line-height: 4.5vh;\n  margin-top: 10px;\n}\n.img {\n  float: left;\n  border-radius: 50%;\n  border: 1px solid #eee;\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n}\n.resuName {\n  color: #3e4146;\n  font-weight: 700;\n  font-size: 16px;\n  padding-left: 5px;\n}\n.resuNames {\n  color: #ccc;\n  font-size: 14px;\n  padding-left: 5px;\n}\n.resuNamess {\n  color: #000;\n  font-size: 14px;\n  padding-left: 5px;\n}\n.resuNamesss {\n  color: #000;\n  font-size: 14px;\n  padding-left: 5px;\n}","",{version:3,sources:["D:/员工自助/selfGive_mobile/src/views/leadAffairs/cadreArchives/institutionsMore.vue"],names:[],mappings:";AACA;EACE,0BAA0B,CAAC,sCAAsC;EACjE,uBAAuB,CAAC,iBAAiB;EACzC,sBAAsB,CAAC,YAAY;EACnC,kBAAkB;CACnB;AACD;EACE,aAAa;EACb,8FAA8F;EAC9F,4DAA4D;EAC5D,oDAAoD;CACrD;AACD;EACE,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,iBAAiB;CAClB;AACD;EACE,gBAAgB;EAChB,wBAAwB;EACxB,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,uBAAuB;CACxB;AACD;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;CACnB",file:"institutionsMore.vue",sourcesContent:["\nbody {\n  -webkit-user-select: text; /* Chrome all / Safari all /opera15+*/\n  -moz-user-select: text; /* Firefox all */\n  -ms-user-select: text; /* IE 10+ */\n  user-select: text;\n}\n.headbgc {\n  height: 15vh;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ff3334), to(#fd9d9d));\n  background-image: -webkit-linear-gradient(#ff3334, #fd9d9d);\n  background-image: linear-gradient(#ff3334, #fd9d9d);\n}\n.bgccolor {\n  border-radius: 16px;\n}\n.marginsides {\n  border-radius: 5px;\n  margin-top: 10px;\n}\n.messageInfoos {\n  font-size: 14px;\n  padding: 5px 0 5px 10px;\n  background-color: #fff;\n  line-height: 4.5vh;\n  margin-top: 10px;\n}\n.img {\n  float: left;\n  border-radius: 50%;\n  border: 1px solid #eee;\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n}\n.resuName {\n  color: #3e4146;\n  font-weight: 700;\n  font-size: 16px;\n  padding-left: 5px;\n}\n.resuNames {\n  color: #ccc;\n  font-size: 14px;\n  padding-left: 5px;\n}\n.resuNamess {\n  color: #000;\n  font-size: 14px;\n  padding-left: 5px;\n}\n.resuNamesss {\n  color: #000;\n  font-size: 14px;\n  padding-left: 5px;\n}"],sourceRoot:""}])},nhDX:function(n,e,t){var i=t("SLeV");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("34bb6950",i,!0,{})}});
//# sourceMappingURL=57.9a3d1414ebe016c045d0.js.map