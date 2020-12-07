<!--  -->
<template>
    <div class="">
        <div>
            <van-nav-bar title="选择部门" left-text="上一部门" left-arrow @click-left="onClickLeft" @click-right="onClickRight" right-text="取消" />
        </div>
        <div>
            <van-tree-select height="170vw" :items="deptData" :main-active-index.sync="activeIndex">
                <template #content>
                    <!-- <van-image v-if="active === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                <van-image v-if="active === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" /> -->
                    <transition name="van-slide-right">
                        <div v-show="animateShow">
                            <van-cell :title="item.text" icon="friends-o" v-for="(item,index) in nextdept" :key="index">
                                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                                <template #right-icon>
                                    <van-button type="primary" size="small" @click="selectNext(item)" v-if="item.children != null && item.children.length != 0">下级</van-button>
                                    <van-button type="info" size="small" @click="confirmDept(item)">确认</van-button>
                                </template>
                            </van-cell>
                        </div>
                    </transition>
                </template>
            </van-tree-select>

        </div>
        <loadingSpin ref="loadingSpin"></loadingSpin>

    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import {
        Card,
        Toast,
        NavBar
    } from "vant";
    import {
        findIsHaveCadreInDept
    } from "@/views/adresResultts/adresResults.js";
    import {
        findPayrollDept,
    } from "@/views/PayLibrary/PayLibrary.js";
    import loadingSpin from "@/components/loadingSpin.vue";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            loadingSpin
        },
        data() {
            //这里存放数据
            return {
                activeIndex: 0,
                items: [{
                        text: '浙江',
                        children: [],
                        dot: true
                    },
                    {
                        text: '江苏',
                        children: [],
                        badge: 5
                    },
                ],
                nextdept: [],
                deptData: [],
                animateShow: true,
                historyList: [],
                reselect: ''
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            init() {
                if (this.reselect) {
                    this.reselectHistory()
                } else {
                    this.queryfindPayrollDept();
                }
            },
            // initSalaryDeptRes() {

            // },
            reselectHistory() {
                let adresResultHistoryList = JSON.parse(localStorage.getItem("adresResultHistory"))
                if (adresResultHistoryList.length) {
                    this.deptData = adresResultHistoryList[0].deptData[0];
                }
                this.processingField(this.deptData)
                this.historyList = adresResultHistoryList
                // this.$refs.loadingSpin.shutdown();
            },
            //查询部门
            queryfindPayrollDept() {
                if (
                    localStorage.getItem("SalaryDeptRes") == "" ||
                    localStorage.getItem("SalaryDeptRes") == null ||
                    localStorage.getItem("SalaryDeptRes") == "underfined" ||
                    JSON.parse(localStorage.getItem("SalaryDeptRes")).code != "1000"
                ) {
                    // this.$refs.loadingSpin.showUp();
                    findPayrollDept({
                        jobnumber: localStorage.getItem("jobNum")
                    }).then(
                        (res) => {
                            // this.deptData = res.obj.depts;
                            localStorage.setItem("SalaryDeptRes", JSON.stringify(res));
                            this.init()
                        }
                    );
                } else {
                    let SalaryDeptRes = JSON.parse(localStorage.getItem("SalaryDeptRes"));
                    SalaryDeptRes = JSON.parse(JSON.stringify(SalaryDeptRes).replace(/depts/g, 'children'))
                    SalaryDeptRes = JSON.parse(JSON.stringify(SalaryDeptRes).replace(/content/g, 'text'))
                    this.deptData = SalaryDeptRes.obj.children;
                    this.processingField(this.deptData, 1)
                    this.reselectHistory()

                }
            },
            //处理字段名合乎组件要求
            processingField(obj, type) {
                if (type == 1) {

                    // obj[0].children = obj[0].depts
                    // obj[0].text = obj[0].content
                    obj[0].badge = obj[0].children.length
                    let array = obj[0].children
                    for (let i in array) {
                        // array[i].children = array[i].depts
                        // delete array[i].depts
                        // array[i].text = array[i].content
                        array[i].badge = array[i].children.length
                    }
                    let copyObj = Object.assign({}, obj[0])
                    copyObj.children = []
                    array.unshift(copyObj)
                    this.nextdept = array
                    this.setHistoryList()
                } else {

                    let array = obj.children
                    for (let i in array) {
                        // array[i].children = array[i].depts
                        // delete array[i].depts
                        // array[i].text = array[i].content
                        if (array[i].children != null) {
                            array[i].badge = array[i].children.length
                        }
                    }
                    this.animateShow = false
                    this.deptData = [obj]
                    this.nextdept = obj.children
                    this.$nextTick(() => {
                        this.animateShow = true
                    })
                    this.setHistoryList()
                }
                this.$refs.loadingSpin.shutdown();

            },
            //记录选择路径
            setHistoryList() {

                let obj = {
                    deptData: this.deptData,
                }
                this.historyList.unshift(obj)
            },
            //下一级按钮逻辑
            selectNext(item) {

                if (item.children != null && item.children.length != 0) {
                    this.processingField(item)
                } else {
                    Toast.fail('该部门没有下一级子部门');
                }
            },
            onClickLeft() {

                if (this.historyList.length < 2) {
                    Toast.fail('没有上一级部门');
                } else {
                    this.historyList.splice(0, 1)
                    this.animateShow = false
                    this.deptData = this.historyList[0].deptData
                    this.nextdept = this.historyList[0].deptData[0].children
                    this.$nextTick(() => {
                        this.animateShow = true
                    })
                }
            },
            confirmDept(item) {
                findIsHaveCadreInDept({
                    deptList: [item.deptId]
                }).then(res => {
                    // debugger
                    if (res.obj == "Y") {
                        let activeTab = localStorage.getItem("activeTab") || 'cadresChange'
                        localStorage.setItem('adresResultDept', JSON.stringify(item))
                        localStorage.setItem('adresResultHistory', JSON.stringify(this.historyList))

                        this.$router.push({
                            name: activeTab,
                        })
                    } else {
                        Toast.fail('该部门无干部');
                    }
                })

            },
            onClickRight() {
                if (!localStorage.getItem("adresResultDept")) {
                    Toast.fail('请至少选择一个部门');
                    return
                }
                let activeTab = localStorage.getItem("activeTab") || 'cadresChange'
                this.$router.push({
                    name: activeTab,
                })
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.reselect = this.$route.params.reselect || 0;

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.init()
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    };
</script>
<style lang='stylus' scoped>
    //@import url(); 引入公共css类
</style>
