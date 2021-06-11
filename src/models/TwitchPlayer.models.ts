export interface TwitchProps {
    twitchFollows: TwitchFollow[]
}

interface TwitchFollow {
    user_login: string;
    to_id: string;
}