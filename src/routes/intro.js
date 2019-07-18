/**
 * Routes - Introduction
 *
 * @file   intro.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import logo from "../img/The-Meme-Express-md2.png";
import {Link} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent/CardContent";

const useStyles = makeStyles(theme => ({
    image: {
        height: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/collection/1055921)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(20),
        padding: theme.spacing(2),
    },
    card: {
        minWidth: 275,
    },
}));


function Intro() {
    const classes = useStyles();
    return  <Grid container className={classes.image}>
        <Grid item xs={12}>
            <Card className={classes.paper}>
                <CardContent>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        <Link to="/home"><img align="center" src={logo} alt="Logo"/></Link>
                    </Typography>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Welcome to The Meme Express! SHOO SHOO!
                    </Typography>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Register or login to board the train!
                    </Typography>
                </CardContent>
            </Card>

        </Grid>

        </Grid>;
}

export default Intro