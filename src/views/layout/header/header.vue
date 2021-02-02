<template>
    <div>
        <el-header id="header" style="height:80px">
            <div>
                <span class="hideAside" @click="collapse"><i class="fa fa-indent fa-lg"></i></span>
                <img src="../../../assets/7CB55E94-0274-4689-9DB0-A9E1A10BF8AE.png" alt="" style="height:70px;width:70px;vertical-align: middle;">
            </div>
            <div>
                <el-input v-model="inputSearch" placeholder="请输入内容" style="width: 300px;height: 50px; margin: 15px;">

                </el-input>
            </div>
            <ul class="personal">
                <li class="icon"><img style="min-height:70px;min-width:70px" :src="$store.getters.selfInfo.information.photo" /></li>
                <li>
                    <ul class="personal-information">
                        <li>姓名:{{$store.getters.selfInfo.information.a0101}}</li>
                        <li>岗位:{{$store.getters.selfInfo.information.post}}</li>
                        <li>部门:{{$store.getters.selfInfo.information.dept}}</li>
                        <li @click="handleCommand('logout')" style="color:blue">退出</li>
                    </ul>
                </li>
                <li class="fullScreen" @click="fullScreen">
                    <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"><i class="fa fa-arrows-alt fa-lg"></i></el-tooltip>
                </li>
            </ul>
        </el-header>
        <tabNav></tabNav>
        <user-info v-if="dialogInfoVisible" :title="title" :dialogVisible="dialogInfoVisible" :userId="userId" @successCallback="successCallback" />
        <edit-password v-if="dialogPassVisible" :dialogVisible="dialogPassVisible" @editPwdCallback="editPwdCallback" />
    </div>
</template>
<script>
    import Cookies from "js-cookie"
    import langSelect from "../../../components/lang/langSelect"
    import tabNav from "./tabNav"
    import UserInfo from "../../../components/userForm/userInfo"
    import EditPassword from "../../../components/userForm/editPassword"

    export default {
        name: "Header",
        components: {
            EditPassword,
            tabNav,
            langSelect,
            UserInfo
        },
        data() {
            return {
                isfullScreen: true,
                avatar: "./static/images/icon.jpg",
                dialogInfoVisible: false,
                dialogPassVisible: false,
                title: "",
                userId: "",
                inputSearch: ""
            }
        },
        mounted() {
            this.collapse()
        },
        methods: {
            collapse() {
                this.$store.dispatch("collapse")
            },
            successCallback() {
                this.dialogInfoVisible = false
            },
            editPwdCallback() {
                this.dialogPassVisible = false
            },
            fullScreen() {
                if (this.isfullScreen) {
                    var docElm = document.documentElement
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen()
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen()
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen()
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen()
                    }
                    this.isfullScreen = false
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen()
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen()
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    }
                    this.isfullScreen = true
                }
            },
            handleCommand(command) {
                if (command === "info") {
                    this.dialogInfoVisible = true
                    this.title = "编辑信息"
                    // this.userId = this.$store.getters.info.uid
                } else if (command === "editPassword") {
                    this.dialogPassVisible = true
                } else if (command === "logout") {
                    Cookies.remove("token")
                    sessionStorage.clear();
                    location.reload()
                }
            }
        }
    }
</script>

<style lang="scss">
    $top: top;
    $bottom: bottom;
    $left: left;
    $right: right;
    $leftright: ($left, $right);

    %w100 {
        width: 100%;
    }

    %h100 {
        height: 100%;
    }

    %cursor {
        cursor: pointer;
    }

    html,
    body,
    #app,
    .el-container,
    #asideNav,
    ul.el-menu {
        @extend %h100;
    }

    @mixin set-value($side, $value) {
        @each $prop in $leftright {
            #{$side}-#{$prop}: $value;
        }
    }

    #header {
        max-height: 100px;
        line-height: 50px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        display: flex;
        justify-content: space-between;

        .hideAside {
            @extend %cursor;
        }

        .personal {
            display: flex;
            flex-direction: row;

            li {
                @include set-value(margin, 13px);
                font-size: 12px;
            }

            .fullScreen {
                @extend %cursor;
            }

            .el-dropdown-link {
                @extend %cursor;
            }

            .icon img {
                margin-#{$top}: 7px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                width: 40px;
                height: 40px;
            }
        }

        .personal-information {
            li {
                height: 20px;
            }
        }
    }
</style>
