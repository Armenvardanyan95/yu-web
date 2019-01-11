import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-translate';

const styles = theme => ({});

const services = class extends React.Component {

};

const styledComponent = withStyles(styles)(services);
const componentWithRouter = withRouter(styledComponent);
export default translate('Services')(componentWithRouter);