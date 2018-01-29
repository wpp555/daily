<template>
<div>
    <actionsheet 
        ref = 'demoObject'
        v-model="show" 
        :menus="menus" 
        show-cancel 
        @on-click-menu="exitClick"
    ></actionsheet>
    <div id="top">
        <x-header 
            :left-options="{showBack: false}"
            :right-options="{showMore: true}" 
            @on-click-more="show = true"
        >{{title}}</x-header>
    </div>
    <div style="height:40px"></div>
    
    <router-view @title='titleA'></router-view>
    <div style="height:200px"></div>
    <Navbar></Navbar>
</div>
</template>


<script>
import { XHeader ,Actionsheet ,Checklist ,XButton ,Divider} from 'vux';
import Navbar from '../components/Navbar.vue';
export default {
    data(){
        return {
            title:"签 到",
            // 遮罩层
            show:false,
            menus:{
                m4:"添加选项",
                m3:"更换头像",
                m2:"更换密码",
                m1:"退出登录"
            },
        }
    },
    components:{
        XHeader,Actionsheet, Checklist ,XButton ,Divider,Navbar
    },
    methods:{
        // 改变title
        titleA(e){
            this.title = e;
        },
        // 退出
        exitClick:function(e,k){
            if(e==='m1'){
                $.get('/users/exit')
                .done(data=>{
                    location.href = '#/login';
                    this.$vux.toast.text(data.msg);
                })
            }
        },
    }
}
</script>


<style scoped>
#top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
}
</style>