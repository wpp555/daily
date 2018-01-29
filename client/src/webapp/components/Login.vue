<template>
<div>
    <h1 class="h1">登录</h1>
    <group title="登录" >
        <x-input title="名字" name="username" placeholder="输入您的帐号 " v-model.trim="username"></x-input>
        <x-input title="密码" name="psw" placeholder="输入您的密码" type="password" v-model.trim="password"></x-input>
    </group>
    <checklist label-position="left" :options="mima"  v-model="a"></checklist>
    
    <div style="padding:15px;">
        <x-button type="primary" @click.native="btnClick">登&emsp;录</x-button>
    </div>
</div>
</template>


<script>
import { XInput, Group, XButton ,Checklist} from 'vux'
export default {
    data(){
        return {
            mima:[{key:'name',value:'记住密码'}],
            username:'',
            password:'',
            yzm:'',
            a:[]
        }
    },
    components: {
        XInput,
        XButton,
        Group,
        Checklist
    },
    methods:{
        btnClick(){
            var num = this.a.length;
            if(this.username&&this.password){
                var data = {
                    username:this.username,
                    password:this.password
                }
                $.ajax({
                    url:'/users/add',
                    type:'get',
                    data:data
                })
                .done(data=>{
                    this.$vux.toast.text(data.msg);
                    if(!data.err){
                        location.href="#/daily";
                        writeCookie("username", this.username, 24);
                        if(num){
                            var psw = pwdString.encrypt(this.password,"666");
                            writeCookie("password", psw, 24);
                            writeCookie("mm", true, 24);
                        }else{
                            writeCookie("password", false, -2);
                            writeCookie("mm",false , -2);
                        }
                    }
                })
                .fail(()=>{
                    this.$vux.toast.text("未知错误，请刷新重试");
                })
                .always(function(){
                    console.log("请求已经完成");
                })
            }else{
                this.$vux.toast.text("请输入帐号信息");
            }
        },
        settime(){
            setTimeout(() => {
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);
                $("#login")[0].dispatchEvent(e)
            }, 10);
        },
        cookie(){
            // // 设置
            // writeCookie("myCookie", "my name", 24);
            // // 获得
            // alert( readCookie("myCookie") );
            // // 删除
            // writeCookie("myCookie", "my name", -11);
            this.username = readCookie("username");
            // 解密
            var psw = pwdString.decrypt(readCookie("password"),"666");
            this.password = psw;
            if(readCookie("mm")){
                this.a = ['name'];
            }else{
                this.a = [];
            }
        },
    },
    mounted:function(){
        this.settime();
        this.cookie();
    }
}

</script>


<style scoped>
input:-webkit-autofill, 
textarea:-webkit-autofill, 
select:-webkit-autofill { 
      -webkit-box-shadow: 0 0 0 1000px white inset; 
}
input[type=text]:focus, input[type=password]:focus, textarea:focus {
     -webkit-box-shadow: 0 0 0 1000px white inset; 
}
</style>