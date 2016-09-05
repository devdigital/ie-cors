import path from 'path'
import { webpackService } from 'dd-webpack-service'

const isDevelopment = process.env.NODE_ENV !== 'production'

const config = webpackService.getConfig({
  isDevelopment,
  port: 3000,
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
  },
  html: {
    title: 'IE CORS Sample',
    appMountId: 'root',
  },
})

webpackService.run(config)
