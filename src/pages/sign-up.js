import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-translate';
import { Link, withRouter } from 'react-router-dom';

import { isRequired, isEmail, FormGroup } from '../common/validations';
import userService from '../common/user.service';
import notificationsService from '../common/notifications';

import BackgroundImage from '../assets/signup.jpg';

const styles = theme => ({
    card: {
        margin: 'auto',
        width: '30%',
        marginTop: 150,
        backgroundColor: 'rgb(237, 238, 240)',
    },
    input: {
        marginTop: 20
    },
    button: {
        margin: 'auto',
        marginTop: 20,
        marginBottom: 16,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.secondary.light,
    },
    backgroundImageContainer: {
        backgroundImage: `url(${BackgroundImage})`,
        height: 'calc(100vh - 64px)',
        display: 'flex'
    }
});

export class SignUp extends React.Component {

    form = new FormGroup([
        ['email', [isRequired, isEmail]],
        ['firstName', [isRequired]],
        ['lastName', [isRequired]],
        ['password', [isRequired]],
        ['confirmPassword', [isRequired]],
    ]);

    state = {
        submitted: false,
    };

    handleChange = name => event => {
        const control = this.form.get(name);
        control.value = event.target.value;
        this.forceUpdate();
    };

    onSubmit = async() => {
        this.setState({submitted: true});
        if (this.form.valid) {
            const res = await userService.signUp(this.form.value);
            if (res.success) {
                this.props.history.push('/');
                notificationsService.success('SIGNUP_SUCCESS')
            } else {
                notificationsService.error(res.message);
            }
        }
    };

    handleTouch = name => () => {
        this.form.get(name).markAsTouched();
        this.forceUpdate();
    };

    render() {
        const { t, classes } = this.props;
        const { submitted } = this.state;
        return (
            <div className={classes.backgroundImageContainer}>
                <Card className={classes.card}>
                    <CardContent>
                        <h1>{t('SIGN_UP')}</h1>
                        <SignUpForm t={name => t(name)} classes={classes} handleTouch={this.handleTouch}
                                    form={this.form} submitted={submitted} handleChange={this.handleChange}/>
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button size="large" color="primary" variant="outlined"
                                    onClick={this.onSubmit}>{t('ENTER')}</Button>
                            <br/>
                            <Link className={classes.link} to="/signin">{t('SIGN_IN')}</Link>
                        </div>
                    </CardActions>

                </Card>
            </div>
        );
    }
}

const SignUpForm = ({t, classes, handleChange, form, submitted, handleTouch}) => (<div>
    <TextField error={form.get('firstName').hasError() && (form.get('firstName').touched || submitted)}
               label={t('FIRST_NAME')}
               helperText={(form.get('firstName').hasError() && (form.get('firstName').touched || submitted))
                            && form.get('firstName').errorList[0]}
               onBlur={handleTouch('firstName')}
               onChange={handleChange('firstName')} fullWidth/>
    <br/><br/>
    <TextField error={form.get('lastName').hasError() && (form.get('lastName').touched || submitted)}
               label={t('LAST_NAME')}
               helperText={(form.get('lastName').hasError() && (form.get('lastName').touched || submitted))
               && form.get('lastName').errorList[0]}
               onBlur={handleTouch('lastName')}
               onChange={handleChange('lastName')} fullWidth/>
    <br/><br/>
    <TextField error={form.get('email').hasError() && (form.get('email').touched || submitted)}
               label={t('EMAIL')}
               helperText={(form.get('email').hasError() && (form.get('email').touched || submitted))
               && form.get('email').errorList[0]}
               onBlur={handleTouch('email')}
               onChange={handleChange('email')} fullWidth/>
    <br/><br/>
    <TextField error={form.get('password').hasError() && (form.get('password').touched || submitted)}
               label={t('PASSWORD')}
               helperText={(form.get('password').hasError() && (form.get('password').touched || submitted))
               && form.get('password').errorList[0]}
               onBlur={handleTouch('password')} type="password"
               onChange={handleChange('password')} fullWidth/>
    <br/><br/>
    <TextField error={form.get('confirmPassword').hasError() && (form.get('confirmPassword').touched || submitted)}
               label={t('CONFIRM_PASSWORD')}
               helperText={(form.get('confirmPassword').hasError() && (form.get('confirmPassword').touched || submitted))
               && form.get('confirmPassword').errorList[0]}
               onBlur={handleTouch('confirmPassword')} type="password"
               onChange={handleChange('confirmPassword')} fullWidth/>
    <br/><br/>
</div>);

const styledComponent = withStyles(styles)(SignUp);
const componentWithRouter = withRouter(styledComponent);
export default translate('SignUp')(componentWithRouter);