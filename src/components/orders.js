import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { translate } from 'react-translate';

import OrdersList from './orders-list';
import CreateOrder from './create-order';
import { store } from '../state/store';
import { updateOrders } from '../state/actions';

const styles = theme => ({
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    actionButtons: {
      float: 'right',
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

class Orders extends React.Component {

    state = {
        newOrderDialogOpen: false,
    };
    orderList = null;

    toggleNewOrderDialog = state => () => this.setState({newOrderDialogOpen: state});

    render() {
        const { classes, t } = this.props;
        return (
            <div>
                <div className={classes.actions}>
                    <Button variant="contained" size="small"
                            className={classNames(classes.button, classes.actionButtons)}
                            onClick={this.toggleNewOrderDialog(true)}>
                        <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        {t('CREATE_NEW')}
                    </Button>
                </div>
                <div>
                    <OrdersList ref={ol => this.orderList = ol}/>
                </div>
                <br/>
                <Dialog open={this.state.newOrderDialogOpen} onClose={this.toggleNewOrderDialog(false)}>
                    <CreateOrder onCreate={() => store.dispatch(updateOrders())}
                                 onClose={this.toggleNewOrderDialog(false)}/>
                </Dialog>
            </div>
        );
    }
}

const styledComponent = withStyles(styles)(Orders);
export default translate('Orders')(styledComponent);