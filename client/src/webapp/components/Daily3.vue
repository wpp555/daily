<template>
    <div>
      <group title="点击保存按钮即可保存">
        <cell :title="n.value" @click.native="showPlugin(n.key)" :key="i"  v-for = '(n,i) in numList'>
          <x-icon type="ios-close-outline" size="40" class="cell-x-icon" @click.stop="console(n.key)"></x-icon>
        </cell>
      </group>
      <div style="padding:15px;">
          <flexbox >
            <flexbox-item>
              <x-button plain type="primary" style="border-radius:99px;" @click.native="add">新增</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button  type="primary" style="border-radius:99px;" @click.native="btnClick">保存</x-button>
            </flexbox-item>
          </flexbox>
      </div>
      
      
    </div>
  </template>
  
  
  
  <script>
  import {  XButton , CheckIcon ,Group, Cell ,Flexbox, FlexboxItem,} from 'vux'
  export default {
    components: {
      XButton,CheckIcon,Group, Cell ,Flexbox, FlexboxItem,
    },
    data () {
      return {
            numList:[],
            demo2:true,
      }
    },
    methods: {
        // 点击删除选项
        console(e){
            const _this = this;
            let a = '';     //删除的内容
            let b = -1;     //确定删除的项
            this.numList.forEach((ele,i) => {
                if(ele.key==e){
                    a = ele.value;
                    b = i;
                }
            });
            this.$vux.confirm.show({
                title: '确定删除吗？',
                content: a,
                onConfirm () {
                    _this.numList.splice(b,1);
                }
            })
        },
        // 点击修改签到名
        showPlugin(e) {
            const _this = this;
            let a = '';     // 弹窗打开内容
            this.numList.forEach(ele => {
                if(ele.key==e){
                    a = ele.value;
                }
            });
            this.$vux.confirm.prompt('不能为空', {
                title: '更改签到名',
                onShow () {
                    _this.$vux.confirm.setInputValue(a)
                },
                onHide () {
                    // console.log('弹窗消失');
                },
                onCancel () {
                    // console.log('取消')
                },
                onConfirm (msg) {
                    msg = msg.trim();   // 防止不输入
                    if(msg){
                        for(var i=0;i<_this.numList.length;i++){
                            if(_this.numList[i].key == e){
                                _this.numList[i].value = msg;
                                return;
                            };
                        }
                    }else{
                        _this.$vux.toast.text("内容无效");
                    }
                }
            });
        },
        // 新增
        add(){
            if(this.numList.length>9){
                this.$vux.toast.text("最多10个选项");
                return;
            }
            const _this = this;
            this.$vux.confirm.prompt('选项'+(_this.numList.length+1), {
                title: '新增选项',
                onConfirm (msg) {
                    msg = msg.trim();   // 防止不输入
                    if(msg){
                        var obj = {};
                        obj.key = Math.random();    // 防止key重复
                        obj.value = msg;
                        _this.numList.push(obj);
                        _this.$vux.toast.text("保存后生效");
                    }else{
                        _this.$vux.toast.text("内容无效");
                    }
                }
            })
        },
        // 请求列表
        load(){
            var list = {
                list1:"123451",
                list2:"123452",
                list3:"123453",
                list4:"123454",
                userID:"001"
            };
            this.numList = objKey(list)
            
            console.log(this.numList);
        },
        // 点击保存
        btnClick(){
            var obj = {};
            for(var i=0;i<this.numList.length;i++){
                obj["list"+(i+1)] = this.numList[i].value;
            }
            console.log(obj);
        }
    },
    mounted(){
        this.load();
    }
}
</script>
<style scoped>
.cell-x-icon {
  fill: #F70968;
}
</style>