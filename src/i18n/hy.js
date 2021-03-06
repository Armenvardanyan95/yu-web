const notificationTypes = {
    'GOT_ORDER_UNDER_REVIEW': 'Ձեր պատվերը ուսումնասիրվում է',
};

const services = {
    'INSPECTION': 'Փաստաթղթի ստուգում',
    'TRANSLATION': 'Փաստաթղթի թարգմանություն',
    'CREATION': 'Փաստաթղթի կազմում',
};

export const hy = {
    locale: 'en',
    Header: {
        'SIGN_IN': 'Մուտք',
        'SIGN_UP': 'Գրանցում',
        'SIGN_OUT': 'Դուրս գալ',
        'OrderUnderReview': ' ուսումնասիրվում է',
        'DASHBOARD': 'Վահանակ',
        ...notificationTypes,
    },
    Login: {
        'ENTER': 'Մուտք գործել',
        'EMAIL': 'Էլ․ հասցե',
        'PASSWORD': 'Գաղտնաբառ',
        'SIGN_IN': 'Մուտք',
        'FORGOT_PASSWORD': 'Մոռացել եմ գաղտնաբառը'
    },
    Snackbar: {
        'INCORRECT_PASSWORD': 'Գաղտնաբառր սխալ է',
        'USER_NOT_FOUND': 'Այս էլ․ հասցեով օգտատեր չի գտնվել',
        'PASSWORD_RECOVERY_EMAIL_SENT': 'Գաղտնաբառը ուղարկելու համար նամակը հաջողւոթյամբ ուղարկվել է',
        'WARN_NOT_AUTH': 'Այս էջը տեսնելու համար հարկավոր է մուտք գործել',
        'SIGNUP_SUCCESS': 'Դուք հաջողությամբ գրանցվել եք։ Շուտով Դուք կստանաք հաստատման նամակ Ձեր էլ․հասցեին',
        'USER_ALREADY_EXISTS': 'Այսպիսի օգտատեր արդեն գոյություն ունի',
        'USER_SUCCESSFULLY_UPDATED': 'Տվյալները հաջողությամբ պահպանվել են',
        'SUCCESSFULLY_CREATED_ORDER': 'Ձեր պատվերը հաջողությամբ գրանցված է',
        'SUCCESSFULLY_CHANGED_PASSWORD': 'Ձեր գաղտնաբառը հաջողությամբ փոփոխվել է',
        'VERIFY_SUCCESS': 'Դուք հաջողությամբ հաստատվել եք և արդեն կարող եք մուտք գործել Ձեր հաշիվ',
        'VERIFY_UNSUCCESS': 'Ձեր հաստատման ընթացքում տեղի է ունեցել սխալ։ Խնդրում ենք կրկին փորձել մի փոքր ուշ',
        'NO_ORDER': 'Դուք դեր չունեք որևէ պատվեր',
    },
    ForgotPassword: {
        'RECOVER_PASSWORD': 'Վերականգնել գաղտնաբառը',
        'EMAIL': 'Էլ․ հասցե',
        'RECOVER': 'Վերականգնել'
    },
    SignUp: {
        'ENTER': 'Գրանցվել',
        'EMAIL': 'Էլ․ հասցե',
        'PASSWORD': 'Գաղտնաբառ',
        'SIGN_UP': 'Գրանցում',
        'FIRST_NAME': 'Անուն',
        'LAST_NAME': 'Ազգանուն',
        'CONFIRM_PASSWORD': 'Կրկնեք գաղտնաբառը',
        'SIGN_IN': 'Մուտք',
    },
    Dashboard: {
        'PROFILE': 'Իմ էջը',
        'ORDERS': 'Իմ պատվերները',
        'MESSAGING': 'նամակներ',
    },
    Profile: {
        'FIRST_NAME': 'Անուն',
        'LAST_NAME': 'Ազգանուն',
        'EMAIL': 'Էլ․ հասցե',
        'SAVE': 'Պահպանել',
        'BIO': 'Կարող եք տեղեկություններ տրամադրել Ձեր մասին հաճախորդներին և կատարողներին',
        'PHONE_NUMBER': 'Հեռախոսահամար',
        'IT_WOULD_BE_EASY_CONTACT': 'Այսպես մեզ համար ավելի հեշտ կլինի կապնվել Ձեզ հետ',
        'CHANGE_PASSWORD': 'Փոխել գաղտնաբառը',
        'CHANGE_PROFILE_PIC': 'Փոխել էջի նկարը',
    },
    Orders: {
        'CREATE_NEW': 'Գրանցել նոր պատվեր',
    },
    CreateOrder: {
        'CREATE_ORDER': 'Գրանցել պատվեր',
        'TITLE': 'Վերնագիր',
        'UPLOAD_FILE': 'Ներվեռնել ֆայլ',
        'TYPE': 'Տեսակ',
        'SUBMIT': 'Ուղարկել',
        ...services,
    },
    OrderList: {
        'ORDER_TITLE': 'Վերնագիր',
        'ORDER_TYPE': 'Տեսակ',
        'ORDER_ATTACHMENT': 'Կցված ֆայլ',
        'ORDER_STATUS': 'Կարգավիճակ',
        'ORDER_ACTIONS': 'Գործողություններ',
        'DETAILS': 'Մանրամասներ',
        'CANCEL': 'Չեղարկել',
        'PENDING': 'Ուղարկված է',
        'REVIEW': 'Քնաարկվում է',
        'APPROVED': 'Հաստատված է',
        'DEVELOPED': 'Ընթացքում է',
        'READY': 'Պատրաստ է',
        'ARE_YOU_SURE_CANCEL': 'Համոզված ե՞ք, որ ուզում եք չեղարկել այս պատվերը',
        'YES': 'Այո',
        'NO': 'Ոչ',
    },
    'ChangePassword': {
        'CHANGE_PASSWORD': 'Փոխել գաղտնաբառը',
        'CURRENT_PASSWORD': 'Ներկայիս Գաղտնաբառը',
        'NEW_PASSWORD': 'Նոր Գաղտնաբառը',
        'CONFIRM_NEW_PASSWORD': 'Կրկնեք Նոր Գաղտնաբառը',
        'CANCEL': 'Չեղարկել',
        'SUBMIT': 'Պահպանել',
    },
    ChatBox: {
        'TYPING': 'տպում է',
        'SEND': 'Ուղարկել հաղորդագրությունը',
        'ATTACH': 'Կցել ֆայլ',
    },
};