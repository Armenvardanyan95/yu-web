import React from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { translate } from 'react-translate';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { FormGroup, isRequired } from '../common/validations';
import { store } from '../state/store';
import { setUser } from '../state/actions';
import userService from '../common/user.service';
import notificationService from '../common/notifications';
import UserImage from '../assets/defaul_profil_pic.png';


const styles = theme => ({
    container: {
        padding: 20,
    },
    input: {
        marginRight: 20,
    },
    avatar: {
        width: 160,
        height: 160,
        '&:hover': {
            opacity: 0.5,
            cursor: 'pointer',
        }
    },
    textbox: {
        float: 'left',
        width: 200,
        height: 100,
    },
    actions: {
        float: 'right',
        marginTop: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

let changePassword = class extends React.Component {

    state = {
        submitted: false,
    };

    form = new FormGroup([
       ['currentPassword', [isRequired]],
       ['newPassword', [isRequired]],
       ['confirmNewPassword', [isRequired]],
    ]);

    handleTouch = name => () => {
        this.form.get(name).markAsTouched();
        this.forceUpdate();
    };

    handleChange = name => event => {
        const control = this.form.get(name);
        control.value = event.target.value;
        this.forceUpdate();
    };

    submit = async () => {
        if (this.form.valid) {
            const res = await userService.updatePassword(this.form.value);
            if (res.success) {
                this.props.handleClose();
                notificationService.success('SUCCESSFULLY_CHANGED_PASSWORD');
            } else {
                notificationService.error(res.message);
            }
        }
    };

    render() {
        const { t, open, handleClose, classes } = this.props;
        const { submitted } = this.state;
        const { form, handleTouch, handleChange } = this;
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        {t('CHANGE_PASSWORD')}
                    </DialogTitle>
                    <DialogContent>
                        <TextField error={form.get('currentPassword').hasError() && (form.get('currentPassword').touched || submitted)}
                                   label={t('CURRENT_PASSWORD')} type="password"
                                   helperText={(form.get('currentPassword').hasError() &&
                                       (form.get('currentPassword').touched || submitted))
                                   && form.get('currentPassword').errorList[0]}
                                   value={this.form.get('currentPassword').value}
                                   onBlur={handleTouch('currentPassword')} className={classes.input}
                                   onChange={handleChange('currentPassword')}/>
                        <br/>
                        <TextField error={form.get('newPassword').hasError() && (form.get('newPassword').touched || submitted)}
                                   label={t('NEW_PASSWORD')} type="password"
                                   helperText={(form.get('newPassword').hasError() &&
                                       (form.get('newPassword').touched || submitted))
                                   && form.get('newPassword').errorList[0]}
                                   value={this.form.get('newPassword').value}
                                   onBlur={handleTouch('newPassword')} className={classes.input}
                                   onChange={handleChange('newPassword')}/>
                        <br/>
                        <TextField error={form.get('confirmNewPassword').hasError() && (form.get('confirmNewPassword').touched || submitted)}
                                   label={t('CONFIRM_NEW_PASSWORD')} type="password"
                                   helperText={(form.get('confirmNewPassword').hasError() &&
                                       (form.get('confirmNewPassword').touched || submitted))
                                   && form.get('confirmNewPassword').errorList[0]}
                                   value={this.form.get('confirmNewPassword').value}
                                   onBlur={handleTouch('confirmNewPassword')} className={classes.input}
                                   onChange={handleChange('confirmNewPassword')}/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{t('CANCEL')}</Button>
                        <Button onClick={this.submit}>{t('SUBMIT')}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

const ChangePassword = translate('ChangePassword')(withStyles(styles)(changePassword));

class Profile extends React.Component {
    state = {
        submitted: false,
        changePasswordDialogOpen: false,
        user: {},
    };

    form = new FormGroup([
        ['email', [isRequired]],
        ['firstName', [isRequired]],
        ['lastName', [isRequired]],
        ['bio', []],
        ['phoneNumber', []],
    ]);

    profPicInput = null;

    constructor(props) {
        super(props);
        const user = store.getState().user;
        this.form.value = user;
        console.log('user', user);
        setTimeout(() => this.setState({user}));
        store.subscribe(() => this.setState({user: store.getState().user}))
    }

    handleTouch = name => () => {
        this.form.get(name).markAsTouched();
        this.forceUpdate();
    };

    handleChange = name => event => {
        const control = this.form.get(name);
        control.value = event.target.value;
        this.forceUpdate();
    };

    onSubmit = async () => {
        if (this.form.valid) {
            const res = await userService.updateUser(this.form.value);
            if (res.success) {
                store.dispatch(setUser(res.data));
                notificationService.success('USER_SUCCESSFULLY_UPDATED');
            } else {
                notificationService.error(res.message);
            }
        }
    };

    updateProfilePic = async event => {
        const file = this.profPicInput.files[0];
        const res = await userService.updateProfilePic(file);
        if (res.success) {
            store.dispatch(setUser(res.data));
        } else {
            notificationService.error(res.message);
        }
    };

    changePassword = () => this.setState({changePasswordDialogOpen: true});

    cancelChangePassword = () => this.setState({changePasswordDialogOpen: false});

    render() {
        const { form, handleTouch, handleChange } = this;
        const { submitted, user } = this.state;
        const { t, classes } = this.props;
        const profilePicPath =  (user && user.profilePic) ? userService.fullPrefix + '/profile-pic/' + user.profilePic : UserImage;
        console.log('pp', profilePicPath, user);
        return (
            <div className={classes.container}>
                <Tooltip title={t('CHANGE_PROFILE_PIC')}>
                    <Avatar src={profilePicPath} className={classes.avatar} onClick={() => this.profPicInput.click()}/>
                </Tooltip>
                <input type="file" style={{visibility: 'hidden'}}
                       onChange={this.updateProfilePic} ref={f => this.profPicInput = f}/>
                <TextField error={form.get('firstName').hasError() && (form.get('firstName').touched || submitted)}
                           label={t('FIRST_NAME')}
                           helperText={(form.get('firstName').hasError() && (form.get('firstName').touched || submitted))
                           && form.get('firstName').errorList[0]} value={this.form.get('firstName').value}
                           onBlur={handleTouch('firstName')} className={classes.input}
                           onChange={handleChange('firstName')}/>

                <TextField error={form.get('lastName').hasError() && (form.get('lastName').touched || submitted)}
                           label={t('LAST_NAME')}
                           helperText={(form.get('lastName').hasError() && (form.get('lastName').touched || submitted))
                           && form.get('lastName').errorList[0]} value={this.form.get('lastName').value}
                           onBlur={handleTouch('lastName')} className={classes.input}
                           onChange={handleChange('lastName')}/>

                <TextField error={form.get('email').hasError() && (form.get('email').touched || submitted)}
                           label={t('EMAIL')}
                           helperText={(form.get('email').hasError() && (form.get('email').touched || submitted))
                           && form.get('email').errorList[0]} value={this.form.get('email').value}
                           onBlur={handleTouch('email')} className={classes.input} disabled
                           onChange={handleChange('email')}/>
                <br/>
                <TextField label={t('PHONE_NUMBER')}
                           helperText={t('IT_WOULD_BE_EASY_CONTACT')} value={this.form.get('phoneNumber').value}
                           onBlur={handleTouch('phoneNumber')} className={classes.input}
                           onChange={handleChange('phoneNumber')}/>
                <br/>
                <TextField multiline helperText={t('BIO')} value={this.form.get('bio').value}
                           onBlur={handleTouch('bio')} className={classes.textbox}
                           onChange={handleChange('bio')} margin="normal"
                           variant="outlined"/>
                <br/>
                <div className={classes.actions}>
                    <Button variant="contained" size="small" className={classes.button} onClick={this.changePassword}>
                        {t('CHANGE_PASSWORD')}
                    </Button>
                    <Button disabled={!this.form.valid} variant="contained" size="small" className={classes.button} onClick={this.onSubmit}>
                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        {t('SAVE')}
                    </Button>
                </div>
                <ChangePassword open={this.state.changePasswordDialogOpen} handleClose={this.cancelChangePassword}/>
            </div>
        )
    }
}

const styledComponent = withStyles(styles)(Profile);
export default translate('Profile')(styledComponent);