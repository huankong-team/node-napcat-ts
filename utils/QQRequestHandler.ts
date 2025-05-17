import { HttpClient } from './http';
import 'dotenv/config';

/**
 * QQ消息元素接口
 */
interface MessageElement {
    type: string;
    data: Record<string, any>;
}

/**
 * 文本消息元素接口
 */
interface TextMessageElement extends MessageElement {
    type: 'text';
    data: {
        text: string;
    };
}

/**
 * QQ私聊消息请求参数
 */
interface SendPrivateMessageParams {
    user_id: string;
    message: MessageElement[];
    auto_escape?: boolean;
}

/**
 * QQ消息响应结果
 */
interface QQBotResponse {
    status: string;
    retcode: number;
    data: any;
    message?: string;
}

/**
 * QQ请求处理工具类
 */
export class QQRequestHandler {
    private httpClient: HttpClient;
    private baseUrl: string;

    constructor() {
        // 从环境变量获取服务器地址
        const serverIP = process.env.SERVER_IP || '127.0.0.1';
        const serverPort = process.env.SERVER_PORT || '5050';
        this.baseUrl = `http://${serverIP}:${serverPort}`;

        // 创建HTTP客户端
        this.httpClient = new HttpClient(this.baseUrl, {
            'Content-Type': 'application/json'
        });
    }

    /**
     * 创建文本消息元素
     * @param text 消息文本内容
     * @returns 文本消息元素
     */
    public createTextMessage(text: string): TextMessageElement {
        return {
            type: 'text',
            data: {
                text
            }
        };
    }

    /**
     * 发送私聊消息
     * @param userId 目标用户QQ号
     * @param message 消息内容或消息元素数组
     * @param autoEscape 是否自动转义，默认false
     * @returns 发送结果
     */
    public async SendMessage(
        userId: string,
        message: string | MessageElement[],
        autoEscape: boolean = false
    ): Promise<QQBotResponse> {
        // 如果消息是字符串，转换为文本消息元素数组
        const messageElements = typeof message === 'string'
            ? [this.createTextMessage(message)]
            : message;

        // 构造请求参数
        const params: SendPrivateMessageParams = {
            user_id: userId,
            message: messageElements,
            auto_escape: autoEscape
        };

        try {
            // 发送POST请求
            const response = await this.httpClient.post<QQBotResponse>(
                '/send_private_msg',
                params,
                // TODO token校验失败
                {
                    headers: {
                        token: process.env.NC_ACCESS_TOKEN || ''
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('发送QQ私聊消息失败:', error);
            throw error;
        }
    }
}

// 创建默认实例
const qqHandler = new QQRequestHandler();
export default qqHandler;
