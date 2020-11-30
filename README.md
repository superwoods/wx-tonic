# wx-tonic
微信汤力 一个抓取微信公众号两个页面的工具


https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew

https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A

---

主要内容位置： src/

## 使用方法

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

    ps：会卡住和遗漏页面，这个 bug （或许 😐 ）将在下一个版本修复 


3. 抓取指定页面

    ```
    node catch.js 0 1
    ```

    第一个数字 0（=第二个）1（=第一个） 微信公众号总页面，对应文件夹 casefile(n)/ 

    第二个数字为第几个 case 页面，对应文件夹 casefile(n)/case(n)/

    > 注意：每个 case 应该包含一个 img/ 一个 index.html，img/ 下应该有 1-x 个页面，img 序号不是从第1个开始或者缺少，请重新抓取！



## 启动本地开发服务器，方便查看效果和测试

但这是没有任何编译和压缩配置的，gulp 仅仅作为本地开发服务器使用

```
gulp
```

## 其他文件

set-page.js 和 jq.js 用于修复抓取之后的 case/index.html 因为他们会有不能显示 img 的 bug

