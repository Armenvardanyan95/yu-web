import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-translate';
import { Link, withRouter } from 'react-router-dom';
import * as jwtDecode  from 'jwt-decode';

import { validateRequired, validateEmail } from '../common/validations';
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
    }
});

export class Login extends React.Component {

    state = {
        email: '',
        password: '',
        submitted: false,
        errors: {
            email: 'Field is required',
            password: 'Field is required'
        },
        touched: {
            email: false,
            password: false
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
      const formValue = {email: this.state.email, password: this.state.password};
      const isValid = !(this.state.errors.email || this.state.errors.password);
      if (isValid) {
          const res = await userService.signIn(formValue);
          if (res.success) {
              const token = res.data.token;
              localStorage.setItem('token', token);
              const user = jwtDecode(token);
              store.dispatch(setUser(user));
              store.dispatch(setAuth(true));
              this.props.history.push('/dashboard');
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
        const { t, classes } = this.props;
        const { submitted, touched, errors } = this.state;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <h1>{t('SIGN_IN')}</h1>
                    <LoginForm t={name => t(name)} classes={classes} touched={touched}
                               handleChange={this.handleChange} handleTouch={this.handleTouch}
                               errors={errors} submitted={submitted}/>
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
        );
    }
}

const LoginForm = ({t, classes, handleChange, errors, touched, handleTouch, submitted}) => (<div>
    <TextField error={!!errors.email && (touched.email || submitted)} label={t('EMAIL')}
               helperText={(touched.email || submitted) && errors.email}
               inputProps={{onBlur: handleTouch('email')}}
               onChange={handleChange('email')} fullWidth/>
        <br/>
    <TextField error={!!errors.password && (touched.password || submitted)} label={t('PASSWORD')}
               fullWidth helperText={(touched.password || submitted) && errors.password}
               inputProps={{onBlur: handleTouch('password')}} type="password"
               className={classes.input} onChange={handleChange('password')}/>
</div>);

const styledComponent = withStyles(styles)(Login);
const componentWithRouter = withRouter(styledComponent);
export default translate('Login')(componentWithRouter);