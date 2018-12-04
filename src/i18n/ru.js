const notificationTypes = {
    'GOT_ORDER_UNDER_REVIEW': 'Ваш заказ просматривается',
};


export const ru = {
    locale: 'ru',
    Header: {
        'SIGN_IN': 'Вход',
        'SIGN_UP': 'Регистрация',
        'SIGN_OUT': 'Выйти',
        'OrderUnderReview': ' рассматривается',
        'DASHBOARD': 'Панель',
        ...notificationTypes,
    },
    Login: {
        'ENTER': 'Войти',
        'EMAIL': 'Эл. адрес',
        'PASSWORD': 'Пароль',
        'SIGN_IN': 'Вход',
        'FORGOT_PASSWORD': 'Забыл пароль'
    },
    Snackbar: {
        'INCORRECT_PASSWORD': 'Введенный пароль не верен',
        'USER_NOT_FOUND': 'Пользователя с таким электронным адресом не найдено',
        'PASSWORD_RECOVERY_EMAIL_SENT': 'Письмо для восстановления пароля успешно отправлено!',
        'WARN_NOT_AUTH': 'Чтобы увидеть эту страницу, необходимо авторизоваться',
        'SIGNUP_SUCCESS': 'Вы успешно зарегистрировались. Вскоре Вы получите письмо для подтверждения на Ваш почтовый адрес.',
        'USER_ALREADY_EXISTS': 'Такой пользователь уже существует',
        'USER_SUCCESSFULLY_UPDATED': 'Данные успешно обновлены',
        'SUCCESSFULLY_CREATED_ORDER': 'Ваш заказ успешно оформлен',
        'SUCCESSFULLY_CHANGED_PASSWORD': 'Ваш пароль был успешно изменен',
        'VERIFY_SUCCESS': 'Вы были успешно подтверждены и теперь можете войти в свой профиль',
        'VERIFY_UNSUCCESS': 'С Вашим подтверждением произошла ошибка. Пожалуйста, попробуйте снова позже.',
        'NO_ORDER': 'У вас еще нет заказов',
    },
    ForgotPassword: {
        'RECOVER_PASSWORD': 'Восстановить пароль',
        'EMAIL': 'Эл. адрес',
        'RECOVER': 'Восстановить'
    },
    SignUp: {
        'ENTER': 'Зарегистрироваться',
        'EMAIL': 'Эл. адрес',
        'PASSWORD': 'Пароль',
        'SIGN_UP': 'Регистрация',
        'FIRST_NAME': 'Имя',
        'LAST_NAME': 'Фамилия',
        'CONFIRM_PASSWORD': 'Подтвердите пароль',
        'SIGN_IN': 'Вход',
    },
    Dashboard: {
        'PROFILE': 'Мой профиль',
        'ORDERS': 'Мои заказы'
    },
    Profile: {
        'FIRST_NAME': 'Имя',
        'LAST_NAME': 'Фамилия',
        'EMAIL': 'Эл. адрес',
        'SAVE': 'Сохранить',
        'BIO': 'Вы можете предоставить информацию о Себе для клиентов и исполнителей',
        'PHONE_NUMBER': 'Номер Телефона',
        'IT_WOULD_BE_EASY_CONTACT': 'Так нам будет легче связаться с Вами',
        'CHANGE_PASSWORD': 'Изменить пароль',
        'CHANGE_PROFILE_PIC': 'Сменить Фотографию Профиля',
    },
    Orders: {
        'CREATE_NEW': 'Сделать новый заказ'
    },
    CreateOrder: {
        'CREATE_ORDER': 'Оформить заказ',
        'TITLE': 'Название',
        'UPLOAD_FILE': 'Загрузить файл',
        'TYPE': 'Тип',
        'INSPECTION': 'Проверка юридического документа',
        'TRANSLATION': 'Перевод юридического документа',
        'CREATION': 'Оформление юридического документа',
        'SUBMIT': 'Сохранить',
    },
    OrderList: {
        'ORDER_TITLE': 'Название',
        'ORDER_TYPE': 'Тип',
        'ORDER_ATTACHMENT': 'Прикрепленный файл',
        'ORDER_STATUS': 'Статус',
        'ORDER_ACTIONS': 'Действия',
        'DETAILS': 'Подробно',
        'CANCEL': 'Отменить',
        'PENDING': 'Отправлено',
        'REVIEW': 'Рассматривается',
        'APPROVED': 'Одобрено',
        'DEVELOPED': 'В процессе',
        'READY': 'Готово',
        'ARE_YOU_SURE_CANCEL': 'Вы уверены, что хотите отменить этот заказ?',
        'YES': 'Да',
        'NO': 'Нет',
    },
    'ChangePassword': {
        'CHANGE_PASSWORD': 'Изменить пароль',
        'CURRENT_PASSWORD': 'Текущий Пароль',
        'NEW_PASSWORD': 'Новый Пароль',
        'CONFIRM_NEW_PASSWORD': 'Повторите Новый Пароль',
        'CANCEL': 'Отменить',
        'SUBMIT': 'Сохранить',
    },
};