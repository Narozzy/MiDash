import { Box, Button, Link, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ReactPlayer from "react-player";
import { TwitchProps } from "../models/TwitchPlayer.models";

const TwitchPlayer = (props: TwitchProps) => {
    const { twitchFollows } = props;

    const createWatchTogetherPage = (videoSrc: string) => {
        console.log(videoSrc);
        return axios.post(
            'https://us-central1-personaldashboard-281018.cloudfunctions.net/createWatchTogetherSessions',
            { videoHref: videoSrc }
        ).then(d => window.location.pathname = `/watch-together/${d.data}`);
    }

    return (
        <Box>
            <Carousel interval={15 * 1000} animation="slide">
                {twitchFollows && twitchFollows.map((stream: { user_login: string; to_id: string; }) => {
                    return (
                        <Paper key={`paper-${stream.to_id}`}>
                            <ReactPlayer role="presentation" key={stream.to_id} url={`https://www.twitch.tv/${stream.user_login}`} muted={true} />
                            <Button onClick={e => createWatchTogetherPage(`https://www.twitch.tv/${stream.user_login}`)}>Create Watch Together</Button>
                        </Paper>
                    );
                })}
            </Carousel>
            {!(twitchFollows.length > 0) &&
                <Typography>
                    You may need to reauthenticate with Twitch, navigate to <Link href="/activate-service">the Activate Service tab</Link> to reauthenticate.
                </Typography>
            }
        </Box>
    )
};

export default TwitchPlayer;