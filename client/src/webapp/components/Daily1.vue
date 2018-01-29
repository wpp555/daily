<template>
    <div>  
        <!-- 内容 -->
        <div id="content" ref="content" style="display:none;min-height:0px">
            <checklist  
                title="未签到" 
                labelPosition='left'
                :options="objectList1" 
                v-model="objectListValue"
                v-if='each1'
            ></checklist>
            <div style="padding:15px;" v-if='each1'>
                <x-button type="primary" @click.native="saveClick">保存信息</x-button>
            </div>
            <div style="padding:15px;" v-if='each3'>
                <x-button type="primary" @click.native="$vux.toast.text('明天再来');">今日已全部打卡</x-button>
            </div>
            <checklist 
                title="已签到" 
                labelPosition='left'
                :options="objectList2" 
                v-model="objectListValue2" 
                disabled
                v-if='each2'
            ></checklist>
        </div>
    </div>
</template>


<script>
import { Checklist ,XButton ,Divider} from 'vux'
export default {
    data(){
        return {
            objectList: [], //所有的列表
            objectListValue2:[],  //所有的列表
            objectList1:[], //未打卡
            objectList2:[], //已打卡
            objectListValue:[],   //dianji选中提交
            each1:true,
            each2:true,
            each3:false,
        }
    },
    components:{
        Checklist ,XButton ,Divider
    },
    methods:{
        // 请求列表
        creat(){
            $.get("/daily/day")
            .done(data=>{
                if(data.err==5){
                    this.$vux.toast.text(data.msg);
                    location.href = "#/login";
                    return;
                }
                if(data.data.cData){
                    this.objectList=[];
                    this.objectListValue2=[];
                    this.objectList1=[];
                    this.objectList2=[]; 
                    this.objectListValue=[];
                    for(var Key in data.data.cData){
                        if(Key.indexOf('list')===0){
                            this.objectListValue2.push(Key);
                            var obj = {key: Key, value: data.data.cData[Key]};
                            this.objectList.push(obj);
                        }
                    }
                    if(data.data.data){
                        this.objectList2 = [];
                        this.objectList1 = [];
                        for(var i=0;i<this.objectList.length;i++){
                            if(data.data.data[this.objectList[i].key]){
                                this.objectList2.push(this.objectList[i]);
                            }else{
                                this.objectList1.push(this.objectList[i]);
                            }
                        }
                        this.each2 = true;
                        if(this.objectList2.length==6){
                            this.each1 = false;
                            this.each3 = true;
                            this.$vux.toast.text("您今天已经全部签到");
                        }
                    }else{
                        this.objectList1 = this.objectList;
                        this.each1 = true;
                        this.each2 = false;
                        this.$vux.toast.text("您今天还未签到");
                    }
                    $("#content").css('display','none');
                    setTimeout(() => {
                        $("#content").slideToggle(2000);
                    }, 10);
                    
                }else{    
                    // 新建签到项
                    console.log(data.data);
                }
            })
            .fail((err)=>{
                this.$vux.toast.text("未知错误，请刷新重试");
            })
        },
        
        // 保存
        saveClick(){
            
            if(this.objectListValue.length<1){
                this.$vux.toast.text("请先选择打卡");
                return;
            }
            var obj = {};
            for(var i=0;i<this.objectListValue.length;i++){
                obj[this.objectListValue[i]]=1;
            }
            $.post("/daily/day",obj)
            .done(data=>{
                this.$vux.toast.text(data.msg);
                if(data.err==5){
                    location.href = "#/login";
                }
                if(data.err==0){
                    this.creat();
                    // document.body.scrollTop = 0;
                }
            })
            .fail((err)=>{
                this.creat();
                this.$vux.toast.text("未知错误，请刷新重试");
            })
        },
        
    },
    mounted:function(){
        this.$emit('title','签 到');
        this.creat();
        
    }
}
</script>


<style scoped>

</style>