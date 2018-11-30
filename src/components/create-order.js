import React from 'react';
import { withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/es/TextField/TextField';
import { translate } from 'react-translate';

import { FormGroup, isRequired } from '../common/validations';
import orderService from '../common/order.service';
import notificationService from '../common/notifications';

const styles = theme => ({
    uploadButton: {
        display: 'flex',
        alignItems: 'center',
    }
});

class CreateOrder extends React.Component {

    form = new FormGroup([
        ['type', []],
        ['title', [isRequired]],
        ['description', [isRequired]],
    ]);

    file = null;

    state = {
        submitted: false,
    };

    componentDidMount() {
        this.form.get('type').value = 'Translation';
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

    handleFile = files => {
        this.file = files[0];
        this.forceUpdate();
    };

    onSubmit = async () => {
        this.setState({submitted: true});
        if (this.form.valid) {
            const formData = new FormData();
            formData.append('title', this.form.get('title').value);
            formData.append('description', this.form.get('description').value);
            formData.append('type', this.form.get('type').value);
            formData.append('file', this.file);
            const res = await orderService.createOrder(formData);
            if (res.success) {
                notificationService.success('SUCCESSFULLY_CREATED_ORDER');
                this.props.onCreate();
                this.props.onClose();
            } else {
                notificationService.success(res.message);
            }
        }
    };

    render() {
        const { t, classes } = this.props;
        return ([
            <DialogTitle key={1}>{t('CREATE_ORDER')}</DialogTitle>,
            <DialogContent key={2}>
                <CreateOrderForm classes={classes} file={this.file} t={name => t(name)} handleTouch={this.handleTouch}
                                 handleChange={this.handleChange} form={this.form} handleFile={this.handleFile}/>
            </DialogContent>,
            <DialogActions key={3}>
                <Button onClick={this.onSubmit}>{t('SUBMIT')}</Button>
            </DialogActions>
        ])
    }
}

const CreateOrderForm = ({classes, form, t, handleTouch, handleChange, submitted, handleFile, file}) => {
    let fileCtrl = {};
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">{t('TYPE')}</FormLabel>
                <RadioGroup value={form.get('type').value} onChange={handleChange('type')}>
                    <FormControlLabel value="Translation" control={<Radio/>} label={t('TRANSLATION')}/>
                    <FormControlLabel value="Inspection" control={<Radio/>} label={t('INSPECTION')}/>
                    <FormControlLabel value="Creation" control={<Radio/>} label={t('CREATION')}/>
                </RadioGroup>
            </FormControl>
            <TextField error={form.get('title').hasError() && (form.get('title').touched || submitted)}
                       label={t('TITLE')}
                       helperText={(form.get('title').hasError() && (form.get('title').touched || submitted))
                       && form.get('title').errorList[0]}
                       onBlur={handleTouch('title')}
                       onChange={handleChange('title')} fullWidth/>
            <br/><br/>
            <TextField error={form.get('description').hasError() && (form.get('description').touched || submitted)}
                       label={t('DESCRIPTION')} multiline variant="outlined"
                       helperText={(form.get('description').hasError() && (form.get('description').touched || submitted))
                       && form.get('description').errorList[0]} value={form.get('description').value}
                       onBlur={handleTouch('description')}
                       onChange={handleChange('description')} fullWidth/>
            <br/><br/>
            <div className={classes.uploadButton}>
                <Button onClick={() => fileCtrl.click()} variant="outlined">
                    {t('UPLOAD_FILE')} {file ? `(${file.name})` : ''}
                </Button>
                <input style={{visibility: 'hidden'}} ref={f => fileCtrl = f} type="file" onChange={() => handleFile(fileCtrl.files)}/>
            </div>
        </div>
)};

const styledComponent = withStyles(styles)(CreateOrder);
export default translate('CreateOrder')(styledComponent);
