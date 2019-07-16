import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid/Grid";
import {useDispatch, useSelector} from "react-redux";
import {searchGiphy} from '../redux/actions/giphyActions';
import DOMPurify from "dompurify";
import LoadingOverlay from "react-loading-overlay";
import _ from "lodash";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Input from "@material-ui/core/Input/Input";
import {Link, Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: '20px'
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: '250px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


function Home() {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const [open, setOpen] = React.useState(false);
    const [save, setSave] = React.useState("");
    const [category, setCategory] = React.useState("");
    const dispatch = useDispatch();
    const giphy = useSelector(
        state => state.giphyReducer
    );
    const user = useSelector(
        state => state.userReducer
    );
    console.log("USER State: ",user);

    function handleLastQuery(q) {
        setLastQuery(q);
    }

    function saveFavorite(event, id) {
        event.preventDefault();
        setOpen(true);
        setSave(id);
        console.log("SAVING: ", id);
    }

    function saveFavoriteCategory(event, category) {
        event.preventDefault();
        console.log("SAVING: ", category);
        setOpen(false);
    }

    function enterPressed(event) {
        if (event.key === 'Enter') {
            search(event);
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function search(event) {
        event.preventDefault();
        handleLastQuery(searchQuery);
        //Do not search if there's nothing
        if (!_.isNil(searchQuery)) {
            dispatch(searchGiphy(searchQuery, 0));
        }
    }

    function generateList(data) {
        if (!_.isNil(data)) {
            return data.map((gif, index) => (
                <Grid key={index} item xs>
                    <Card className={classes.card}>
                        <CardHeader
                            title={gif.title.replace("GIF", "")}
                        />

                        <img
                            className={classes.media}
                            src={gif.images.downsized_medium.url}
                            title={gif.title}
                        />
                        <CardActions disableSpacing>
                            <a href="" onClick={(e) => {
                                saveFavorite(e, gif.id)
                            }}> <IconButton aria-label="Add to favorites">
                                <FavoriteIcon/>
                            </IconButton></a>
                            <IconButton aria-label="Share">
                                <ShareIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ));
        }
    }

    //If user is already logged in, redirect to main page
    let redirect;
    if (!_.isNil(user.data) && _.isNil(user.data.id)) {
        redirect = <Redirect to='/login'/>;
    }

    return (
        <div className={classes.root}>
            {redirect}
            <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Giphy"
                            value={searchQuery}
                            onKeyDown={(e) => {
                                enterPressed(e)
                            }}
                            onChange={e => setSearchQuery(DOMPurify.sanitize(e.target.value))}
                            inputProps={{'aria-label': 'Search Giphy'}}
                        />
                        <a href="" onClick={(e) => (search(e))}><IconButton className={classes.iconButton}
                                                                            aria-label="Search">
                            <SearchIcon/>
                        </IconButton></a>
                    </Paper>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {generateList(giphy.data)}
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Please select a category to save this GIPHY under.
                    </DialogContentText>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={category}
                                onChange={e => setCategory(DOMPurify.sanitize(e.target.value))}
                                input={<Input id="age-simple"/>}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'lol'}>LOL</MenuItem>
                                <MenuItem value={'funny'}>Funny!</MenuItem>
                                <MenuItem value={'dank'}>Dank!</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => {saveFavoriteCategory(e, category)}} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Home