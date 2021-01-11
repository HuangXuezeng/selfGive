<template>
    <div>
        <div class="header">
            <!-- <van-sticky class="resetVantfixed"> -->
            <van-row type="flex" justify="center" class="resetVant">
                <van-col span="24">
                    <van-search v-model="RosterInfoData.jobnumber" shape="round" background="linear-gradient(#ff3334, #fd9d9d)" placeholder="请输入搜索关键词" @search="onSearch" show-action @clear='clearSearch'>
                        <template #action>
                            <div @click="onSearch" style="color:#fff">搜索</div>
                        </template>
                    </van-search>
                </van-col>
            </van-row>
            <!-- </van-sticky> -->
        </div>
        <van-tabs v-model="activeName" :swipeable='true' :animated='true' @change="activeNameChange" :sticky='true'>
            <van-tab v-for="(item,index) in actionsList" :title="item.text" :key="index" :name="item.text">
                <div class="main">
                    <van-list v-if="loadFlag" v-model="loading" :finished="finished" :immediate-check="false" :offset="10" finished-text="没有更多了~" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
                        <manageInfoCompon :Fachlist='achlist'></manageInfoCompon>
                    </van-list>
                    <div v-if="!loadFlag" >
                        <manageInfoCompon :Fachlist='searchList'></manageInfoCompon>
                        <div style="width:100%;height:50vh" v-if="noneDataFlag">

                        </div>
                    </div>
                </div>

            </van-tab>
        </van-tabs>
        <!-- <div class="footer"> -->
            <cadArcTanbber></cadArcTanbber>
        <!-- </div> -->
        <loadingSpin ref="loadingSpin"></loadingSpin>
    </div>
</template>

<script>
    import {
        findCadreRosterInfo,
        findCadreRosterInfoByCondition
    } from "@/views/leadAffairs/cadreArchives/cadreArchivesApi.js";
    import cadArcTanbber from "@/components/cadArcComponents/cadArcTanbber.vue";
    import {
        Card,
        Toast,
        Popover
    } from "vant";
    import loadingSpin from "@/components/loadingSpin.vue";
    import manageInfoCompon from '@/components/cadArcComponents/manageInfoCompon.vue'
    export default {
        components: {
            cadArcTanbber,
            loadingSpin,
            manageInfoCompon
        },
        data() {
            return {
                value: "",
                loading: false,
                finished: false,
                achlist: [],
                error: false,
                defaultAvatar: "src/assets/timg.jpg",
                nextpage: 1,
                searchValue: "",
                loadFlag: true,
                searchList: [],
                ddJobNum: localStorage.getItem("jobNum"),
                firstIn: 1,
                actionsList: [{
                    text: '全部',
                    type: '1'
                }, {
                    text: '姓名',
                    type: '2'

                }, {
                    text: '岗位',
                    type: '3'

                }, {
                    text: '部门',
                    type: '4'

                }, {
                    text: '籍贯',
                    type: '5'

                }, {
                    text: '职级',
                    type: '6'

                }, {
                    text: '司龄',
                    type: '7'

                }, {
                    text: '工作单位',
                    type: '8'

                }, {
                    text: '项目经历',
                    type: '9'

                }, {
                    text: '奖项',
                    type: '10'

                }, {
                    text: '培训经历',
                    type: '11'

                }, ],
                activeName: '',
                RosterInfoData: {
                    jobnumber: '',
                    jobnumber1: '',
                    type: '1'
                },
                secondPortFlag: false,
                noneDataFlag: false
            };
        },
        created() {
            this.RosterInfoData.jobnumber1 = this.ddJobNum
            this.queryDepartmentPersonnel();

        },
        mounted() {
            var that = this
            dd.ready(() => {
                dd.biz.navigation.setRight({
                    // show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
                    control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
                    text: '首页', //控制显示文本，空字符串表示显示默认文本
                    onSuccess: function(result) {
                        //如果control为true，则onSuccess将在发生按钮点击事件被回调
                        /*
                        {}
                        */
                        that.$router.push({
                            name: 'selfHome'
                        })
                    },
                    onFail: function(err) {}
                });
            })
        },
        methods: {
            activeNameChange(name, title) {
                if (title == '全部' && !this.RosterInfoData.jobnumber) {
                    this.queryDepartmentPersonnel();
                    return
                }
                for (let item of this.actionsList) {
                    if (item.text == title) {
                        this.RosterInfoData.type = item.type
                        break
                    }
                }
                this.searchQuery(this.RosterInfoData)
            },

            async onSearch() {
                this.secondPortFlag = true
                await this.searchQuery(this.RosterInfoData);
            },
            searchQuery(data) {
                this.searchList = []
                this.loadFlag = false
                this.noneDataFlag = false
                this.$refs.loadingSpin.showUp();
                findCadreRosterInfoByCondition(data).then(res => {
                    if (res.code == "1000") {
                        if (res.obj != null) {
                            this.searchList = res.obj;
                            if( Number(this.searchList.length)<4){
                              this.noneDataFlag = true
                            }
                        }
                    } else {
                        this.noneDataFlag = true
                        Toast.fail(res.msg);
                    }
                });
                this.$refs.loadingSpin.shutdown();
            },
            manageInfoMethod(item) {
                this.$router.push({
                    name: 'cadreArchivesInfo',
                    params: {
                        managerInfo: item
                    }
                })
            },
            clearSearch() {
                this.activeName = '全部'
                this.achlist=[]
                this.nextpage = 1
                this.secondPortFlag = false
                this.RosterInfoData.type='1'
                this.queryDepartmentPersonnel();
            },
            /**
             * 第一次请求调用分页接口
             */
            //请求数据
            queryDepartmentPersonnel() {
                this.loadFlag = true
                findCadreRosterInfo({
                    jobnumber: this.ddJobNum,
                    pageNum: this.nextpage,
                }).then(
                    res => {
                        if (res.code == "1000") {
                            if (res.obj.length != 0) {
                                this.achlist = this.achlist.concat(res.obj);
                                this.loading = false;
                            } else {
                                this.finished = true;
                            }
                        } else {
                            this.error = true;
                        }
                        this.$refs.loadingSpin.shutdown();
                    }
                );
            },
            async onLoad() {
                if (this.secondPortFlag) {
                    return
                }
                this.nextpage++;
                await this.queryDepartmentPersonnel();
            },
        }
    };
</script>

<style lang="stylus">
    .headbgc {
        height: 30%;
        background-image: linear-gradient(#ff3334, #fd9d9d);
    }

    .header {}

    .bgccolor {
        // background-color #fff
        // padding 5px 0 5px 0
        border-radius: 16px;
    }

    .marginsides {
        border-radius: 5px;
        margin-top: 10px;
    }

    .myContents {
        // background-color #fff
    }

    .messageInfoos {
        font-size: 14px;
        // color #8f8f94
        padding: 5px 0 5px 10px;
        background-color: #fff;
        // border-top-left-radius 16px
        // border-top-right-radius 16px
        // height 17vh
        line-height: 4.5vh;
        margin-top: 10px;
    }

    .img {
        // float: left;
        border-radius: 50%;
        border: 1px solid #eee;
        width: 50px;
        height: 50px;
        vertical-align: middle;
    }

    .resuName {
        color: #3E4146;
        font-weight: 700;
        font-size: 16px;
        padding-left: 5px;
    }

    .resuNames {
        color: #ccc;
        font-size: 14px;
        padding-left: 5px;
    }

    .resuNamess {
        color: black;
        font-size: 14px;
        padding-left: 5px;
    }

    .resuNamesss {
        color: black;
        font-size: 14px;
        padding-left: 5px;
    }
</style>
