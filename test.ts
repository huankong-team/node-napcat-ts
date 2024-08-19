import { NCWebsocket } from './src/index.js'

const bot = new NCWebsocket(
  {
    protocol: 'ws',
    host: 'localhost',
    port: 3001
  },
  false
)

bot.on('socket.connecting', function (res) {
  console.log(`连接中#${res.reconnection.nowAttempts}`)
})

bot.on('socket.error', function (err) {
  console.log(`连接失败#${err.reconnection.nowAttempts}`)
  console.dir(err, { depth: null })
})

bot.on('socket.close', function (err) {
  console.log(`连接断开#${err.reconnection.nowAttempts}`)
  console.dir(err, { depth: null })
})

bot.on('socket.open', async function (res) {
  console.log(`连接成功#${res.reconnection.nowAttempts}`)
})

bot.on('api.preSend', function (params) {
  console.log('\n发送了一条请求')
  console.dir(params, { depth: null })
})

bot.on('message', async (context) => {
  console.log('\n收到了一条信息')
  console.dir(context, { depth: null })
  context.message.forEach((item) => {
    if (item.type === 'text' && item.data.text === '233') {
      bot.send_msg({ ...context, message: 'Ciallo～(∠・ω< )⌒☆' })
    }
  })
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
