# 一个基于webpack4 + babel7 + ejs 的多页开发环境

## 安装

`npm i`

## 开发

`npm start`

打开浏览器 http://localhost:8888

## 发布生产

`npm run build`

资源打包到 dist 目录

## eslint

`npm run lint`

## 语言环境

支持 es6 

支持 sass

模板使用 ejs 一种嵌入式js模板引擎，可以编译为html

## 关于框架使用

**问：在js里面如何导入第三方类库**

答：首先使用npm install jquery 安装好你想使用的类库，然后在js里面使用es6语法导入：`import $ from 'jquery';`

**问：在sass里面如何正确引用assets资源**

答：本框架会以shared/assets作为服务器的assets根目录，所以在sass里面引用图片或者字体是以/assets/开头的绝对路径，例如：

```
@font-face {
  font-family: "sans";
  src: url("/assets/fonts/SourceHanSansCN-Normal.otf");
}

background:url('/assets/images/index/banner-left.jpg') no-repeat center center;

```

**问：css在页面中如何引入**

答：和导入ts一样以模块的形式在ts里面导入，框架编译会自动将css插入到头部

```
import './shared/styles/styles.scss';

import './shared/styles/index.scss';

```

**问：公共html是否可以独立出来**

答：框架整合了ejs模板，项目模板都是.ejs为后缀，在ejs里面可以这样引入公共的html文件

```

<% include common/header.html %>

```

**问：公共js如何处理**

答：可以把公共的ts提到common下面，在页面入口ts里面可以引入，框架在打包的时候会对重复引入的ts作合并处理，例如，在index.js里面需要引入common.js

```

import './common/common';

```