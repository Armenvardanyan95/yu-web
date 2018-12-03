import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import { translate } from 'react-translate';

import Profile from '../components/profile';
import Orders from '../components/orders';

const styles = theme => ({
    container: {
        display: 'flex',
        height: '100%',
    },
    dashboard: {
        margin: 'auto',
        marginTop: 40,
        width: 1600,
    },
    paper: {
        float: 'left'
    },
    paperPage: {
        float: 'left',
        marginLeft: 30,
        width: 1200,
    }
});

class Dashboard extends React.Component {

    state = {
        activePage: 1
    };

    changePage = activePage => {
        this.setState({activePage});
    };

    render() {
        const { classes, t } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.dashboard}>
                    <Paper className={classes.paper}>
                        <MenuList>
                            <MenuItem selected={this.state.activePage === 1} onClick={() => this.changePage(1)}>
                                <ListItemIcon>
                                    <BookmarkIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('ORDERS')}/>
                            </MenuItem>
                            <MenuItem selected={this.state.activePage === 2}  onClick={() => this.changePage(2)}>
                                <ListItemIcon>
                                    <AccountBoxRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('PROFILE')}/>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                    <Paper className={classes.paperPage}>
                        {
                            (() => {
                               switch (this.state.activePage) {
                                   case 1:
                                       return (<div><Orders/></div>);
                                   case 2:
                                       return (<div><Profile/></div>);
                               }
                            })()
                        }
                    </Paper>
                </div>
            </div>
        );
    }
}

const styledComponent = withStyles(styles)(Dashboard);
export default translate('Dashboard')(styledComponent);