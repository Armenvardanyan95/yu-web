import React, { Component } from 'react';
import { TranslatorProvider } from 'react-translate';
import { BrowserRouter } from 'react-router-dom';

import { store } from './state/store';
import './App.css';
import { en } from './i18n/en'
import { ru } from './i18n/ru'
import { hy } from './i18n/hy'
import { Routing } from './pages/routing';
import Header from './components/header';
import Snackbars from './common/snackbar';

class App extends Component {
    state = {
      lang: en
    };

    languages = {en: en, ru: ru, hy: hy};

    componentDidMount() {
        store.subscribe(() => {
            const nextLangName = store.getState().lang;
            const nextLang = this.languages[nextLangName];
            this.setState({lang: nextLang});
        });
    }

    render() {
        return (
            <TranslatorProvider translations={this.state.lang}>
                <div>
                    <BrowserRouter>
                        <div className="App">
                            <Header/>
                            <Routing/>
                        </div>
                    </BrowserRouter>
                    <Snackbars/>
                </div>

            </TranslatorProvider>
        );
    }
}

export default App;
