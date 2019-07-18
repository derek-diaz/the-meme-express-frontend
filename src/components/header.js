/**
 * Generate header
 *
 * @file   header.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../img/The-Meme-Express.png';
import {useSelector} from 'react-redux'
import _ from "lodash";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Header() {
    const classes = useStyles();
    const user = useSelector(
        state => state.userReducer
    );

    //Wipe the browser localStorage
    function logout(e) {
        localStorage.clear();
        window.location.reload();
    }

    //Check if the user is logged in to generate the appropriate header.
    if (!_.isNil(user.data) && !_.isNil(user.data.id)) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title}>
                            <Link to="/home"><img src={logo} alt="Logo"/></Link>
                        </Typography>
                        <Link to="/favorites"><Button variant="contained" color="primary"
                                                      className={classes.button}>My Favorites</Button></Link>
                        <Link to="/home"><Button variant="contained" color="primary"
                                                 className={classes.button}>Find Ghiphys</Button></Link>
                        <Link to="/login" onClick={(e) => {
                            logout(e)
                        }}><Button variant="contained" color="primary"
                                   className={classes.button}>Logout</Button></Link>
                    </Toolbar>
                </AppBar>
            </div>
        );

    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title}>
                            <Link to="/"><img src={logo} alt="Logo"/></Link>
                        </Typography>
                        <Link to="/login"><Button variant="contained" color="primary"
                                                  className={classes.button}>Login</Button></Link>
                        <Link to="/register"><Button variant="contained" color="primary"
                                                     className={classes.button}>Register</Button></Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}