export default {
  translation: {
    errors: {
      validation_errors: {
        required: 'Обязательное поле',
        username_min_max: 'От 3 до 20 символов',
        password_min: 'Не менее 6 символов',
        password_match: 'Пароли должны совпадать',
        channel_unique: 'Должно быть уникальным',
      },
      login_auth_error: 'Неверное имя пользователя или пароль',
      signup_error: 'Такой пользователь уже существует',
      network_error: 'Ошибка сети',
    },
    navbar: {
      header: 'Hexlet Chat',
      logout_button: 'Выйти',
    },
    login_page: {
      header: 'Войти',
      login_button: 'Войти',
      footer_text: 'Нет аккаунта?',
      footer_signup_link: 'Регистрация',
    },
    signup_page: {
      header: 'Регистрация',
      signup_button: 'Зарегистрироваться',
    },
    chat_page: {
      channels: 'Каналы',
      remove: 'Удалить',
      removed: 'Канал удален',
      remove_header: 'Удалить канал',
      remove_confirm: 'Уверены?',
      rename: 'Переименовать',
      renamed: 'Канал переименован',
      rename_header: 'Переименовать канал',
      add_header: 'Добавить канал',
      added: 'Канал создан',
      cancel: 'Отменить',
      send: 'Отправить',
    },
    messages: {
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
    },
  },
};
