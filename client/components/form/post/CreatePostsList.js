import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { Container, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {
	likeAction,
	postsListDelete,
	unLikeAction,
} from "../../../redux/store/actions/postAction";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	main: {
		backgroundColor:
			theme.palette.mode === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[300],
		width: "90%",
	},
	left: {
		marginLeft: "20px",
	},
}));

export const Modal = (props) => {
	const dispatch = useDispatch();
	return (
		<div>
			<Dialog open={props.open !== ""} onClose={props.handleClose}>
				<DialogTitle style={{ cursor: "move" }}>
					Are you sure you want to delete this post?
				</DialogTitle>
				<DialogActions>
					<Button
						autoFocus
						onClick={props.handleClose}
						color="primary"
						autoFocus
					>
						Cancel
					</Button>
					<Button
						color="primary"
						onClick={() => {
							dispatch(postsListDelete(props.open, props.handleClose));
						}}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export const CreatePostsList = () => {
	const state = useSelector((state) => state);
	const classes = useStyles();
	const [open, setOpen] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();
	const handleClickOpen = (id) => {
		// id => string
		setOpen(id);
	};

	const handleClose = () => {
		setOpen("");
	};

	const handleEditPost = (id) => {
		// Go to edit post
		router.push({
			pathname: "/post",
			query: { id },
		});
	};

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<Grid spacing={3} xs={false} md={12}>
					{state.posts.loading ? (
						<div>Loading...</div>
					) : (
						<List>
							{state.posts.list.map((item) => {
								const admin = state.profile.baseInformation.id === item["user"];
								return (
									<ListItem alignItems="flex-start" key={item._id}>
										<Card className={classes.main}>
											<CardHeader
												avatar={
													<NextLink href={`/post-list/${item._id}`}>
														<a>
															<Avatar alt={item.name} src={item.avatar} />
														</a>
													</NextLink>
												}
												title={
													<NextLink href={`/post-list/${item._id}`}>
														<a>
															<ListItemText secondary={item.title} />
														</a>
													</NextLink>
												}
												subheader={<ListItemText secondary={item.date} />}
											/>
											<div className={classes.left}>
												<Typography
													variant="caption"
													color="textSecondary"
													component="p"
												>
													{item.text}
												</Typography>
											</div>
											<CardActions>
												<IconButton
													onClick={() => dispatch(likeAction())}
													aria-label="like"
												>
													<ThumbUpAltIcon />
												</IconButton>
												<IconButton
													onClick={() => dispatch(unLikeAction())}
													aria-label="unLike"
												>
													<ThumbDownAltIcon />
												</IconButton>
												<ListItemText />
												{admin && (
													<div>
														<IconButton
															aria-label="edit"
															onClick={() => handleEditPost(item._id)}
														>
															<EditIcon />
														</IconButton>
														<IconButton
															edge="end"
															aria-label="delete"
															onClick={() => handleClickOpen(item._id)}
														>
															<DeleteIcon />
														</IconButton>
													</div>
												)}
											</CardActions>
										</Card>
									</ListItem>
								);
							})}
						</List>
					)}
				</Grid>
			</Container>
			<Modal open={open} handleClose={handleClose} />
		</div>
	);
};
