<template>
    <div>
        <div class="contentbox">
            <!-- <van-collapse v-model="activeNames" v-for="(item,index) in zigeList" :key="item.id">
                <van-collapse-item :name="index">
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">项目经历{{index+1}}</van-tag></div>
                    </template>
                    <p><span>项目名称：</span><span>员工自助手机端</span></p>
                    <p><span >进入项目时间：</span><span>2018-3-16</span></p>
                    <p><span>退出项目时间：</span><span>2018-3-16</span></p>
                    <p><span>投入精力占比：</span><span>2018-3-16</span></p>
                    <p><span>任职类型：</span><span>前端开发</span></p>
                    <p><span>项目角色：</span><span>项目经理</span></p>
                    <p><span>项目性质：</span><span>******</span></p>
                    <p><span>项目成果：</span><span>******</span></p>
                </van-collapse-item>
            </van-collapse> -->
            <van-collapse v-model="activeNames">
                <van-collapse-item>
                    <template #title>
                        <div class="fontweig"><van-tag mark type="primary" color="#fc5f10">项目经历</van-tag></div>
                    </template>
                    <p><span>项目名称：</span><span>员工自助手机端</span></p>
                    <p><span >进入项目时间：</span><span>2018-3-16</span></p>
                    <p><span>退出项目时间：</span><span>2018-3-16</span></p>
                    <p><span>投入精力占比：</span><span>2018-3-16</span></p>
                    <p><span>任职类型：</span><span>前端开发</span></p>
                    <p><span>项目角色：</span><span>项目经理</span></p>
                    <p><span>项目性质：</span><span>******</span></p>
                    <p><span>项目成果：</span><span>******</span></p>
                </van-collapse-item>
                <!-- <div class="btn">
                    <van-button v-if="item.sign == 0" type="primary" size="small" color="#fc5f10" @click="update(item)" style="width:100%;font-size:16px">修改</van-button>
                    <van-button v-if="item.sign == 1" type="primary" size="small" color="#ccc" style="width:100%;font-size:16px">修改</van-button>
                </div> -->
            </van-collapse>
            <div class="btn">
                <van-button type="primary" size="small" color="#fc5f10" @click="add" style="width:100%;font-size:16px">添加</van-button>
                <van-button type="primary" size="small" @click="already" color="#fc5f10" style="width:100%;font-size:16px;margin-top:10px">审核列表</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Button,Tag,Collapse,CollapseItem,Popup,ImagePreview,Notify } from 'vant'
export default {
  data () {
    return {
        activeNames: [0,1,2,3,4,5,6,7,8],
    };
  },
  created(){},
  methods:{
    //跳转到修改页
    update(item){
        console.log(item)
        this.$router.push({name:'updatePro',params:{zData:item}})
    },
    //添加
    add(){
        this.$router.push({name:'addPro'})
    },
    //查看已添加的页面
    already(){
        this.$router.push({name:'alreadyPro'})
    },
  }
}
</script>
<style lang="stylus" scoped>
    .contentbox{
        line-height 27px
        width 90%
        margin 10px auto 0 auto
        padding 5px 0 5px 0
        padding-left 5px
        box-shadow:0px 8px 10px #eee
        border-radius 6px
        p{
            padding 5px 0 5px 5px
            border-bottom  1px solid #eee
        }
        .iconfont{
            color #ee0a24
        }
        .btn{
            padding 10px
        }
    }
</style>