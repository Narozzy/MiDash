import { render, configure, RenderResult } from '@testing-library/react';
import TwitchPlayer from './TwitchPlayer';

describe('TwitchPlayer', () => {
    let twitchComponent: RenderResult;
    beforeEach(() => {
        const mockTwitchFollows = [{ to_id: '123', user_login: 'some-user' }];

        configure({ testIdAttribute: 'testTwitchPlayer' })
        twitchComponent = render(<TwitchPlayer twitchFollows={mockTwitchFollows} />)
    });

    test('it should be defined', () => {
        expect(twitchComponent.baseElement).toBeInTheDocument();
    });

    test('it should display streams provided by TwitchAPI', () => {
        expect(twitchComponent.queryByRole('presentation')).toBeInTheDocument();
    });
});