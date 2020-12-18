<!--  -->
<template>
    <div style="height:31vh">
        <van-row type="flex" justify="center">
            <van-col span="3" offset="8">
                <div style="position: relative;">
                    <div style="position:absolute">
                        <hexagonal showStr='干部结构' bgc='#87CEEB' vanSlide='van-slide-down' :slideShow='true' :timmeDelay='delayttime.jiegou'></hexagonal>
                    </div>
                    <div style="width:1px;height:10vh"></div>

                </div>
            </van-col>
            <van-col span="11" offset="2">
                <div style="position: relative;">
                    <div style="position:absolute">
                        <hexagonal showStr='整体情况' bgc='#BDB76B' vanSlide='van-slide-down' :slideShow='true' :timmeDelay='delayttime.zhengti'></hexagonal>
                    </div>
                </div>

            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="4" offset="5">
                <div style="position: relative;">
                    <div style="position:absolute">
                        <hexagonal showStr='干部盘点' bgc='#32CD32' vanSlide='van-slide-left' :slideShow='true' :timmeDelay='delayttime.pandian'></hexagonal>
                    </div>
                    <div style="width:1px;height:10vh"></div>
                </div>
            </van-col>

            <van-col span="8" offset="7">
                <div style="position: relative;">
                    <div style="position:absolute">
                        <hexagonal showStr='干部层级' bgc='#EE82EE' vanSlide='van-slide-right' :slideShow='true' :timmeDelay='delayttime.cengji'></hexagonal>
                    </div>
                </div>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="3" offset="8">
                <div style="position: relative;">
                    <hexagonal showStr='干部储备' bgc='#FFD700' vanSlide='van-slide-up' :slideShow='true' :timmeDelay='delayttime.chubei'></hexagonal>
                    <!-- </div> -->

                </div>
            </van-col>
            <van-col span="11" offset="2">
                <div style="position: relative;">
                    <hexagonal showStr='干部保留' bgc='#6495ED' vanSlide='van-slide-up' :slideShow='true' :timmeDelay='delayttime.baoliu'></hexagonal>
                    <!-- </div> -->
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import hexagonal from "@/components/adresResultstab/hexagonal.vue";
    import {
        Col,
        Row,
        Grid,
        GridItem
    } from "vant";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            hexagonal,
        },
        props: {
            delayttime: {
                type: Object,
                default: {}
            },
        },
        data() {
            //这里存放数据
            return {

            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='stylus' scoped>
    .colorFF {
        color: #c0c0c0;
        padding: 3px 0;
        font-size: 13px;
    }

    .zuzhi {
        color: #c0c0c0;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        top: -2vh;
        left: 1vh;
    }

    .weatherSty {
        width: 6vh;
        height: 5vh;
        top: 0vh;
        left: 2vh;
        position: absolute;
    }

    .zuzhiato {
        color: #c0c0c0;
        font-size: 7vh;
        font-weight: 700;
        position: absolute;
        top: 2vh;
        left: 2vh;
    }

    .zuzhiatostr {
        color: #c0c0c0;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        top: 5vh;
        left: 3vh;
    }

    .cadresStructure {}

    //@import url(); 引入公共css类
</style>
