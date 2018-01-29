<template>
<div >
    <div id="box">
      <button-tab>
        <button-tab-item  href="#/" id="login">登录</button-tab-item>
        <button-tab-item  href="#/regist" id="regist">注册</button-tab-item>
      </button-tab>
    </div>
    <router-view></router-view>
</div>
</template>


<script>
import { ButtonTab, ButtonTabItem, Divider } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    
  },
  methods: {
    
  },
  data () {
    return {
      demo01: 0
    }
  },
  mounted(){

  }
}
</script>


<style scoped>
#box{
  margin: 100px 0 50px 0;
  padding: 15px;
}
a{
  text-decoration: none;
}
</style>