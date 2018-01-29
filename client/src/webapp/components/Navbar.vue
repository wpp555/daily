<template>
<div id="navbar">
    <tabbar>
    <!-- <tabbar-item>
        <img slot="icon" src="../../../static/img/index1.png">
        <span slot="label">Wechat</span>
    </tabbar-item> -->
    <tabbar-item link="/daily">
        <img slot="icon" src="../../../static/img/index2.png">
        <span slot="label">签到</span>
    </tabbar-item>
    <tabbar-item link="/daily2">
        <img slot="icon" src="../../../static/img/index5.png">
        <span slot="label">新建</span>
    </tabbar-item>
    <tabbar-item link="/daily3">
        <img slot="icon" src="../../../static/img/index4.png">
        <span slot="label">设置</span>
    </tabbar-item>
    </tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
}
}
</script>
<style scoped>
    a{
        text-decoration: none;
    }
    #navbar{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
    }
</style>