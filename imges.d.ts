declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

//解决图片引入tsx会报错的问题（ts编译报类型错误）
//关于react中引入图片无法显示，提供三种解决方法：
//第一种 impor img form '../assets/imge.jpg' 作为模块引入
//第二种 利用 require 引入图片资源
//假如是利用 nginx 搭建的前后联调式的开发环境，只要打包的dist中有图片就行了，使用方式正常使用就行，无需引入或require
