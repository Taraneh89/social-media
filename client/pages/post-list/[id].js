import * as React from "react";
import AppAppBar from "../../components/IndexPage/assets/AppAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {
  commentAction,
  likeAction,
  postShow,
  unLikeAction,
} from "../../redux/store/actions/postAction";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  firstIcon: {
    marginRight: "auto",
  },
  main: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[300],
    color: "#ff3366",
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    color: "#ff3366",
    background: "",
  },
  basecolor: {
    color: "#ff3366",
  },
  count: {
    margin: theme.spacing(-2, 3.5, 1),
  },
}));

const ViewPost = () => {
  const state = useSelector((state) => ({
    singlePost: state.singlePost,
    profile: state.profile,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userId = state.profile.baseInformation.id;
  const isLiked = state.singlePost.item.likes?.find(function (el) {
    return el.user === userId;
  });
  console.log(state.singlePost.item);
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Grid spacing={3} xs={false} md={12}>
          <ListItem>
            <Card className={"full-width"}>
              <CardHeader
                avatar={<Avatar aria-label="recipe"></Avatar>}
                subheader={state.singlePost.item.date}
              />
              <CardContent>
                <Typography>{state.singlePost.item.title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {state.singlePost.item.text}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() =>
                    dispatch(
                      isLiked
                        ? unLikeAction(state.singlePost.item._id)
                        : likeAction(state.singlePost.item._id)
                    )
                  }
                  aria-label="like"
                  className={classes.firstIcon}
                >
                  {isLiked ? (
                    <FavoriteIcon className={classes.basecolor} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show comment"
                >
                  <CommentIcon />
                </IconButton>
              </CardActions>
              <div className={classes.count}>
                <span>{state.singlePost.item?.likes?.length}</span>
              </div>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Box display="flex" justifyContent="center">
                    <Grid item smS={12}>
                      <TextField
                        label="Comment"
                        className={classes.main}
                        rowsMax={4}
                        variant="outlined"
                        outline-color="#8d1"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className={classes.submit}
                        onClick={() =>
                          dispatch(commentAction(state.singlePost.item._id))
                        }
                      >
                        Add
                      </Button>
                    </Grid>
                  </Box>
                </CardContent>
                <ListItem>
                  <Card className={"full-width"}>
                    <Divider variant="inset" component="li" />
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Profile picture"
                          src={state.profile.baseInformation.avatar}
                        ></Avatar>
                      }
                      subheader={state.profile.baseInformation.name}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {state.singlePost.item.comment}
                      </Typography>
                      {/* <IconButton
                        onClick={() =>
                          dispatch(
                            isLiked
                              ? unLikeAction(state.singlePost.item._id)
                              : likeAction(state.singlePost.item._id)
                          )
                        }
                        aria-label="like"
                        className={classes.firstIcon}
                      >
                        {isLiked ? (
                          <FavoriteIcon className={classes.basecolor} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <div className={classes.count}>
                        <span>{state.singlePost.item?.likes?.length}</span>
                      </div> */}
                    </CardContent>
                  </Card>
                </ListItem>
              </Collapse>
            </Card>
          </ListItem>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

ViewPost.getInitialProps = async (ctx) => {
  const { query } = ctx;
  await ctx.store.dispatch(postShow(query.id || ctx.req.params?.id));
};

export default ViewPost;
