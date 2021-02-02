<!--  -->
<template>
    <div class=''>
        <div>
            <div>
                <strong style="color:	#8B0000"> {{title}}</strong>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446565673_100160903?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.1.1611555412719rQcALUc" target="_blank" title="刘尚希：不存在3%的赤字红线，烟税、酒税还有增税潜力">
                    刘尚希：不存在3%的赤字红线，烟税、酒税还有增税潜力
                </a>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446561161_554746?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.2.1611555412719rQcALUc" target="_blank" title="叶檀：跟美国竞争不能靠茅台，美股科技指数一年暴涨4倍">
                    叶檀：跟美国竞争不能靠茅台，美股科技指数一年暴涨4倍

                </a>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446542493_162522?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.3.1611555412719rQcALUc" target="_blank" title="一年损失8个亿还负债累累，特朗普回归房地产还是政治复出？">
                    一年损失8个亿还负债累累，特朗普回归房地产还是政治复出？
                </a>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446553595_115479?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.4.1611555412719rQcALUc" target="_blank" title="什么样的住房制度，才是社会主义？">
                    什么样的住房制度，才是社会主义？
                </a>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446525839_177992?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.5.1611555412719rQcALUc" target="_blank" title="许家印朋友圈！恒大汽车引战260亿，深圳、香港6大富豪力挺">
                    许家印朋友圈！恒大汽车引战260亿，深圳、香港6大富豪力挺

                </a>
            </div>
            <div class="xinwen-item">
                <a href="https://www.sohu.com/a/446548100_711825?scm=1004.759738464039272448.0.0.0&amp;spm=smpc.home.business-news11.6.1611555412719rQcALUc" target="_blank" title="4年干到世界500强！绝对的世界第一，又过4年，破产了">
                    4年干到世界500强！绝对的世界第一，又过4年，破产了
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        name: 'xinwen',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        props: {
            title: {
                type: String,
                default: "顾家新闻"
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
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

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
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    .xinwen-item {
        padding: 10px;
        font-size: 12px
    }
</style>
