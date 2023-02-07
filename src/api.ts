import bot from './bot';
import { UserTimersSettings } from './types';
import { i18n } from './i18n';
import { getToken } from './auth';
import fetch from 'node-fetch';

export const findUsersByTimer = (timer: string) => {
  const url = new URL(String(process.env.DB_URL));
  url.searchParams.append('time', timer);

  return fetch(url, {
    method: 'GET',
  }).then(async res => {
    if (res.status !== 200) return null;
    return (await res.json()) as UserTimersSettings[];
  });
};

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
