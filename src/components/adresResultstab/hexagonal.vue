<!--  -->
<template>
    <div class='top'>
        <transition :name="vanSlide">
            <div class="list" :style="sizeSty" v-show="slideShows">
                <div class="list_child">
                    <div class="list_child_child" :style="bgcSty">
                        <div class="positionStr">{{showStr}}</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        name: 'hexagonal',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        props: {
            bgc: {
                type: String,
                default: '#ccc'
            },
            hexHeight: {
                type: Number,
                default: 90
            },
            hexWidth: {
                type: Number,
                default: 60
            },
            showStr: {
                type: String,
                default: '空'
            },
            vanSlide: {
                type: String,
                default: 'van-fade'
            },
            slideShow: {
                type: Boolean,
                default: false
            },
            timmeDelay: {
                type: Number,
                default: 100
            }
        },
        data() {
            //这里存放数据
            return {
                bgcSty: '',
                sizeSty: '',
                slideShows: false
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
        created() {
            this.bgcSty = 'background-color: ' + this.bgc + ';'
            this.sizeSty = 'height: ' + this.hexHeight + 'px;width:' + this.hexWidth + 'px'
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            setTimeout(() => {
                this.slideShows = this.slideShow
            }, this.timmeDelay);
        },
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
    .top {
        transform: perspective(1000);
    }

    .list {
        overflow: hidden;
        -webkit-transform: rotate(120deg);
    }

    .list_child {
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-transform: rotate(-60deg);
    }

    .list_child_child {
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-transform: rotate(-60deg);
    }

    .positionStr {
        position: absolute;
        top: 32%;
        left: 22%;
        width: 40px;
        font-size: 17px;
        color: #fff;
    }



    //@import url(); 引入公共css类
</style>
