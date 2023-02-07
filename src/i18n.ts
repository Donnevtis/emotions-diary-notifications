import i18next from 'i18next';

export const i18n = (lng: string) => {
  i18next.init({
    lng,
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          hawaryou: 'How are you?',
          diary: 'Emotions diary',
        },
      },
      ru: {
        translation: {
          hawaryou: 'Как дела?',
          diary: 'Дневник эмоций',
        },
      },
    },
  });

  return i18next.t;
};
