import React from "react";
import GoogleLogin from "react-google-login";
import { Button, Link } from "@material-ui/core";

export default function ActivateServices() {
    const YT_CLIENT_ID = process.env.REACT_APP_YOUTUBE_API_CLIENT_ID!;
    const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_API_CLIENT_ID!;

    const responseGoogleSuccess = (response: any) => {
        console.log(response);
        window.localStorage.setItem('ytToken', JSON.stringify(response));
      }

    return (
        <div>
            <GoogleLogin
                clientId={YT_CLIENT_ID}
                render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleSuccess}
                cookiePolicy={'single_host_origin'}
                scope={'https://www.googleapis.com/auth/youtube.readonly'}
            />

            <Link 
                href={`https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://localhost:3000/twitch-redirect-url&response_type=token&scope=viewing_activity_read user_read openid`}
            >
                Login with Twitch
            </Link>
        </div>
    )
};