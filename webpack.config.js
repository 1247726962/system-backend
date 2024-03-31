const path = require('path') // 处理绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin');//预定义模板插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//使输出的css文件以单独的文件存在
module.exports = {
  watch:true,
  mode: 'development',
  // mode: 'production',//生产压缩
  entry: path.join(__dirname, '/src/index.tsx'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
    filename: 'bundle.js' //打包后输出文件的文件名
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 配置ts文件可以作为模块加载
  },
  // optimization: {
  //   minimizer: [
  //     new CssMinimizerPlugin(),
  //   ],
  // },//dist中的css是否被压缩
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',//以index.html为模板
      // favicon: 'favicon-16x16.png',
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new MiniCssExtractPlugin()
  ],
  //本地服务器运行
  devServer: {
    hot: true,
    open: true,
    https: true,//开启使用https协议，https协议比http协议更安全
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/dist'), // 本地服务器所加载文件的目录
    port: '8088', // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, //不跳转
    proxy: {
      '/api': {
          target: 'http://121.199.60.80:3000',
          secure: false, 
          changeOrigin: true
      }
    }
  },
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
          filename: 'img/[hash][ext][query]'
        }
      }
    ]
  }
}