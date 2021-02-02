<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "app",
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            // debugger
            // if (sessionStorage.getItem("store")) {
            //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            // }

            // //在页面刷新时将vuex里的信息保存到sessionStorage里
            // window.addEventListener("beforeunload", () => {
            //   debugger
            //     sessionStorage.setItem("store", JSON.stringify(this.$store.state))
            // })
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0px;
        padding: 0px;
        font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, SimSun, sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }

    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }

    a {
        color: #56a9ff;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    #nprogress .bar {
        height: 3px !important;
        background: #56a9ff !important; //自定义颜色
    }
</style>
