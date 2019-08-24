// 定义目录
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
// vue目录
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
// 定义启动的端口号
app.listen(8082)
