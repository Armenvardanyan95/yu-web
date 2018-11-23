import React from 'react';
import { withRouter } from 'react-router-dom';

import { store } from '../../state/store';
import notificationsService from '../notifications';

const withAuth = (ProtectedRoute) => {
    class WithAuthorization extends React.Component {
        render() {
            const { isAuth } = store.getState();
            const { history } = this.props;
            if (isAuth) {
                return <ProtectedRoute {...this.props}/>;
            } else {
                history.replace('/login?redirect=dashboard');
                setTimeout(() => notificationsService.warning('WARN_NOT_AUTH'));
                return null;
            }
        }
    }

    return withRouter(WithAuthorization);
};

export default withAuth;