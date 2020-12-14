<!--  -->
<template>
    <div class='baggrond'>
        <adresNavbar></adresNavbar>
        <adresResultsTanbber ref="adresResultsTanbber" />
        <div style="height:20px"></div>
        <van-row>
            <van-col span="1">
                <div style="width:1px;height:11vh"></div>
            </van-col>
            <van-col span="6" offset="3">
                <div class="cadresStructure">
                    <transition-group>
                        <div v-for="(item,i) in silinglist" :key="i">
                            <transition name="van-slide-left">
                                <div class="colorFF" v-show="item.siling">{{item.value}}</div>
                            </transition>
                        </div>
                    </transition-group>
                </div>
            </van-col>
            <van-col span="8" offset="6">
                <transition-group>
                    <div v-for="(item,i) in zaibianlist" :key="i">
                        <transition name="van-slide-right">
                            <div class="colorFF" v-show="item.zaibian">{{item.value}}</div>
                        </transition>
                    </div>
                </transition-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="4" offset="7">
                <div style="">
                    <hexagonal showStr='干部结构' bgc='#87CEEB' vanSlide='van-slide-down' :slideShow='true' :timmeDelay='100'></hexagonal>
                </div>
            </van-col>
            <van-col span="6" offset="2">
                <hexagonal showStr='整体情况' bgc='#BDB76B' vanSlide='van-slide-down' :slideShow='true' :timmeDelay='1000'></hexagonal>
            </van-col>
            <van-col span="5">
                <transition-group>
                    <div v-for="(item,i) in leibielist" :key="i">
                        <transition name="van-slide-right">
                            <div class="colorFF" v-show="item.leibie">{{item.value}}</div>
                        </transition>
                    </div>
                </transition-group>
                <!-- <div class="colorFF">M类 P类 S类</div>
                <div class="colorFF">428 202 91</div> -->
            </van-col>
        </van-row>
        <van-row>
            <van-col span="5">
                <!-- <div style="width:1px;height:6vh"></div>
                <transition-group>
                    <div v-for="(item,i) in pandianlist" :key="i">
                        <transition name="van-slide-right">
                            <div class="colorFF" v-show="item.pandian">{{item.value}}</div>
                        </transition>
                    </div>
                </transition-group> -->
            </van-col>
            <van-col span="5">
                <div style="position: relative;">
                    <div style="position: absolute;top: -3vh;left: -2vh;">
                        <hexagonal showStr='干部盘点' bgc='#32CD32' vanSlide='van-slide-left' :slideShow='true' :timmeDelay='5000'></hexagonal>
                    </div>
                </div>
            </van-col>
            <van-col span="7">
                <transition name="van-fade">
                    <div style="position:relative" v-show="atmosphereFlag">
                        <span class="zuzhi">组织氛围:</span>
                        <div>
                            <!-- <span class="zuzhiato">☁️</span> -->
                            <!-- <span class="zuzhiato"></span> -->
                            <img :src="weatherSrc" alt="" class="weatherSty">
                            <div class="zuzhiatostr">多云</div>
                        </div>
                    </div>
                </transition>
            </van-col>
            <van-col span="6">
                <div style="position: relative;">
                    <div style="position: absolute;top: -3vh;left: -3vh;">
                        <hexagonal showStr='干部层级' bgc='#EE82EE' vanSlide='van-slide-right' :slideShow='true' :timmeDelay='2000'></hexagonal>
                    </div>
                </div>
            </van-col>
            <van-col span="1">
                <div style="width:1px;height:17vh"></div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="1">
                <div style="width:1px;height:6vh"></div>
            </van-col>
            <van-col span="7">
                <div style="position: relative;">
                    <div style="position: absolute;top: -8vh;left:0;">
                        <transition-group>
                            <div v-for="(item,i) in pandianlist" :key="i">
                                <transition name="van-slide-left">
                                    <div class="colorFF" v-show="item.pandian">{{item.value}}</div>
                                </transition>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </van-col>
            <van-col span="8">
                <div style="position: relative;">
                    <div style="position: absolute;top: -8vh;left: -2vh;">
                        <hexagonal showStr='干部储备' bgc='#FFD700' vanSlide='van-slide-up' :slideShow='true' :timmeDelay='4000'></hexagonal>
                    </div>
                </div>
            </van-col>
            <van-col span="8">
                <div style="position: relative;">
                    <div style="position: absolute;top: -8vh;left: -7vh;">
                        <hexagonal showStr='干部保留' bgc='#6495ED' vanSlide='van-slide-up' :slideShow='true' :timmeDelay='3000'></hexagonal>
                    </div>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="6" offset="4">
                <transition-group>
                    <div v-for="(item,i) in chubeilist" :key="i">
                        <transition name="van-slide-up">
                            <div class="colorFF" v-show="item.chubei">{{item.value}}</div>
                        </transition>
                    </div>
                </transition-group>
            </van-col>
            <van-col span="8" offset="6">
                <transition-group>
                    <div v-for="(item,i) in liushilist" :key="i">
                        <transition name="van-slide-up">
                            <div class="colorFF" v-show="item.liushi">{{item.value}}</div>
                        </transition>
                    </div>
                </transition-group>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import hexagonal from "@/components/adresResultstab/hexagonal.vue";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import {
        Picker,
        Toast,
        Col,
        Row,
        Popup,
        Checkbox,
        CheckboxGroup,
        Notify,
        Overlay,
        Grid,
        GridItem
    } from "vant";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            hexagonal,
            adresResultsTanbber,
            adresNavbar,

        },
        data() {
            //这里存放数据
            return {
                silinglist: [{
                    value: '平均司龄 5.5',
                    siling: false
                }, {
                    value: '平均司龄 5.5',
                    siling: false
                }, {
                    value: '平均司龄 5.5',
                    siling: false
                }, {
                    value: '平均司龄 5.5',
                    siling: false
                }, ],
                zaibianlist: [{
                    value: '当前在编 5.5',
                    zaibian: false
                }, {
                    value: '当前在编 5.5',
                    zaibian: false
                }, {
                    value: '当前在编 5.5',
                    zaibian: false
                }, {
                    value: '当前在编 5.5',
                    zaibian: false
                }, ],
                leibielist: [{
                        value: 'M类 P类 S类',
                        leibie: false
                    }, {
                        value: '428 202 91',
                        leibie: false
                    }, {
                        value: '总监级 153',
                        leibie: false
                    },
                    {
                        value: '经理级 53',
                        leibie: false
                    },
                ],
                liushilist: [{
                    value: '月均流失率 2.5%',
                    liushi: false
                }, {
                    value: '年均流失率 15.2%',
                    liushi: false
                }, ],
                chubeilist: [{
                        value: '一年内可用 25%',
                        chubei: false
                    }, {
                        value: '一年内可用 25%',
                        chubei: false
                    },
                    {
                        value: '一年内可用 25%',
                        chubei: false
                    },
                ],
                pandianlist: [{
                    value: '第一象限 5%',
                    pandian: false
                }, {
                    value: '第一象限 5%',
                    pandian: false
                }, {
                    value: '第一象限 5%',
                    pandian: false
                }, {
                    value: '第一象限 5%',
                    pandian: false
                }, ],
                weatherSrc: '',
                atmosphereFlag: false
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            animateMeth() {
                // function timeAnimate(key) {
                setTimeout(() => {
                    for (let i in this.silinglist) {
                        setTimeout(() => {
                            this.silinglist[i].siling = true
                        }, i * 100);
                    }
                }, 200);
                setTimeout(() => {
                    for (let i in this.zaibianlist) {
                        setTimeout(() => {
                            this.zaibianlist[i].zaibian = true
                        }, i * 100);
                    }
                }, 1100);
                setTimeout(() => {
                    for (let i in this.leibielist) {
                        setTimeout(() => {
                            this.leibielist[i].leibie = true
                        }, i * 100);
                    }
                }, 2100);
                setTimeout(() => {
                    for (let i in this.liushilist) {
                        setTimeout(() => {
                            this.liushilist[i].liushi = true
                        }, i * 100);
                    }
                }, 3100);
                setTimeout(() => {
                    for (let i in this.chubeilist) {
                        setTimeout(() => {
                            this.chubeilist[i].chubei = true
                        }, i * 100);
                    }
                }, 4100);
                setTimeout(() => {
                    for (let i in this.pandianlist) {
                        setTimeout(() => {
                            this.pandianlist[i].pandian = true
                        }, i * 100);
                    }
                }, 5100);
                setTimeout(() => {
                    this.atmosphereFlag = true
                    // for (let i in this.pandianlist) {
                    //     setTimeout(() => {
                    //         this.pandianlist[i].pandian = true
                    //     }, i * 100);
                    // }
                }, 6100);
                // }
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("dataBoard");
            this.animateMeth()
            this.weatherSrc = require("@/assets/雨天.png");
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
    .baggrond {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 150%;
        background: url('../../assets/Snipaste_2020-12-11_14-29-48.png') no-repeat;
        overflow auto;
        background-position: center 0;
    }

    .colorFF {
        color: #c0c0c0;
        padding: 3px 0;
        font-size: 13px;
    }

    .zuzhi {
        color: #c0c0c0;
        font-size: 17px;
        font-weight: 700;
        position: absolute;
        top: 0;
        left: 1vh;
    }

    .weatherSty {
        width: 8vh;
        height: 7vh;
        top: 3vh;
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
        top: 10vh;
        left: 4vh;
    }

    .cadresStructure {}

    //@import url(); 引入公共css类
</style>
