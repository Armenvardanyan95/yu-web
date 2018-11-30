import React from 'react';
import { translate } from 'react-translate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, withRouter } from 'react-router-dom';


import { store } from '../state/store';
import { notificationsService } from '../common/notifications.service';
import growlService from '../common/notifications';
import { setAuth, setLanguage, setUser } from '../state/actions';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    headerLink: {
        textDecoration: 'none',
        color: theme.palette.common.white,
    },
});

class Header extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        isAuth: store.getState().isAuth,
        lang: store.getState().lang,
        notifications: [],
    };

    componentDidMount() {
        this.getNotifications();
        store.subscribe(() => {
            this.getNotifications();
            this.setState({isAuth: store.getState().isAuth});
        });
    }

    getNotifications() {
        const { isAuth, user } = store.getState();
        if (isAuth && user) {
            notificationsService.getNotifications();
            notificationsService.subscribeToNotifications(notifications => console.log('arrrgxh', notifications));
            notificationsService.subscribeToNewNotification(notification => {
                const { t } = this.props;
                growlService.info(notification.content + t(notification.type), false);
                this.setState(prevState => ({notifications: [notification, ...prevState.notifications]}))
            });
        }
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = name => () => {
        this.setState({ anchorEl: null });
        switch (name) {
            case 'SIGN_OUT':
                localStorage.removeItem('token');
                store.dispatch(setUser(null));
                store.dispatch(setAuth(false));
                this.props.history.push('/');
                break;
        }
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    changeLang = event => {
        const lang = event.target.value;
        console.log();
        this.setState({lang});
        store.dispatch(setLanguage(lang));
    };

    render() {
        const {anchorEl, mobileMoreAnchorEl, isAuth} = this.state;
        const {classes, t} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose('')}
            >
                <MenuItem onClick={this.handleMenuClose('')}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose('')}>My account</MenuItem>
                <MenuItem onClick={this.handleMenuClose('SIGN_OUT')}>{t('SIGN_OUT')}</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color="inherit">
                        {
                            (() => {
                                const unreadCount = this.state.notifications.filter(n => !n.isRead).length;
                                if (unreadCount > 0) {
                                    return (
                                        <Badge badgeContent={unreadCount} color="secondary">
                                            <NotificationsIcon/>
                                        </Badge>
                                    )
                                } else {
                                    return (<NotificationsIcon/>);
                                }
                            })()
                        }
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        const rightMenuAuth = (
            <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    {
                        (() => {
                            const unreadCount = this.state.notifications.filter(n => !n.isRead).length;
                            if (unreadCount > 0) {
                                return (
                                    <Badge badgeContent={unreadCount} color="secondary">
                                        <NotificationsIcon/>
                                    </Badge>
                                )
                            } else {
                                return (<NotificationsIcon/>);
                            }
                        })()
                    }
                </IconButton>
                <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
            </div>
        );

        const rightMenuUnAuth = (
            <div className={classes.sectionDesktop}>
                <Button color="inherit">
                    <Link to="/login" className={classes.headerLink}>{t('SIGN_IN')}</Link>
                </Button>

                <Button color="inherit">
                    <Link to="/sign-up" className={classes.headerLink}>{t('SIGN_UP')}</Link>
                </Button>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Material-UI
                        </Typography>
                        <div className={classes.grow}/>
                        {isAuth ? rightMenuAuth : rightMenuUnAuth}
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </div>
                        <FormControl>
                            <Select value={this.state.lang} onChange={this.changeLang}>
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'ru'}>Russian</MenuItem>
                                <MenuItem value={'hy'}>Armenian</MenuItem>
                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>);
    }
}

const styledComponent = withStyles(styles)(Header);
const componentWithRouter = withRouter(styledComponent);
export default translate('Header')(componentWithRouter);