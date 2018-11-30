import React from 'react';
import { withRouter } from 'react-router-dom';
import * as queryString from 'query-string';

import userService from '../common/user.service';
import notificationService from '../common/notifications';

let confirmation = class extends React.Component {
    render() {
        return null;
    }

    async componentDidMount() {
        const { history, location } = this.props;
        const params = queryString.parse(location.search);
        const res = await userService.verify(params.token);
        if (res.success) {
            history.replace('/login');
            notificationService.success('VERIFY_SUCCESS');
        } else {
            history.replace('/');
            notificationService.error('VERIFY_UNSUCCESS');
        }
    }
};

export default withRouter(confirmation);