import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
    useFirestore,
    useFirestoreDocData
} from 'reactfire';
import 'firebase/firestore';
import useWebSocket from 'react-use-websocket';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { TwitchChat } from 'react-twitch-embed';
import { WS_EventTypes } from '../models/WS_EventTypes';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        "player-wrapper": {
            position: "relative",
            "padding-top": "56.25%",
            height: "100%",
            width: "100%",
        },
        'react-player': {
            position: "absolute",
            top: "0",
            left: "0",
            'flex-wrap': 'left'
        },
        'watch-together-chat': {
            position: 'absolute',
            top: '0%',
            left: '70%',
            height: '70%',
            width: '30%',
        },
        'watch-together-container': {
            display: 'flex',
            paddingTop: '10px'
        }
    })
);

const WatchTogether = () => {
    const { sessionId } = useParams<{sessionId: string}>();
    const styles = useStyles();
    const {
        sendJsonMessage,
        readyState
    } = useWebSocket(`ws://localhost:8000/${window.location.pathname.split('/')[2]}`, {
        onOpen: () => console.log('Opened!'),
        shouldReconnect: (closeEvent) => {
            console.log(closeEvent);
            return true;
        },
        onMessage: (message) => {
            const d = JSON.parse(message.data.toString());
            console.log(d);
            if (d.type === WS_EventTypes.PlayerState) {
                setIsPlaying(d.state);
            } else if (d.type === WS_EventTypes.Chat) {
                setWatchTogetherChat(previousState => [
                    ...previousState,
                    {message: d.message, sentDate: new Date(d.sentDate), userId: d.userId}
                ]);
            }
        }
    })

    const [isPlaying, setIsPlaying] = useState(true);
    const sendStateMessage = (state: boolean) => {
        if (readyState === 1) {
            sendJsonMessage({state: state, type: WS_EventTypes.PlayerState});
        }
    };

    const [watchTogetherChat, setWatchTogetherChat] = useState([{
        message: 'SYSMSG: Welcome to Chat!',
        sentDate: new Date(),
        userId: 'SYS'
    }]);

    const sessionRef = useFirestore().collection('watch-together').doc(sessionId);
    const {status, data}: {status: any, data: any} = useFirestoreDocData(sessionRef);
    console.log(data);

    if (status === 'loading') {
        return (
            <CircularProgress />
        )
    } else {
        return (
            <div className={styles['watch-together-container']}>
                <div className={styles['player-wrapper']}>
                    <ReactPlayer
                        url={data.videoHref as string}
                        muted={false}
                        playing={isPlaying}
                        controls
                        className={styles['react-player']}
                        height="70%"
                        width="70%"
                        onPause={() => sendStateMessage(false)}
                        onPlay={() => sendStateMessage(true)}
                    />
                    <TwitchChat
                        className={styles['watch-together-chat']}
                        id={`twitch-chat-embed-${data.videoHref}`}
                        channel={(data.videoHref as string).substring(data.videoHref.lastIndexOf('/') + 1)}
                    />
                </div>
            </div>
        )
    }
};

export default WatchTogether;