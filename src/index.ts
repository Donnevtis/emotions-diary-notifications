import { Handler } from '@yandex-cloud/function-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { findUsersByTimer, getUserLanguage, sendNotification } from './api';
import { errorHandler, logger } from './utils';

dayjs.extend(customParseFormat);

const TIME_FORMAT = 'HH:mm Z';

const functionErrorHandler = errorHandler('Function error.');

export const handler: Handler.Timer = async ({
  messages: [
    {
      event_metadata: { created_at },
    },
  ],
}) => {
  const timer = dayjs(created_at).format(TIME_FORMAT);

  findUsersByTimer(timer)
    .then(users => {
      const countUsers = users.length;

      logger.info(`Search for a notification at ${timer}. ${countUsers} users found.`);

      if (!countUsers) return;

      users.forEach(async ({ user_id, notify, language_code }) =>
        sendNotification({
          user_id,
          notify,
          language_code: (await getUserLanguage(user_id)) || language_code,
        }),
      );
    })
    .catch(error => {
      functionErrorHandler(error, handler.name, { timer });
      throw new Error('Notification error!');
    });
};
