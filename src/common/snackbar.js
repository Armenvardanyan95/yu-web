import React from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { translate } from 'react-translate';

import notificationService from './notifications';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}



const SnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    wrapper: {
        marginTop: 50
    }
});

class Snackbars extends React.Component {
    state = {
        open: false,
        variant: 'success',
        message: '',
        toBeTranslated: true,
    };
    unmount = new Subject();

    componentDidMount() {
        notificationService.onMessage.pipe(takeUntil(this.unmount))
            .subscribe(({variant, message, toBeTranslated}) => {
                this.setState({open: true, variant, message, toBeTranslated})
            })
    }

    componentWillUnmount() {
        this.unmount.next();
    }

    handleClose = (event, reason) => {
        if (reason !== 'clickaway') {
            this.setState({ open: false });
        }
    };

    render() {
        const { classes, t } = this.props;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={10000}
                    className={classes.wrapper}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={this.state.variant}
                        message={this.state.toBeTranslated ? t(this.state.message) : this.state.message}
                    />
                </Snackbar>
            </div>
        );
    }
}

const styledComponent = withStyles(styles2)(Snackbars);
export default translate('Snackbar')(styledComponent);