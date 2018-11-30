import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core';
import { translate } from 'react-translate';

import orderService from '../common/order.service';
import notificationService from '../common/notifications';
import { store } from '../state/store';


const styles = theme => ({
    action: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: theme.palette.secondary.light,
    },
    paper: {
        margin: 5,
    },
    noOrder: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    empty: {
        width: '100%',
    }
});

class OrdersList extends React.Component {
    state = {
        orders: [],
        detailsDialogOpen: false,
        cancelDialogOpen: false,
        selectedOrder: undefined,
    };

    componentDidMount() {
        this.getOrders();
        store.subscribe(() => this.getOrders());
    }

    async getOrders() {
        const res = await orderService.getMyOrders();
        if (res.success) {
            this.setState({orders: res.data});
            console.log(res.data);
        } else {
            notificationService.error(res.message);
        }
    }

    downLoadAttachment = order => () => {
        const a = document.createElement('a');
        const extension = order.filePath.split('.')[1];
        a.download = 'Download.' + extension;
        a.href = orderService.fullPrefix + '/uploaded-doc/' + order.filePath;
        a.target = '_blank';
        a.click();
    };

    openDetailsDialog = order => () => {
        this.setState({detailsDialogOpen: true, selectedOrder: order});
    };

    openCancelDialog = order => () => {
        this.setState({cancelDialogOpen: true, selectedOrder: order});
    };

    closeDetailsDialog = () => this.setState({detailsDialogOpen: false, selectedOrder: undefined});

    closeCancelDialog = () => this.setState({cancelDialogOpen: false, selectedOrder: undefined});

    render() {
        const { t, classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('ORDER_TITLE')}</TableCell>
                                <TableCell>{t('ORDER_TYPE')}</TableCell>
                                <TableCell>{t('ORDER_ATTACHMENT')}</TableCell>
                                <TableCell>{t('ORDER_STATUS')}</TableCell>
                                <TableCell>{t('ORDER_ACTIONS')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (() => {
                                    if (this.state.orders.length > 0) {
                                        return (
                                            this.state.orders.map(order => {
                                                return (
                                                    <TableRow key={order.id}>
                                                        <TableCell>{order.title}</TableCell>
                                                        <TableCell>{order.type}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={this.downLoadAttachment(order)}>
                                                                <CloudDownloadIcon/>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>{t(order.status.toUpperCase())}</TableCell>
                                                        <TableCell>
                                                            <span onClick={this.openDetailsDialog(order)}
                                                                  className={classes.action}>{t('DETAILS')}</span> | <span onClick={this.openCancelDialog(order)} className={classes.action}>{t('CANCEL')}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        );
                                    } else {
                                        return (
                                            <TableRow className={classes.noOrder}>
                                                <TableCell className={classes.empty}>
                                                    {t('NO_ORDER')}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                })()
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <OrderDetails open={this.state.detailsDialogOpen} handleClose={this.closeDetailsDialog}
                              order={this.state.selectedOrder} t={name => t(name)}/>
                <OrderCancel open={this.state.cancelDialogOpen} handleClose={this.closeCancelDialog}
                             order={this.state.selectedOrder} t={name => t(name)}/>
            </div>
        );
    }
}

const OrderDetails = ({open, order = {}, handleClose, t}) => (
    <div>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{order.title || ''}</DialogTitle>
            <DialogContent>
                <DialogContentText>{order.description || ''}</DialogContentText>
                <Stepper
                    activeStep={['pending', 'review', 'approved', 'developed', 'ready']
                        .indexOf(order.status ? order.status.toLowerCase(): '')}>
                    <Step><StepLabel>{t('PENDING')}</StepLabel></Step>
                    <Step><StepLabel>{t('REVIEW')}</StepLabel></Step>
                    <Step><StepLabel>{t('APPROVED')}</StepLabel></Step>
                    <Step><StepLabel>{t('DEVELOPED')}</StepLabel></Step>
                    <Step><StepLabel>{t('READY')}</StepLabel></Step>
                </Stepper>
            </DialogContent>
        </Dialog>
    </div>
);

const OrderCancel = ({open, handleClose, t, handleCancel, order = {}}) => (
    <div>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{order.title || ''}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('ARE_YOU_SURE_CANCEL')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">{t('NO')}</Button>
                <Button onClick={handleCancel} color="primary">{t('YES')}</Button>
            </DialogActions>
        </Dialog>
    </div>
);

const styledComponent = withStyles(styles)(OrdersList);
export default translate('OrderList')(styledComponent);
