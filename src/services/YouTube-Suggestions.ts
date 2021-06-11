import axios, { AxiosResponse } from "axios";
import { from } from "rxjs";
import { map } from "rxjs/operators";
const jsonpAdapter = require('axios-jsonp');

export default class YoutubeSuggestion {
    private readonly GOOGLE_AC_URL: string = 'https://clients1.google.com/complete/search';

    public suggest = async () => {
        console.log('Calling GOOGLE_AC_URL');
        return await axios({
            url: this.GOOGLE_AC_URL,
            adapter: jsonpAdapter,
            params: {
                client: "youtube",
                hl: "en",
                ds: "yt",
                q: 'gaming',
              }
        })
        .then((res: AxiosResponse) => {
            console.log('jsonp results >> ', res);
            if (res.status !== 200) {
                throw Error('Suggest API failed!');
            }
            return res.data[1].map((item: any[]) => item[0]);
        })
        .catch((err) => console.error(err));
    };

    public getPopularVideos$ = () => {
        console.log('CALLING POP VIDS');
        return from(axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY!}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('ytToken')!).accessToken}`
                }
            }
        )).pipe(
            map(d => d.data.items.map((video: { id: any; }) => video.id))
        )
    }
}