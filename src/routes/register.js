/**
 * Routes - Register
 *
 * @file   favorites.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {registerUser} from '../redux/actions/userActions';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';
import DOMPurify from 'dompurify';
import {emailIsValid, passwordValidator} from "../utils/validation";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/1055921)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    //React Hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(
        state => state.userReducer
    );

    console.log("USER State: ", user);

    /**
     * Handle the Registration Submit
     * @param event - Object
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
        //Input Validation
        if (!emailIsValid(email)) {
            setErrorMessage("Invalid Email Format used!");
            setOpen(true);
        } else if (password !== passwordConfirm) {
            setOpen(true);
            setErrorMessage("Passwords do not match!");
        } else if (!passwordValidator(password)) {
            setOpen(true);
            setErrorMessage("Password must be have 8 character or more, at least one number and one capital letter!");
        } else {
            dispatch(registerUser(email, password, name));
            if (!_.isNil(user.status === 200)) {
                setErrorMessage("Account Created Successfully!");
            }
        }
    };


    /**
     * Close popup
     * @param event - Object
     */
    function handleClose(event) {
        setOpen(false);
    }

    //If user is already logged in, redirect to main page
    let redirect;
    if (user.status === 200) {
        redirect = <Redirect to='/login'/>;
    }


    return (
        <LoadingOverlay
            active={user.loading}
            spinner
            text='Loading your content...'
        >
            {redirect}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{errorMessage}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />

            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <MoodOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={e => setName(DOMPurify.sanitize(e.target.value))}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => setEmail(DOMPurify.sanitize(e.target.value))}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(DOMPurify.sanitize(e.target.value))}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="passwordConf"
                                label="Confirm Password"
                                type="password"
                                id="passwordConf"
                                autoComplete="current-password"
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(DOMPurify.sanitize(e.target.value))}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        {"Already have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </LoadingOverlay>);
}

