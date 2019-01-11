import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';
import { messagesService } from '../common/messages.service';
import classNames from 'classnames';
import userService from '../common/user.service';
import UserProfileDeafult from '../assets/defaul_profil_pic.png';
import TypingGif from '../assets/typing.gif';

import { store } from '../state/store';

function isExternalLink(url) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url);
}

const externalLink = ({url, classes}) => <a className={classes.link} href={url} target="_blank">{url}</a>

const linkStyles = theme => ({
    link: {
        color: theme.palette.secondary.light,
        marginRight: 3,
        marginLeft: 3,
        wordBreak: 'break-all',
    }
});

const ExternalLink = withStyles(linkStyles)(externalLink);

const imageView = ({url, classes, onClose}) => {
    if (!!url) {
        return (
            <div className={classes.overlay}>
                <img src={messagesService.fullPrefix + `/attachment/${url}`} className={classes.image}/>
                <div className={classes.closeArea} onClick={onClose}>
                        <CloseIcon className={classes.close}/>
                </div>
            </div>
        );
    }
    return null;
};

const imageViewStyles = theme => ({
    overlay: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    image: {
        margin: 'auto',
        marginTop: 35,
        maxWidth: 1230,
        maxHeight: 950,
        width: 'auto',
        height: 'auto',
    },
    close: {
        color: 'white',
        marginTop: '25%',
        fontSize: 45,
        marginRight: '25%',
    },
    closeArea: {
        height: '100vh',
        position: 'fixed',
        zIndex: '10000',
        cursor: 'pointer',
        top: 0,
        right: 0,
        width: 90,
        '&:hover': {
            backgroundColor: 'rgb(0, 0, 0, 0.55)',
        },
    },
});

const ImageView = withStyles(imageViewStyles)(imageView);

const styles = theme => ({
    container: {
        width: '100%',
        height: 800,
        maxHeight: 800,
        position: 'relative',
    },
    messagesBox: {
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'auto',
        height: 700,
        justifyContent: 'flex-end',
        flexFlow: 'row wrap',
    },
    messagesInputContainer: {
        width: '100%',
        height: 55,
        position: 'absolute',
        bottom: 0,
    },
    titleAvatar: {
        width: 27,
        height: 27,
        marginLeft: 18,
    },
    messagesInput: {
        width: '98%',
        height: 40,
        border: 'none',
        borderTop: 'solid',
        borderTopColor: 'lightgray',
        borderTopWidth: 0.5,
        outline: 'none',
        fontSize: 18,
        padding: 7,
        resize: 'none',
    },
    sendIcon: {
        color: theme.palette.primary.light,
        position: 'absolute',
        bottom: 3,
        right: 1,
    },
    attachIcon: {
        color: theme.palette.primary.light,
        position: 'absolute',
        bottom: 3,
        right: 40,
    },
    title: {
        borderBottom: 'solid',
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
    },
    fullName: {
        marginLeft: 10,
    },
    typingItem: {
        display: 'flex',
        alignItems: 'center',
    },
    typingText: {
        height: 20,
        marginRight: 3,
        marginLeft: 3,
    },
    onlineStatus: {
        marginLeft: 'auto',
        marginRight: 15,
    },
    onlineBadge: {
        borderRadius: '50%',
        backgroundColor: 'forestgreen',
        width: 7,
        height: 7,
        display: 'inline-block',
    },
    offlineBadge: {
        borderRadius: '50%',
        backgroundColor: 'lightgray',
        width: 7,
        height: 7,
        display: 'inline-block',
    },
});

const messageStyles = theme => ({
    box: {
        width: '100%',
    },
    messageItem: {
        width: 300,
        margin: 10,
        borderRadius: 10,
        padding: 5,
    },
    mine: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        float: 'right',
    },
    theirs: {
        backgroundColor: theme.palette.primary.light,
        color: 'black',
    },
    unread: {
        backgroundColor: 'lightgrey',
    },
    messageLine: {
        marginBottom: -5,
    },
    image: {
        maxWidth: 230,
        maxHeight: 95,
        width: 'auto',
        height: 'auto',
        cursor: 'pointer',
    },
});

const message = ({classes, msg, userID, markAsRead, onImageView}) => {
    const author = msg.author && msg.author.id;
    const cls = userID === author ? classes.mine : classes.theirs;
    const unread = !msg.isRead && author === userID;
    return (
        <div onMouseEnter={markAsRead} className={classNames(classes.box, unread ? classes.unread : null)}>
            <div className={classNames(classes.messageItem, cls)}>
                {
                    (() => {
                        if (msg.image) {
                            return <img onClick={onImageView(msg.image)} className={classes.image}
                                        src={messagesService.fullPrefix + `/attachment/${msg.image}`}/>
                        } else if (msg.file) {

                        } else {
                            return msg.content.split('\n').map(line => (<p className={classes.messageLine}>{
                                line.split(' ').map(word => isExternalLink(word) ? <ExternalLink url={word}/> : word)
                            }</p>))
                        }
                    })()
                }
            </div>
        </div>
    );
};

const Message = withStyles(messageStyles)(message);

class ChatBox extends React.Component {

    page = 1;
    messagesBox = null;
    timeout = null;
    imageUploader = null;
    fileUploader = null;
    state = {
        messages: [],
        isSendingMessage: false,
        isUploadingFile: false,
        hasBody: false,
        userID: null,
        typing: false,
        uploadAnchor: null,
        viewedImage: null,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedChat.id !== this.props.selectedChat.id) {
            this.getMessages(nextProps);
        }
    }

    componentDidMount() {
        this.setState({userID: store.getState().user.id});
        this.getMessages(this.props);
        messagesService.connectToChat(this.props.selectedChat.id);
        messagesService.listenToMessages(this.props.selectedChat.id)
            .subscribe(notification => {
                switch (notification.type) {
                    case 1:
                        this.receiveMessage(notification.data);
                        break;
                    case 2:
                        return this.receiveMarkAsRead(notification.data);
                        break;
                    case 3:
                        return this.receiveTyping(notification.data);
                        break;
                }
            });
    }

    receiveMessage(message) {
        if (message.author.id !== this.state.userID) {
            this.setState(prevState => ({messages: [...prevState.messages, message]}));
        }
        setTimeout(() => this.messagesBox.scrollTop = this.messagesBox.scrollHeight);
    }

    receiveTyping(message) {
        if (message.userID !== this.state.userID) {
            this.setState({typing: true});
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.setState({typing: false});
                    this.timeout = null;
                    }, 3000);
            } else {
                this.timeout = setTimeout(() => {
                    this.setState({typing: false});
                    this.timeout = null;
                }, 3000);
            }
        }
    }

    receiveMarkAsRead(id) {
        const messages = this.state.messages.map(message => {
            if (message.id === id) {
                message.isRead = true;
            }
            return message;
        });

        this.setState({messages});
    }

    async getMessages({ selectedChat }) {
        const res = await messagesService.getMessages(selectedChat.id, this.page);
        if (res.success) {
            this.setState(prevState => ({messages: [...res.data, ...prevState.messages]}));
            setTimeout(() => this.messagesBox.scrollTop = this.messagesBox.scrollHeight);
        }
    }

    sendMessage = async target => {
        this.setState({isSendingMessage: true});
        const content = target.value;
        const res = await messagesService.sendMessage({content, chat: this.props.selectedChat.id});
        if (res.success) {
            this.setState(prevState => ({isSendingMessage: false, messages: [...prevState.messages, res.data]}));
            target.value = '';
            this.setState({hasBody: false});
        }
    };

    sendImage = async event => {
        this.setState({isUploadingFile: true});
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('chat', this.props.selectedChat.id);
        const res = await messagesService.uploadAttachment(formData);
        if (res.success) {
            this.setState(prevState => ({isUploadingFile: false, messages: [...prevState.messages, res.data]}));
        }
    };

    markMessageAsRead =  message => async() => {
        const { userID } = this.state;
        if (message.author.id !== userID && !message.isRead) {
            await messagesService.markAsRead(message.id);
        }
    };

    onInput = event => {
        this.setState({hasBody: event.target.value !== ''});
    };

    onEnter = event => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.sendMessage(event.target);
        } else {
            messagesService.sendTyping(this.props.selectedChat.id);
        }
    };

    openUploadDrawer = event => {
        this.setState({uploadAnchor: event.target});
    };

    handleUploadClick = type => () => {
        switch (type) {
            case 'image':
                this.imageUploader.click();
                break;
            case 'file':
                this.fileUploader.click();
                break;
        }
    };

    openImageView = url => () => this.setState({viewedImage: url});

    closeImageView = () => this.setState({viewedImage: null});

    handleCloseUploadMenu = () => {
        this.setState({uploadAnchor: null});
    };

    render() {
        const { classes, t, selectedChat } = this.props;
        const { messages, isSendingMessage, viewedImage, isUploadingFile,
            uploadAnchor, hasBody, userID, typing } = this.state;
        let input = {value: ''};
        return (
            <div className={classes.container}>
                <div className={classes.title}>
                    {
                        (() => {
                            const profilePicPath =  (selectedChat.user && selectedChat.user.profilePic) ?
                                userService.fullPrefix + '/profile-pic/' + selectedChat.user.profilePic :
                                UserProfileDeafult;
                            return (
                                    <Avatar className={classes.titleAvatar} src={profilePicPath}/>
                            );
                        })()
                    }
                    <b className={classes.fullName}>{selectedChat.user.firstName} {selectedChat.user.lastName}</b>
                    {typing ?
                        <div className={classes.typingItem}>
                            <span className={classes.typingText}>{t('TYPING')}</span>
                            <img height="20" src={TypingGif}/>
                        </div> :
                        null}
                    {
                        selectedChat.user.isOnline ?
                            <div className={classes.onlineStatus}>online <div className={classes.onlineBadge}></div></div>
                            :
                            <div className={classes.onlineStatus}>offline <div className={classes.offlineBadge}></div></div>
                    }
                </div>
                {
                    userID ?
                    <div className={classes.messagesBox} ref={d => this.messagesBox = d}>
                        {
                            messages.map(message => <Message onImageView={this.openImageView} key={message.id}
                                                             markAsRead={this.markMessageAsRead(message)}
                                                             userID={userID} msg={message}/>)
                        }
                    </div> : null
                }
                <div className={classes.messagesInputContainer}>
                    <textarea className={classes.messagesInput} cols="10" onChange={this.onInput}
                               ref={i => input = i} onKeyDown={this.onEnter} />
                    {
                        isUploadingFile ?
                        <CircularProgress className={classes.attachIcon}/> :
                        <Tooltip title={t('ATTACH')}>
                            <IconButton className={classes.attachIcon} onClick={this.openUploadDrawer}>
                                <AttachFileIcon/>
                            </IconButton>
                        </Tooltip>

                    }
                    <Menu
                        anchorEl={uploadAnchor}
                        open={Boolean(uploadAnchor)}
                        onClose={this.handleCloseUploadMenu}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <MenuItem onClick={this.handleUploadClick('image')}>Image</MenuItem>
                        <MenuItem onClick={this.handleUploadClick('file')}>File</MenuItem>
                    </Menu>
                    <input style={{display: 'none'}} type="file" onChange={this.sendImage} ref={i => this.imageUploader = i}/>
                    <input style={{display: 'none'}} type="file" ref={f => this.fileUploader = f}/>
                    {
                        isSendingMessage ?
                        <CircularProgress className={classes.sendIcon}/> :
                        <Tooltip title={t('SEND')}>
                            <IconButton disabled={!hasBody} className={classes.sendIcon}
                                        onClick={() => this.sendMessage(input)}>
                                <SendIcon/>
                            </IconButton>
                        </Tooltip>

                    }
                </div>
                <ImageView url={viewedImage} onClose={this.closeImageView}/>
            </div>
        )
    }
}

const styledComponent = withStyles(styles)(ChatBox);
const componentWithRouter = withRouter(styledComponent);
const translatedComponent = translate('ChatBox')(componentWithRouter);

export { translatedComponent as ChatBox };
