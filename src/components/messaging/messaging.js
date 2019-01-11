import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';

import { messagesService } from '../../common/messages.service';
import { ChatBox } from '../../components/chat-box';
import userService from '../../common/user.service';
import { store } from '../../state/store';

import UserImage from '../../assets/defaul_profil_pic.png';

const styles = theme => ({
    paper: {
        display: 'flex',
        justifyContent: 'flexstart',
        minHeight: 800,
    },
    search: {
        width: '100%',
        border: 'none',
        borderBottom: 'solid',
        borderRight: 'solid',
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        borderRightColor: 'lightgray',
        outline: 'none',
        padding: 1,
        height: 40,
        fontSize: 18,
    },
    searchIcon: {
        position: 'absolute',
        color: 'lightgray',
        top: 7,
        right: 5,
    },
    sidebar: {
        margin: 0,
        borderRight: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'lightgray'
    },
});

const chatItemStyles = theme => ({
    chatBox: {
        width: 300,
        height: 100,
    },
    title: {
        marginLeft: 10,
    },
});

const chatItem = ({chat, classes, handleClick, selectedChat}) => ([
    <MenuItem key={0} className={classes.chatBox} onClick={handleClick} selected={selectedChat && chat.id === selectedChat.id}>
        {
            (() => {
                const profilePicPath =  (chat.user && chat.user.profilePic) ?
                    userService.fullPrefix + '/profile-pic/' + chat.user.profilePic :
                    UserImage;
                return (
                    <ListItemAvatar>
                        <Avatar src={profilePicPath}/>
                    </ListItemAvatar>
                );
            })()
        }
        <p className={classes.title}>
            <b>{chat.user.firstName} {chat.user.lastName}</b>
        </p>
    </MenuItem>,
    <Divider key={1}/>
]);

const Chat = withStyles(chatItemStyles)(chatItem);

const Chats = ({chats, onChatSelect, selectedChat}) => {
    return chats && chats.length ?
        (<MenuList>
            {
                chats.map(chat => <Chat key={chat.id} selectedChat={selectedChat} handleClick={onChatSelect(chat)} chat={chat}/>)
            }
        </MenuList>) : <MenuItem>Nothing Found</MenuItem>
};

const messaging = class extends React.Component {

    allChats = [];

    state = {
        chats: [],
        selectedChat: null,
    };

    async componentDidMount() {
        let chats = [];
        const res = await messagesService.getAllChats();
        const { user } = store.getState();
        if (res.success) {
            chats = res.data.map(chat => ({...chat, user: user.isAdmin ? chat.client : chat.assignee}));
        }
        this.setState({chats});
        this.allChats = [...chats];
    }

    selectChat = chat => () => this.setState({selectedChat: chat});

    filter = event => {
        const query = event.target.value.toLowerCase();
        const filterBy = chat => chat.user.firstName.toLowerCase().startsWith(query) ||
            chat.user.lastName.toLowerCase().startsWith(query);
        const chats = this.allChats.filter(filterBy);
        this.setState({chats});
    };

    render() {
        const { classes } = this.props;
        const { chats, selectedChat } = this.state;
        return (
            <Paper className={classes.paper}>
                <div className={classes.sidebar}>
                    <div style={{position: 'relative'}}>
                        <input className={classes.search} onChange={this.filter}/>
                        <SearchIcon className={classes.searchIcon}/>
                    </div>
                    <Chats chats={chats} selectedChat={selectedChat} onChatSelect={this.selectChat}/>
                </div>
                {selectedChat ? <ChatBox selectedChat={selectedChat}/> : null}
            </Paper>
        );
    }

};

const styledComponent = withStyles(styles)(messaging);
const componentWithRouter = withRouter(styledComponent);
export default translate('Messaging')(componentWithRouter);
