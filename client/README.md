# pp

> 似花还似非花

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#关于bae运行问题
**首先获得BAE**
*	http://www.cnblogs.com/shamoyuu/p/node_bae.html 大佬指点迷津
*	基础版bae只支持4.4.4，足够了
*	把bae上项目地址clone下来（下载和上传需要百度验证）
*	文件下载后可以不看里面内容，直接删除，然后添加你写的代码，或者直接写
**	我用的express生成的项目	mongooDB数据库**
*	需要给bin文件夹的www文件增加一个js的扩展名，改成www.js
*	需要设置package.json文件里start的属性为"node --harmony ./bin/www.js"
>	是因为BAE基础版启动的时候，必须是一个js文件。加--harmony是让BAE支持ES6的语法。
*	端口号最好是18080
``	数据库地址是 很麻烦，不记得怎么弄呢``
*	上传可能会遇见文件大不能上传，百度解决
*

**签到项目争取写到数据库中，可以进行更改，新增