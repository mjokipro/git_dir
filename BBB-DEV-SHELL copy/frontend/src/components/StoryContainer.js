import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            {/*<p>"There once was a {noun} from Peru. They {adverb}dreamed they were {verb} their shoe. And when they awoke, with {adj} voice they did spoke: "I knew that my dream would come true!</p>*/}
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);



const StoryContainer = ({ adj, adverb, noun, verb })  => {
    return (

        <Box sx={{ minWidth: 275 }}>
            <Card adj={adj} adverb={adverb} noun={noun} verb={verb} variant="outlined">
                <p>"There once was a {noun} from Peru.</p>
                <p>  They dreamt they were {verb} their shoe.</p>
                <p>  And when they {adverb} awoke, with {adj} voice they did spoke:</p>
                <p>  "I knew that my dream would come true!</p>
                {card} </Card>
        </Box>
        
        )
}
export default StoryContainer;
// JavaScript source code
