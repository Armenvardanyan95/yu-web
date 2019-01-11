import React, { Component } from 'react';
import { TranslatorProvider } from 'react-translate';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import * as jwtDecode  from 'jwt-decode';

import { store } from './state/store';
import './App.css';
import { en } from './i18n/en'
import { ru } from './i18n/ru'
import { hy } from './i18n/hy'
import { Routing } from './pages/routing';
import Header from './components/header';
import Snackbars from './common/snackbar';
import { setAuth, setUser } from './state/actions';
import userService from './common/user.service';
import notificationService from './common/notifications';
import { messagesService } from './common/messages.service';

const theme = createMuiTheme();

class App extends Component {
    state = {
        lang: en,
        isLoading: false,
    };

    languages = {en: en, ru: ru, hy: hy};

    constructor(props) {
        super(props);
        const isAuth = !!localStorage.getItem('token');
        store.dispatch(setAuth(true));
        if (isAuth) {
            this.getUser();
            messagesService.toggleOnline(true);
            setInterval(() => messagesService.toggleOnline(true), 5000);
            window.addEventListener('beforeunload', () => messagesService.toggleOnline(false))
        }
    }

    async getUser() {
        this.setState({isLoading: true});
        const res = await userService.getMyself();
        if (res.success) {
            store.dispatch(setUser(res.data));
            store.dispatch(setAuth(true));
        } else {
            notificationService.error(res.error);
        }
        this.setState({isLoading: false});
    }

    componentDidMount() {
        store.subscribe(() => {
            const nextLangName = store.getState().lang;
            const nextLang = this.languages[nextLangName];
            this.setState({lang: nextLang});
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <TranslatorProvider translations={this.state.lang}>
                    <div>
                        <BrowserRouter>
                            <div className="App">
                                {this.state.isLoading ? null : <Header/>}
                                <Routing/>
                            </div>
                        </BrowserRouter>
                        <Snackbars/>
                    </div>
                </TranslatorProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
