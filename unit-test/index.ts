import { qqHandler } from '../utils';

// 测试发送文本消息
async function testSendTextMessage() {
  try {
    // 方法1：直接发送文本字符串
    const result1 = await qqHandler.SendMessage('1036498144', '你好哈哈哈\n');
    console.log('发送文本消息结果:', result1);
    
    // 方法2：发送消息元素数组
    const result2 = await qqHandler.SendMessage('1036498144', [
      {
        type: 'text',
        data: {
          text: '你好哈哈哈\n'
        }
      }
    ]);
    console.log('发送消息元素数组结果:', result2);
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 执行测试
testSendTextMessage();
