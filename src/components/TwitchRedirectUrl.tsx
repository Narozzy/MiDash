import React from "react";

export class TwitchRedirectUrl extends React.Component {
    componentDidMount() {
        const token = window.location.hash
            .split('&')
            .map(v => v.replace('#', '').split('='))
            .reduce((pre, [k,v]) => ({...pre, [k]: v}), {});
        sessionStorage.setItem('tauth', JSON.stringify(token));
        window.location.href = window.location.href.substr(0, window.location.href.indexOf('#')).replace('/twitch-redirect-url', '/activate-service');
    }
    render() {
        return (<></>);
    }
}