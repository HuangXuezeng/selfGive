<template>
    <div>
        <div class="cadreInfo-bgccolor" v-if="manInfoFlag == 1">
            <div class="cadreInfo-marginsides" v-for="items in Fachlist" :key="items.a0190">
                <div class="cadreInfo-myContents">
                    <div class="cadreInfo-box" @click="manageInfoMethod(items)">
                        <div style="display:flex;">
                            <div>
                                <img class="img" :src="items.photo != null ? items.photo : defaultAvatar" alt />
                            </div>
                            <div style="flex:1">
                                <div class="cadreInfo-resuName">{{ items.a0101 }}</div>
                                <div style="display: flex;justify-content: space-between;">
                                    <div class="cadreInfo-resuNamess van-ellipsis">
                                        岗位：
                                        <span style="color:black">{{ items.gwName }}</span>
                                    </div>
                                    <div class="cadreInfo-resuNamesss">
                                        职级：
                                        <i style="color:#FF8C00">{{ items.zjName || items.a01516 }}</i>
                                    </div>
                                </div>
                                <div v-if="items.deptName">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div style="width: 7vh;">部门:</div>
                                        <!-- <span style="color:red">{{ items.deptName }}</span> -->
                                        <div style="color:red;width: 24vh;" v-html="items.deptName"></div>
                                    </div>
                                </div>
                                <div v-if="items.nativePlace">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>籍贯:</div>
                                        <!-- <span style="color:red">{{ items.nativePlace }}</span> -->
                                        <div style="color:red;width: 24vh;" v-html="items.nativePlace"></div>

                                    </div>
                                </div>
                                <div v-if="items.sl">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>司龄:</div>
                                        <!-- <span style="color:red">{{ items.sl }}</span> -->
                                        <div style="color:red;width: 24vh;" v-html="items.sl"></div>

                                    </div>
                                </div>
                                <div v-if="items.workUnit">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>工作单位:</div>
                                        <div style="color:red;width: 20vh;" v-html="items.workUnit"></div>
                                    </div>
                                </div>
                                <div v-if="items.projcetName">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>项目经历:</div>
                                        <div class="van-multi-ellipsis--l3" style="color:red;width: 20vh;" v-html="items.projcetName"></div>
                                    </div>
                                </div>
                                <div v-if="items.prize">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>奖项:</div>
                                        <div class="van-multi-ellipsis--l3" style="color:red;width: 24vh;" v-html="items.prize"></div>
                                    </div>
                                </div>
                                <div v-if="items.train">
                                    <div class="cadreInfo-fitful-bottom">
                                        <div>培训经历:</div>
                                        <div class="van-multi-ellipsis--l3" style="color:red;width: 20vh;" v-html="items.train"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "manageInfoCompon",
        props: {
            Fachlist: {
                type: Array,
                default: []
            },
            manInfoFlag: {
                type: Number,
                default: 1
            },
            firstFlag: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                defaultAvatar: null
            };
        },
        created() {
            this.defaultAvatar = require("@/assets/timg.jpg");
            this.Fachlist
        },
        methods: {
            manageInfoMethod(item) {
                this.$router.push({
                    name: "cadreArchivesInfo",
                    params: {
                        managerInfo: item
                    }
                });
            },
            faMore() {
                this.$emit("institutionsChild", {});
            }
        }
    };
</script>

<style lang="stylus">
    .headbgc {
        height: 30%;
        background-image: linear-gradient(#ff3334, #fd9d9d);
    }

    .header {}

    .cadreInfo-bgccolor {
        background-color #fff // padding 5px 0 5px 0
        border-radius: 16px;
    }

    .cadreInfo-marginsides {
        border-radius: 5px;
        margin-top: 10px;
    }

    .cadreInfo-myContents {}

    .cadreInfo-box {
        font-size: 14px;
        background-color: #fff;
        line-height: 4.5vh;
        margin-top: 10px;
        padding: 0 3vh;
        border-bottom: 1px solid #ccc;
        // font-size: 14px;
        // // color #8f8f94
        // // padding: 5px 0 5px 10px;
        // background-color: #fff;
        // // border-top-left-radius 16px
        // // border-top-right-radius 16px
        // // height 17vh
        // line-height: 4.5vh;
        // margin-top: 10px;
        // // background: url('../../assets/Snipaste_2020-12-30_13-20-40.png') no-repeat;
        // // background-size: cover;
        // // // background-position: center center;
        // // background-position: left;
        // padding: 0 7vh;
    }

    .cadreInfo-imgpps {
        // float: left;
        border-radius: 50%;
        border: 1px solid #eee;
        width: 50px;
        height: 50px;
        vertical-align: middle;
    }

    .cadreInfo-resuName {
        color: #3E4146;
        font-weight: 700;
        font-size: 16px;
        padding-left: 5px;
    }

    .cadreInfo-resuNames {
        color: #ccc;
        font-size: 14px;
        padding-left: 5px;
    }

    .cadreInfo-resuNamess {
        color: black;
        font-size: 14px;
        padding-left: 5px;
        width: 22vh;
    }

    .cadreInfo-resuNamesss {
        color: black;
        font-size: 14px;
        margin-left: 3vh;
        width: 15vh;

    }

    .cadreInfo-mangetouxiang {
        display: flex;
        flex-direction: column;
    }

    .cadreInfo-fitful-bottom {
        padding-left: 5px;
        margin-bottom: 2vh;
        display: flex;
        justify-content: flex-start;
    }
</style>
