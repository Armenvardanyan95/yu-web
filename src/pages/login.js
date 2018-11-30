import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-translate';
import { Link, withRouter } from 'react-router-dom';

import BackgroundImage from '../assets/signin.jpg'

import { isRequired, isEmail, FormGroup } from '../common/validations';
import userService from '../common/user.service';
import notificationsService from '../common/notifications';
import { store } from '../state/store';
import { setAuth, setUser } from '../state/actions';

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
    },
});

export class Login extends React.Component {

    form = new FormGroup([
        ['email', [isRequired, isEmail]],
        ['password', [isRequired]],
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
              const res = await userService.signIn(this.form.value);
              if (res.success) {
                  const token = res.data.token;
                  localStorage.setItem('token', token);
                  store.dispatch(setAuth(true));
                  const user = await userService.getMyself();
                  store.dispatch(setUser(user.data));
                  this.props.history.push('/dashboard');
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
                        <h1>{t('SIGN_IN')}</h1>
                        <LoginForm t={name => t(name)} classes={classes} form={this.form}
                                   handleChange={this.handleChange} handleTouch={this.handleTouch}
                                   submitted={submitted}/>
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button size="large" color="primary" variant="outlined"
                                    onClick={this.onSubmit}>{t('ENTER')}</Button>
                            <br/>
                            <Link className={classes.link} to="/forgot-password">{t('FORGOT_PASSWORD')}</Link>
                        </div>
                    </CardActions>

                </Card>
            </div>
        );
    }
}

const LoginForm = ({t, classes, handleChange, form, handleTouch, submitted}) => (<div>
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
</div>);

const styledComponent = withStyles(styles)(Login);
const componentWithRouter = withRouter(styledComponent);
export default translate('Login')(componentWithRouter);