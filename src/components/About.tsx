import { Paper, Typography } from "@material-ui/core";

export default function About() {
    return (
        <Paper>
            <Typography variant="h2">About MiDash</Typography>

            <Typography variant="body1" paragraph={true}>
                This is about customization. All your favorite feeds, all in one place.
            </Typography>
        </Paper>
    );
};