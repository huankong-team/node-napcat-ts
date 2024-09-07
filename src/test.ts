import { NCWebsocket, Structs } from './index.js'

const bot = new NCWebsocket(
  {
    protocol: 'ws',
    host: 'localhost',
    port: 3001,
    accessToken: '' // 请填写你的access_token
  },
  true
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
  context.message.forEach(async (item) => {
    if (item.type !== 'text') return

    if (item.data.text === '233') {
      await bot.send_msg({ ...context, message: [Structs.text('Ciallo～(∠・ω< )⌒☆')] })
    } else if (item.data.text.startsWith('!')) {
      const arr = item.data.text.slice(1).split(' ')
      const commandName: any = arr[0]
      const args = JSON.parse(arr[1] ?? '{}')
      const res = await bot.send(commandName, args)
      await bot.send_msg({ ...context, message: [Structs.text(JSON.stringify(res))] })
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
