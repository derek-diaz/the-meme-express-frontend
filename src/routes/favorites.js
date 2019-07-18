/**
 * Routes - Favorites
 *
 * @file   favorites.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid/Grid";
import {useDispatch, useSelector} from "react-redux";
import DOMPurify from "dompurify";
import _ from "lodash";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardActions from "@material-ui/core/CardActions/CardActions";
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Input from "@material-ui/core/Input/Input";
import {Redirect} from "react-router-dom";
import {listFavorite, updateFavorite, deleteFavorite} from '../redux/actions/favoriteActions'
import Typography from "@material-ui/core/Typography/Typography";

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


function Favorites() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [save, setSave] = React.useState("");
    const [category, setCategory] = React.useState("");
    const dispatch = useDispatch();
    const user = useSelector(
        state => state.userReducer
    );
    const favorite = useSelector(
        state => state.favoritesReducer
    );

    //OnLoad
    useEffect(() => {
        dispatch(listFavorite(user.data.token));
        console.log(favorite);
    }, []);

    /**
     * Save the id into a hook of the git to be edited and launch popup
     * @param event
     * @param id
     */
    function editFavorite(event, id) {
        event.preventDefault();
        setOpen(true);
        setSave(id);
        console.log("EDITING: ", id);
    }

    /**
     * Initiate the removal of gif
     * @param event
     * @param id
     */
    function removeFavorite(event, id) {
        event.preventDefault();
        console.log("REMOVING: ", id);
        dispatch(deleteFavorite(id, user.data.token))
    }

    /**
     * Initiate update after the user selects the new category
     * @param event
     * @param category
     */
    function saveFavoriteCategory(event, category) {
        event.preventDefault();
        console.log("SAVING: ", category);
        dispatch(updateFavorite(save, user.data.token, category));
        setOpen(false);
    }

    /**
     * Close popup
     */
    function handleClose() {
        setOpen(false);
    }

    /**
     * Cross reference the id with the giphy payload
     * @param id
     * @returns {string}
     */
    function getCategory(id) {
        let result = '';
        console.log("ID: ", id);
        console.log("FAV", favorite);
        if (!_.isNil(favorite) && !_.isNil(favorite.data) && favorite.data !== "") {
            favorite.data.favorites.forEach(function (value) {
                if (value.giphy === id) {
                    result = value.category;
                }
            });
        }
        return result;
    }


    /**
     * Cross reference the id with the giphy payload
     * @param id
     * @returns {string}
     */
    function getId(id) {
        let result = '';
        if (!_.isNil(favorite) && !_.isNil(favorite.data)) {
            favorite.data.favorites.forEach(function (value) {
                if (value.giphy === id) {
                    result = value.id;
                }
            });
        }
        return result;
    }

    /**
     * Generate gif list to be shown
     * @param data
     * @returns {*}
     */
    function generateList(data) {
        console.log("LIST: ", data);
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
                            alt={gif.title}
                        />
                        <Typography component="h6" variant="h6" align="left" gutterBottom>
                            <b>Category:</b>{getCategory(gif.id)}
                        </Typography>
                        <CardActions disableSpacing>
                            <a href="" onClick={(e) => {
                                removeFavorite(e, getId(gif.id))
                            }}> <IconButton aria-label="Remove Favorite">
                                <RemoveIcon/>
                            </IconButton></a>
                            <a href="" onClick={(e) => {
                                editFavorite(e, getId(gif.id))
                            }}><IconButton aria-label="Edit Category">
                                <EditIcon/>
                            </IconButton></a>
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
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Favorite Giphys
                    </Typography>
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {generateList(favorite.giphy)}
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Category</DialogTitle>
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
                                <MenuItem value={'such wow'}>such wow</MenuItem>
                                <MenuItem value={'L33t'}>L33t</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => {
                        saveFavoriteCategory(e, category)
                    }} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Favorites