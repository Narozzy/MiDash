import 'react-chat-elements/dist/main.css';
import { MessageList, Input } from 'react-chat-elements';
import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WS_EventTypes } from '../models/WS_EventTypes';
import React from 'react';

interface WatchTogetherChatProps {
    chat: Chat[];
    ws: WebSocket | null
}

interface Chat {
    message: string;
    sentDate: Date;
    userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        "incoming-chat": {
            '& .rce-mbox': {
                backgroundColor: '#5e70d1',
            }
        },
        'chat-container': {
            flex: 1,
            marginLeft: '10px',
            height: '100%',
            position: 'relative',
            backgroundColor: 'rgba(0,0,0,0.3)',
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        'chat-textarea-container': {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            marginLeft: '10px'
        }
    })
);

const WatchTogetherChat = ({ chat, ws }: WatchTogetherChatProps) => {
    const styles = useStyles();

    useEffect(() => {
        if (!window.localStorage.getItem('userId')) {
            window.localStorage.setItem('userId', uuidv4());
        }
    }, [])

    const sendChatMessage = () => {
        if (!!ws && chatMessage.length > 0) {
            ws.send(JSON.stringify({
                type: WS_EventTypes.Chat,
                message: chatMessage,
                sentDate: new Date(),
                userId: window.localStorage.getItem('userId')
            }));
            setChatMessage('');
        }
    };

    const isEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    };

    const [chatMessage, setChatMessage] = useState('');

    return (
        <Box>
            <Box className={styles['chat-container']}>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={300}
                    dataSource={chat.map(c => {
                        return ({
                            key: `msg-${c.sentDate.toString()}-${new Date().toString()}`,
                            type: 'text',
                            notch: false,
                            position: window.localStorage.getItem('userId') === c.userId ? 'right' : 'left',
                            className: window.localStorage.getItem('userId') === c.userId ? '' : styles['incoming-chat'],
                            text: c.message,
                            date: c.sentDate,
                        })
                    })}
                />
            </Box>
            <Box className={styles['chat-textarea-container']}>
                <Input
                    value={chatMessage}
                    multiline={true}
                    maxlength={500}
                    placeholder="Enter chat..."
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => isEnter(e)}
                    rightButtons={
                        <Button onClick={sendChatMessage} disabled={ !!ws && (ws.readyState !== 1 || !chatMessage)}>Send</Button>
                    }
                />
            </Box>
        </Box>
    )
};

export default WatchTogetherChat;