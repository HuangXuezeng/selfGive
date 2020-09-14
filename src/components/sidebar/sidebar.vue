<template>
    <div>
        <router-view/>
        <van-sidebar v-model="activeKey" class="van-sidebar">
            <van-sidebar-item title="基本信息" to="searchInformation"/>
        </van-sidebar>
    </div>
</template>
<script>
import { Sidebar, SidebarItem } from 'vant'
export default {
  data () {
    return {
        activeKey: 0
    };
  }
}
</script>
<style lang="stylus" scoped>
    .van-sidebar{
        position fixed
        top 0
        left 0
        width 23%
    }
</style>