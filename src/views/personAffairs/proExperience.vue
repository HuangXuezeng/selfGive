<template>
    <div>
        <div class="contentbox">
            <p><span><i class="iconfont icon-name"></i> 项目名称：员工自助手机端</span></p>
            <p><span ><i class="iconfont icon-kaishi"></i> 进入项目时间：2018-3-16</span></p>
            <p><span><i class="iconfont icon-tingzhi"></i> 退出项目时间：2018-3-16</span></p>
            <p><span><i class="iconfont icon-danwei"></i> 任职类型：前端开发</span></p>
            <p><span><i class="iconfont icon-dengji-copy"></i> 项目角色：项目经理</span></p>
            <p><span><i class="iconfont icon-dianhuahaoma"></i> 项目性质：******</span></p>
            <p><span><i class="iconfont icon-webduanmobancaozuo_renyuanxinxi"></i> 操作人：赵六</span></p>
            <p><span><i class="iconfont icon-riqi"></i> 操作日期：2018-2-16</span></p>
            <!-- <span>
                <van-button type="primary" size="mini">修改</van-button>
            </span> -->
        </div>
    </div>
</template>
<script>
import { Button } from 'vant'
export default {
  data () {
    return {
    };
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
    }
</style>