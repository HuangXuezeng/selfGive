export default {
    state: {
        selfInfo: "" // 每次刷新都要通过token请求个人信息来筛选动态路由
    },
    mutations: {
        selfGetInfo(state, info) {
            state.selfInfo = info
            // localStorage.setItem("info", JSON.stringify(store.getters.info))
        },
        selfSetRole(state, options) { // 切换角色，测试权限管理
            state.selfInfo = {
                information: options,
                // permissions: options.permissions
            }
            // localStorage.setItem("info", JSON.stringify(store.getters.info))
            // store.dispatch("newRoutes", options.role)
            // router.addRoutes(store.getters.addRouters)
        }
    },
    actions: {
        selfGetInfo({
            commit
        }, token) {
            commit("selfGetInfo", token)
        },
        selfSetRole({
            commit
        }, options) {
            // 权限测试
            commit("selfSetRole", options)
        }
    }
}
