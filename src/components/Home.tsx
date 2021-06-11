import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TwitchService from '../services/Twitch-Service';
import YouTubeSuggestions from '../services/YouTube-Suggestions';
import TwitchPlayer from './TwitchPlayer';
import YoutubePlayer from './YoutubePlayer';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            alignItems: 'center',
            paddingTop: '10px'
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)'
        }
    })
);

const Home = () => {
    const [twitchFollows, setTwitchFollows] = useState([]);
    const [ytVideos, setYouTubeVideos] = useState([]);

    const ytSuggestions = new YouTubeSuggestions();
    const twitchService = new TwitchService();

    useEffect(() => {
        if (sessionStorage.getItem('tauth')) {
            twitchService.getOnlineStreams$().subscribe(d =>  {
                setTwitchFollows(d);
            });
        }

        ytSuggestions.getPopularVideos$().subscribe(d => {
            setYouTubeVideos(d);
        })
    }, []);

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <TwitchPlayer twitchFollows={twitchFollows} />
                <YoutubePlayer ytVideos={ytVideos} />
            </div>
        </div>
    );
}

export default Home;