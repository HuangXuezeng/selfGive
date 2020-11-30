<!--  -->
<template>
    <div class=''>
        <van-sticky offset-top='29.6px' v-if="allPage">
            <div class="resetVantfixed resetVantfixcader">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="selecYear" :options="yearlist" @change="yearChange" title-class="colorFFF" />
                </van-dropdown-menu>
            </div>
        </van-sticky>
        <div class="resetVantfixed resetVantfixcader" v-if="!allPage">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="selecYear" :options="yearlist" @change="yearChange" title-class="colorFFF" />
                </van-dropdown-menu>
          </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import {
        DropdownMenu,
        DropdownItem,
        Sticky
    } from "vant";
    export default {
        name: 'selctYearcurrent',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        props: {
            startYear: {
                type: Number,
                default: 2018
            },
            allPage: {
                type: Number,
                default: 1
            }
        },
        data() {
            //这里存放数据
            return {
                selecYear: "",
                yearlist: [],
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //设定年月
            getNewYear() {
                let myDate = new Date();
                let tYear = myDate.getFullYear();
                let tmouth = myDate.getMonth() + 1;
                for (let i = 0; i < 100; i++) {
                    if (tYear - i == this.startYear) {
                        this.selecYear = this.yearlist[0].value;
                        return;
                    } else {
                        let obj = {};
                        obj.text = tYear - i + "年";
                        obj.value = tYear - i;
                        this.yearlist.push(obj);
                    }
                }
            },
            yearChange(item) {
                this.$emit("yearChangeItem", item);
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.getNewYear()
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
<style lang='stylus'>
    //@import url(); 引入公共css类
    .colorFFF {
        color: #fff;
    }
</style>
