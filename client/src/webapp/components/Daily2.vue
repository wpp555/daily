<template>
<div>
    <h1>新建</h1>
    <p v-for='l in list'>{{l.key}} {{l.value}}</p>
</div>
</template>


<script>
export default {
    data(){
        return {
            list:[],
        }
    },
    methods:{
        readly:function(){
            $.get("/daily/save")
            .done(res=>{
                if(res.err==0){
                    for(var Key in res.data){
                        if(Key.indexOf('list')===0){
                            var obj = {key: Key, value: res.data[Key]};
                            this.list.push(obj);
                        }
                    }
                }
            })
            .fail(err=>{
                console.log(err);
            })
            .always(function(){
                console.log("comcpalr")
            })
        },
        load(){
            var data = {
                list10:{
                    a:1,
                    b:2
                }
            }
            $.post("/daily/save",data)
            .done(res=>{
                
                console.log(res);
            })
            .fail(err=>{
                console.log(err);
            })
            .always(function(){
                console.log("comcpalr")
            })
        }
    },
    mounted(){
        this.$emit('title','新 建');

        this.readly();
        this.load();
    }
}
</script>


<style scoped>

</style>