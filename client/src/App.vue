<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}



function getClientInfo(){  
  var userAgentInfo = navigator.userAgent;  
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
  var agentinfo = null;  
  for (var i = 0; i < Agents.length; i++) {  
      if (userAgentInfo.indexOf(Agents[i]) > 0) { agentinfo = userAgentInfo; break; }  
  }  
  if(agentinfo){
    console.log("webapp");
    console.dir(location);
  }else{//pc端跳转道一下链接
      console.log("pc");
  }     
}
//调用示例
// getClientInfo()        
</script>

<style scoped>

</style>
