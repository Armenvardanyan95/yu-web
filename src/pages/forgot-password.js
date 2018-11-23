import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';

import { validateRequired, validateEmail } from '../common/validations';
import userService from '../common/user.service';
import notificationsService from '../common/notifications';

const styles = theme => ({
    card: {
        margin: 'auto',
        width: '30%',
        marginTop: 150
    },
    input: {
        marginTop: 20
    },
    button: {
        margin: 'auto',
        marginTop: 20,
        marginBottom: 16,
    },
});

class ForgotPassword extends React.Component {

    state = {
        email: '',
        submitted: false,
        errors: {
            email: 'Field is required',
        },
        touched: {
            email: false,
        },
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value}, () => {
            const field = this.state[name];
            const requiredError = validateRequired(field);
            let errors = {};
            if (requiredError) {
                errors[name] = requiredError;
            }
            if (name === 'email' && !errors[name]) {
                const emailError = validateEmail(field);
                if (emailError) {
                    errors[name] = emailError;
                }
            }
            this.setState({errors});
        });
    };

    onSubmit = async() => {
        this.setState({submitted: true});
        const formValue = {email: this.state.email};
        const isValid = !(this.state.errors.email);
        if (isValid) {
            const res = await userService.forgotPassword(formValue);
            if (res.success) {
                this.props.history.push('/');
                notificationsService.success('PASSWORD_RECOVERY_EMAIL_SENT')
            } else {
                notificationsService.error(res.message);
            }
        }
    };

    handleTouch = name => () => {
        const touched = {...this.state.touched};
        touched[name] = true;
        this.setState({touched});
    };

    render() {
        const { touched, submitted, errors } = this.state;
        const { classes, t } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <h1>{t('RECOVER_PASSWORD')}</h1>
                    <TextField error={!!errors.email && (touched.email || submitted)} label={t('EMAIL')}
                               helperText={(touched.email || submitted) && errors.email}
                               inputProps={{onBlur: this.handleTouch('email')}}
                               onChange={this.handleChange('email')} fullWidth/>
                </CardContent>
                <CardActions>
                    <Button size="large" color="primary" variant="outlined" className={classes.button}
                            onClick={this.onSubmit}>{t('RECOVER')}</Button>
                </CardActions>
            </Card>
        );
    }
}

const styledComponent = withStyles(styles)(ForgotPassword);
const componentWithRouter = withRouter(styledComponent);
export default translate('ForgotPassword')(componentWithRouter);