import axios from "axios";
import { from, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

export default class TwitchService {
    private getUserInfo$(): Observable<any> {
        return from(axios.get(
            'https://api.twitch.tv/helix/users', {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('tauth')!).access_token}`,
                    'Client-Id': process.env.REACT_APP_TWITCH_API_CLIENT_ID!
                }
            }
        )).pipe(
            map(d => d.data.data[0])
        );
    }

    public getUserFollows$(): Observable<any> {
        return this.getUserInfo$().pipe(
            mergeMap((userInfo) => {
                return axios.get(
                    `https://api.twitch.tv/helix/users/follows?from_id=${userInfo.id}&first=100`, {
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('tauth')!).access_token}`,
                            'Client-Id': process.env.REACT_APP_TWITCH_API_CLIENT_ID!
                        }
                    }
                ).then(
                    d => d.data.data
                );
            })
        );
    }

    public getOnlineStreams$(): Observable<any> {
        return this.getUserFollows$().pipe(
            mergeMap((followedStreams: any[]) => {
                const url = `https://api.twitch.tv/helix/streams?user_id=${followedStreams.map((stream) => stream.to_id).join('&user_id=')}`
                return axios.get(
                    url, {
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('tauth')!).access_token}`,
                            'Client-Id': process.env.REACT_APP_TWITCH_API_CLIENT_ID!
                        }
                    }
                )
                .then(d => d.data.data)
            })
        );
    }
}