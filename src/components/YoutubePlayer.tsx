import { Link, Paper, Typography } from "@material-ui/core"
import React from "react"
import Carousel from "react-material-ui-carousel"
import ReactPlayer from "react-player"
import { YouTubeProps } from "../models/YoutubePlayer.models";

const YoutubePlayer = (props: YouTubeProps) => {
    return (
        <div>
            <Carousel interval={15 * 1000} animation="slide">
                {props.ytVideos && props.ytVideos.map((video) => {
                    return (
                        <Paper key={`paper-${video}`}>
                            <ReactPlayer 
                                url={`https://www.youtube.com/watch?v=${video}`}
                                muted={true}
                                playing={false}
                                controls={true}
                            />
                        </Paper>
                    )
                })}
            </Carousel>
            {!(props.ytVideos.length > 0) &&
                <Typography>
                    You may need to reauthenticate with YouTube, navigate to <Link href="/activate-service">the Activate Service tab</Link> to reauthenticate.
                </Typography>
            }
        </div>
    )
};

export default YoutubePlayer;