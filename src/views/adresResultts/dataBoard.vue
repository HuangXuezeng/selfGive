<!--  -->
<template>
    <div class='baggrond'>
        <div class="bgopacity">
            <adresNavbar></adresNavbar>
            <adresResultsTanbber ref="adresResultsTanbber"></adresResultsTanbber>
            <div style="height:20px"></div>
            <van-row>
                <van-col span="8" offset="5">
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
                <van-col span="8" offset="2">
                    <transition-group>
                        <div v-for="(item,i) in zaibianlist" :key="i">
                            <transition name="van-slide-right">
                                <div class="colorFF" v-show="item.zaibian">{{item.value}}</div>
                            </transition>
                        </div>
                    </transition-group>
                </van-col>
                <van-col span="1">
                    <div style="height: 10vh;width: 1px;">
                    </div>
                </van-col>
            </van-row>

            <hexagonalFix :delayttime='delayTime' v-if="hexagonalFlag"></hexagonalFix>
            <van-row>
                <van-col span="9" offset="1">
                    <div class="cadresStructure">
                        <div style="position: relative;">
                            <div style="position: absolute;top: -17vh;left: 0vh;">
                                <transition-group>
                                    <div v-for="(item,i) in pandianlist" :key="i">
                                        <transition name="van-slide-left">
                                            <div class="colorFF" v-show="item.pandian"> <span v-html="item.value"></span></div>
                                        </transition>
                                    </div>
                                </transition-group>
                            </div>
                        </div>

                    </div>
                </van-col>
                <van-col span="5">
                    <transition name="van-fade">
                        <div style="position:relative" v-show="atmosphereFlag">
                            <span class="zuzhi" style="top:-19vh">组织氛围</span>
                            <div>
                                <img :src="weatherSrc" alt="" class="weatherSty" style="top:-16vh">
                                <div class="zuzhiatostr" style="top:-10vh">{{weatherStr}}</div>
                            </div>
                        </div>
                    </transition>
                </van-col>
                <van-col span="5" offset="4">
                    <div style="position: relative;">
                        <div style="position: absolute;top: -25vh;left: 2vh;">
                            <transition-group>
                                <div v-for="(item,i) in leibielist" :key="i">
                                    <transition name="van-slide-right">
                                        <div class="colorFF" v-show="item.leibie">{{item.value}}</div>
                                    </transition>
                                </div>
                            </transition-group>
                        </div>

                    </div>

                </van-col>
            </van-row>
            <van-row>
                <van-col span="7" offset="4">
                    <div class="cadresStructure">
                        <transition-group>
                            <div v-for="(item,i) in chubeilist" :key="i">
                                <transition name="van-slide-up">
                                    <div class="colorFF" v-show="item.chubei">{{item.value}}</div>
                                </transition>
                            </div>
                        </transition-group>
                    </div>
                </van-col>
                <van-col span="10" offset="3">
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

    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import hexagonal from "@/components/adresResultstab/hexagonal.vue";
    import adresResultsTanbber from "@/components/adresResultstab/adresResultstab.vue";
    import adresNavbar from "@/components/adresResultstab/adresResultsNavbar.vue";
    import hexagonalFix from "@/components/adresResultstab/hexagonalFix.vue";
    import {
        findCadreHomePageInfo
    } from "@/views/adresResultts/adresResults.js";
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
            hexagonalFix
        },
        data() {
            //这里存放数据
            return {
                silinglist: [],
                zaibianlist: [],
                leibielist: [],
                liushilist: [],
                chubeilist: [],
                pandianlist: [],
                weatherSrc: '',
                atmosphereFlag: false,
                findCadreHomePageInfoData: {
                    jobnumber: '',
                    deptList: [],
                    isDown: 'Y'
                },
                weatherStr: '',
                delayTime: {
                    jiegou: 0,
                    zhengti: 0,
                    cengji: 0,
                    baoliu: 0,
                    chubei: 0,
                    pandian: 0,
                    fenwei: 0,
                },
                hexagonalFlag: false
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            queryfindCadreHomePageInfo() {
                var that = this

                findCadreHomePageInfo(this.findCadreHomePageInfoData).then(res => {

                    if (res.code == "1000") {
                        let {
                            avgAge,
                            avgJobAge,
                            countM,
                            countP,
                            countS,
                            dqzb,
                            fenWei,
                            glfd,
                            highXl,
                            jingli,
                            monthLoss,
                            nineXX,
                            oneXX,
                            oneYearWorker,
                            pjzb,
                            yearLoss,
                            youngCadre,
                            zongjian,
                        } = res.obj
                        this.silinglist = [{
                            value: `平均司龄:${avgJobAge}`,
                            siling: false
                        }, {
                            value: `平均年龄:${avgAge}`,
                            siling: false
                        }, {
                            value: `本科及以上:${highXl}`,
                            siling: false
                        }, {
                            value: `青苗干部:${youngCadre}`,
                            siling: false
                        }, ]
                        this.zaibianlist = [{
                            value: `当前在编:${dqzb}`,
                            zaibian: false
                        }, {
                            value: `平均在编:${dqzb}`,
                            zaibian: false
                        }, {
                            value: `管理幅度:${glfd}`,
                            zaibian: false
                        }, ]
                        this.delayTime.zhengti = this.delayTime.jiegou + Number(this.silinglist.length) * 50
                        this.leibielist = [{
                            value: `M类:${countM}`,
                            leibie: false
                        }, {
                            value: `P类:${countP}`,
                            leibie: false
                        }, {
                            value: `S类:${countS}`,
                            leibie: false
                        }, {
                            value: `总监级:${zongjian}`,
                            leibie: false
                        }, {
                            value: `经理级:${jingli}`,
                            leibie: false
                        }, ]
                        this.delayTime.cengji = this.delayTime.zhengti + Number(this.zaibianlist.length) * 50
                        this.liushilist = [{
                            value: `月均流失率:${monthLoss}`,
                            liushi: false
                        }, {
                            value: `年均流失率:${yearLoss}`,
                            liushi: false
                        }, ]
                        this.delayTime.baoliu = this.delayTime.cengji + Number(this.leibielist.length) * 50
                        this.chubeilist = [{
                            value: `一年内可用:${oneYearWorker}`,
                            chubei: false
                        }, ]
                        this.delayTime.chubei = this.delayTime.baoliu + Number(this.liushilist.length) * 50
                        this.pandianlist = [{
                            value: `第一象限:<br/>${oneXX}`,
                            pandian: false
                        }, {
                            value: `第九象限:<br/>${nineXX}`,
                            pandian: false
                        }, ]
                        this.delayTime.pandian = this.delayTime.chubei + Number(this.chubeilist.length) * 50
                        this.delayTime.fenwei = this.delayTime.pandian + Number(this.pandianlist.length) * 50
                        // that.delayTime
                        this.hexagonalFlag = true
                        this.animateMeth()
                        this.weatherStr = fenWei
                        switch (fenWei) {
                            case '雷雨':
                                this.weatherSrc = require("@/assets/雷雨.png");
                                break;
                            case '雨天':
                                this.weatherSrc = require("@/assets/雨天.png");
                                break;
                            case '阴天':
                                this.weatherSrc = require("@/assets/阴天.png");
                                break;
                            case '多云':
                                this.weatherSrc = require("@/assets/多云.png");
                                break;
                            case '晴天':
                                this.weatherSrc = require("@/assets/图片1.png");
                                break;
                            default:
                                break;
                        }
                    } else {
                        Toast.fail(res.msg);
                    }
                })

            },
            animateMeth() {
                // function timeAnimate(key) {
                // jiegou:100,
                // zhengti:1000,
                // cengji:2000,
                // baoliu:3000,
                // chubei:4000,
                // pandian:5000,
                // fenwei:6000,
                setTimeout(() => {
                    for (let i in this.silinglist) {
                        setTimeout(() => {
                            this.silinglist[i].siling = true
                        }, i * 50);
                    }
                }, this.delayTime.jiegou);
                setTimeout(() => {
                    for (let i in this.zaibianlist) {
                        setTimeout(() => {
                            this.zaibianlist[i].zaibian = true
                        }, i * 50);
                    }
                }, this.delayTime.zhengti);
                setTimeout(() => {
                    for (let i in this.leibielist) {
                        setTimeout(() => {
                            this.leibielist[i].leibie = true
                        }, i * 50);
                    }
                }, this.delayTime.cengji);
                setTimeout(() => {
                    for (let i in this.liushilist) {
                        setTimeout(() => {
                            this.liushilist[i].liushi = true
                        }, i * 50);
                    }
                }, this.delayTime.baoliu);
                setTimeout(() => {
                    for (let i in this.chubeilist) {
                        setTimeout(() => {
                            this.chubeilist[i].chubei = true
                        }, i * 50);
                    }
                }, this.delayTime.chubei);
                setTimeout(() => {
                    for (let i in this.pandianlist) {
                        setTimeout(() => {
                            this.pandianlist[i].pandian = true
                        }, i * 50);
                    }
                }, this.delayTime.pandian);
                setTimeout(() => {
                    this.atmosphereFlag = true
                    // for (let i in this.pandianlist) {
                    //     setTimeout(() => {
                    //         this.pandianlist[i].pandian = true
                    //     }, i * 100);
                    // }
                }, this.delayTime.fenwei);
                // }
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.$refs.adresResultsTanbber.changtab("dataBoard");

            this.findCadreHomePageInfoData.deptList = [JSON.parse(localStorage.getItem("adresResultDept")).deptId]
            this.findCadreHomePageInfoData.jobnumber = localStorage.getItem("jobNum")
            this.queryfindCadreHomePageInfo()
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发src/assets/2-第二届-戈壁2.jpg
    }
</script>
<style lang='stylus' scoped>
    .baggrond {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('../../assets/2-第二届-戈壁2.jpg') no-repeat;
        overflow auto;
        background-size: cover;
        background-position: center center;
    }

    .bgopacity {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /* width: 500px; */
        /* height: 300px; */
        /* line-height: 50px; */
        // text-align: center;
        background: rgba(255, 255, 255, 0.5);
        z-index: -1;
    }

    .colorFF {
        color: #fff;
        padding: 3px 0;
        font-size: 13px;
    }

    .zuzhi {
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        top: -19vh;
        left: 2vh;
    }

    .weatherSty {
        width: 6vh;
        height: 5vh;
        top: -19vh;
        left: 2vh;
        position: absolute;
    }

    .zuzhiato {
        color: #fff;
        font-size: 7vh;
        font-weight: 700;
        position: absolute;
        top: 2vh;
        left: 2vh;
    }

    .zuzhiatostr {
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        top: -13vh;
        left: 3vh;
    }

    .cadresStructure {}

    //@import url(); 引入公共css类
</style>
