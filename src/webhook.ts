import axios from 'axios';
import { logger } from './logger.js';
import {config} from "./config.js";


// 从环境变量中获取机器人的 Webhook URL
const webhookUrl = config.webhook;
const nodename = config.nodename;

if (!webhookUrl) {
  logger.error('ROBOT_WEBHOOK_URL 环境变量未设置');
  throw new Error('ROBOT_WEBHOOK_URL 环境变量未设置');
}

// 发送 Webhook 通知的函数
export async function sendWebhookNotification(message: string): Promise<void> {
  try {
    // 构建请求体
    const payload = {
      msg_type: 'text',
      content: {
        text: nodename + ' ' + message,
      }
    };
    // 发送 POST 请求
    await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    logger.info('飞书 Webhook 通知发送成功');
  } catch (error) {
    logger.error('发送飞书 Webhook 通知时出错:', error);
  }
}
