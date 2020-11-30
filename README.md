# wx-tonic
微信汤力 一个抓取微信公众号两个页面的工具


https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew

https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A

---

主要内容位置： src/


1. 初始化项目，拉取依赖

    ```
    yarn
    ```

    或者


    ```
    npm i
    ```

2. 批量抓取整站

    ```
    node catch.js
    ```

    可能会卡住和遗漏页面，这个 bug，将（或许。。。）在下一个版本修复 


3. 抓取指定页面

    ```
    node catch.js 0 1
    ```

    第一个数字为第几个微信公众号汇总页面，对应 casefile(n)/ 

    第二个数字为第几个 case 页面，对应 casefile(n)/case(n)/

    > 注意：每个 case 应该包含一个 img/ 一个 index.html 如果缺少请重新抓取！



## 启动本地开发服务器，方便查看效果和测试

但是这没有任何作用，gulp 仅仅作为本地开发服务器使用

```
gulp
```
