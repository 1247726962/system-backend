const path = require('path'); // 处理绝对路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//预定义模板插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//使输出的css文件以单独的文件存在
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

//本地服务器运行配置
const devServer = {
  // contentBase: path.join(__dirname, '/dist'), // 本地服务器所加载文件的目录
  // inline: true, // 文件修改后实时刷新
  hot: true,
  port: '8088', // 设置端口号为8088
  open: true,
  https: true,//开启使用https协议，https协议比http协议更安全
  historyApiFallback: true, //不跳转
  client: {
    overlay: false
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true
    },
    '/blog': {
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true
    },
  }
}



module.exports = (env, argv) => {

  const { mode } = env;

  var config = {
    ...(mode === 'serve' ? { devServer } : {}),
    // watch: false,//开启之后生产模式也可以监听文件变化
    // mode: 'development',
    entry: path.join(__dirname, '/src/index.tsx'), // 入口文件
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',//懒加载，组件
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"], // 配置ts文件可以作为模块加载
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 2
      },
    },
    plugins: [
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
      new HtmlWebpackPlugin({
        template: 'index.html',//以index.html为模板
        // favicon: 'favicon.png',
        minify: { //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"],
          // use: [{
          //   loader:'babel-loader',
          //   options: {
          //     // presets: ["env", "react", 'stage-0'],
          //     plugins: [
          //       ['import', { libraryName: 'antd', style: 'css' }]
          //     ]
          //   }
          // }, "ts-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',//webpack5内置图片处理模块
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024//小于10kb的图片被转换成base64字符串
            }
          },
          generator: {
            filename: 'images/[hash][ext][query]'
          },
          exclude: /node_modules/
        }
      ]
    }
  }

  if (mode === 'build') {
    // const option = {
    //   watch: false,
    //   mode: 'development',
    // }
    config.mode = 'production' //生产压缩
    config.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin()) //生成依赖图的插件
  }
  if (mode === 'serve') {
    config.mode = 'development' //开发模式
  }
  if (mode === 'watch') {
    config.mode = 'development'
    config.watch = true
  }

  return config

}