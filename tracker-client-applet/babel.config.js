// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md

const path = require('path')
const {injectRequireFile} = require('@trackerjs/babel-preset-tracker-applet')

const inject = (fileContext) => {
  const defineAppConfigMethod = 'function defineAppConfig(config) { return config }'
  return `${defineAppConfigMethod}\n${fileContext}`
}

const appConfig = injectRequireFile(path.resolve(__dirname, './src/app.config.ts'), inject)

module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'webpack5',
    }],
    ['@trackerjs/babel-preset-tracker-applet', {appConfig}],
  ],
}
