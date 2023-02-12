import bot from './bot';
import { UserTimersSettings } from './types';
import { i18n } from './i18n';
import { getToken } from './auth';
import { errorHandler } from './utils';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import dynamodb from './client';

const dbErrorHandler = errorHandler('Database exception');

export const sendNotification = ({ notify, language_code, user_id }: UserTimersSettings) => {
  if (!notify) return;

  const token = getToken({ id: user_id });

  const url = new URL(String(process.env.WEB_APP_URL));
  url.searchParams.append('token', token);

  const t = i18n(language_code);

  bot.sendMessage(user_id, t('hawaryou')!, {
    reply_markup: { inline_keyboard: [[{ text: t('diary'), web_app: { url: url.toString() } }]] },
  });
};

export const findUsersByTimer = async (time: string) => {
  try {
    const input = new QueryCommand({
      TableName: 'Users',
      IndexName: 'InvertedIndex',
      KeyConditionExpression: 'SK = :sk',
      FilterExpression: 'contains(reminder_timers, :t)',
      ExpressionAttributeValues: marshall({
        ':sk': 'reminders',
        ':t': time,
      }),
      Select: 'SPECIFIC_ATTRIBUTES',
      ProjectionExpression: 'user_id, notify, time_offset',
    });

    const { Items } = await dynamodb.send(input);

    return Items?.length ? (Items.map(user => unmarshall(user)) as UserTimersSettings[]) : [];
  } catch (error) {
    dbErrorHandler(error, findUsersByTimer.name, {
      time,
    });
    return [];
  }
};
