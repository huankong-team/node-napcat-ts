import { CQWebsocket } from './src/index.js'

const debug = true

const bot = new CQWebsocket(
  {
    protocol: 'ws',
    host: 'ws.example.com',
    port: 80,
    accessToken: 'accessToken'
  },
  debug
)

bot.on('socket.apiConnecting', function () {
  console.log(`连接中[/api]`)
})

bot.on('socket.eventConnecting', function () {
  console.log(`连接中[/event]`)
})

bot.on('socket.apiError', function (err) {
  console.log(`连接失败[/api]`)
  console.dir(err, { depth: null })
})

bot.on('socket.eventError', function (err) {
  console.log(`连接失败[/event]`)
  console.dir(err, { depth: null })
})

bot.on('socket.apiClose', function (err) {
  console.log(`连接断开[/api]`)
  console.dir(err, { depth: null })
})

bot.on('socket.eventClose', function (err) {
  console.log(`连接断开[/event]`)
  console.dir(err, { depth: null })
})

bot.on('socket.apiOpen', async function () {
  console.log(`连接成功[/api]`)
})

bot.on('socket.eventOpen', async function () {
  console.log(`连接成功[/event]`)
})

bot.on('api.preSend', function (params) {
  console.log('\n发送了一条请求')
  console.dir(params, { depth: null })
})

bot.on('message', async (context) => {
  console.log('\n收到了一条信息')
  console.dir(context, { depth: null })
})

bot.on('notice', async (event) => {
  console.log('\n收到了一条通知')
  console.dir(event, { depth: null })
})

bot.on('request', async (event) => {
  console.log('\n收到了一条请求')
  console.dir(event, { depth: null })
})

bot.connect()
