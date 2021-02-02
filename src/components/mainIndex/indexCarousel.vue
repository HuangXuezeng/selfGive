<!--  -->
<template>
    <div class=''>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,index) in imagelist" :key="index">
                <!-- <h3 class="medium">{{ item }}</h3> -->
                <img :src="item" alt="" style="height:100%;width:100%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        name: "indexCarousel",
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
              imagelist:[]
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
          this.imagelist=['../../../static/images/6b819c5cb18fde89d4d9172a331387f7.jpeg','../../../static/images/9c34b679c08e16402dc026c150ad36ce.jpeg','../../../static/images/60e606c90ce5c093db102675c6ee2253.jpeg','../../../static/images/79990b756b6e36baf8004d80a19f8851.jpeg','../../../static/images/dd0514d4771ae54f184849d729c4917f.jpeg','../../../static/images/e4f86c604b53c2d1b79301c82a254712.jpeg',]
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
    // .el-carousel__item h3 {
    //     color: #475669;
    //     font-size: 14px;
    //     opacity: 0.75;
    //     line-height: 200px;
    //     margin: 0;
    // }

    // .el-carousel__item:nth-child(2n) {
    //     background-color: #99a9bf;
    // }

    // .el-carousel__item:nth-child(2n+1) {
    //     background-color: #d3dce6;
    // }

    //@import url(); 引入公共css类
</style>
