import { Handler } from '@yandex-cloud/function-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { findUsersByTimer, sendNotification } from './api';

dayjs.extend(customParseFormat);

const TIME_FORMAT = 'HH:mm Z';

export const handler: Handler.Timer = async ({
  messages: [
    {
      event_metadata: { created_at },
    },
  ],
}) => {
  const timer = dayjs(created_at).format(TIME_FORMAT);

  findUsersByTimer(timer).then(usersSettings => {
    if (!usersSettings) return;
    usersSettings.forEach(sendNotification);
  });
};
