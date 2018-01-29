<template>
<div>
    <h1 class="h1">注册</h1>
    <form id="registForm">
        <group title="注册信息" >
            <x-input title="名字" name="username" placeholder="2-8位汉字字母数字"  :is-type="nameReg" v-model="username"></x-input>
            <x-input title="邮箱" name="emails" placeholder="找回密码唯一方式"  :is-type="emailReg" v-model="email"></x-input>
            <x-input title="密码" name="username" placeholder="2-8位数字字母" :is-type="pswReg" type="password" v-model="password"></x-input>
            <x-input title="密码" name="username" placeholder="再次输入密码" type="password" v-model="password2" :equal-with="password"></x-input>
            <x-input title="验证码" class="weui-cell_vcode" name="yzm" v-model="yzm" >
                <img @click="koaCaptcha=koaCaptcha+'?'+Math.random()" slot="right" class="weui-vcode-img" :src="koaCaptcha">
            </x-input>
        </group>
        <br>
    </form>
    <x-button type="primary" @click.native="btnClick">注&emsp;册</x-button>
</div>
</template>


<script>
import { XInput, Group, XButton } from 'vux'
export default {
    data(){
        return {
            username:'',
            email:'',
            password: '',
            password2: '',
            yzm:'',
            koaCaptcha:'/api/captcha',
        }
    },
    components: {
        XInput,
        XButton,
        Group,
    },
    methods:{
        // 注册
        btnClick(){
            if(!this.nameReg(this.username).valid){
                this.$vux.toast.text(this.nameReg(this.username).msg);
                return;
            }
            if(!this.emailReg(this.email).valid){
                this.$vux.toast.text(this.emailReg(this.email).msg);
                return;
            }
            if(!this.pswReg(this.password).valid){
                this.$vux.toast.text(this.pswReg(this.password).msg);
                return;
            }else{
                if(this.password!==this.password2){
                    this.$vux.toast.text("确认密码错误");
                    return;
                }
            }
            if(!this.yzmReg(this.yzm).valid){
                this.$vux.toast.text(this.yzmReg(this.yzm).msg);
                return;
            }
            var data = {
                username:this.username,
                password:this.password,
                email:this.email,
                yzm:this.yzm
            }
            $.ajax({
                type:'post',
                url:'/users/add',
                data:data,
            })
            .done((data)=>{
                this.$vux.toast.text(data.msg);
                if(!data.err){
                    location.href="#/daily";
                    writeCookie("username", this.username, 24);
                }else{
                    this.koaCaptcha='/api/captcha?'+Math.random();
                }
            })
            .fail(()=>{
                this.koaCaptcha='/api/captcha?'+Math.random();
                this.$vux.toast.text("未知错误，请刷新重试");
            })
            .always(function(){
                console.log("请求已经完成");
            })
        },
        nameReg(e){
            var reg = /^([\u4e00-\u9fa5]|[A-Za-z0-9]){2,8}$/;
            if(reg.test(e)){
                return {valid:true}
            }else{
                return {valid:false, msg:"用户名2-8位"}
            }
        },
        pswReg(e){
            var reg = /^\w{2,8}$/;
            if(reg.test(e)){
                return {valid:true}
            }else{
                return {valid:false, msg:"密码2-8位"}
            }
        },
        emailReg(e){
            var reg = /\w{1,}@\w{1,}\.\w{1,5}/;
            if(reg.test(e)){
                return {valid:true}
            }else{
                return {valid:false,msg:"邮箱格式错误"}                
            }
        },
        yzmReg(e){
            var reg = /\w{4,6}/;
            if(reg.test(e)){
                return {valid:true}
            }else{
                return {valid:false,msg:"验证码错误"}                
            }
        },
        settime(){
            setTimeout(() => {
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);
                $("#regist")[0].dispatchEvent(e)
            }, 10);
        }
    },
    mounted:function(){
        this.settime();
    }
}
</script>


<style scoped>

</style>