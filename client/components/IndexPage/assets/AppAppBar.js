import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import AppBar from "../AppBar";
import Toolbar, { styles as toolbarStyles } from "../Toolbar";
import styled from "styled-components";
import headersLink from "../../../helpers/headerLinks";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

const StylesNextLink = styled.div(() => {
	return `
    a {
      color: #fff;
      text-decoration: none;
  `;
});

const styles = (theme) => ({
	title: {
		fontSize: 24,
	},
	placeholder: toolbarStyles(theme).root,
	toolbar: {
		justifyContent: "space-between",
	},
	left: {
		flex: 1,
	},

	leftLinkActive: {
		color: theme.palette.common.white,
	},
	right: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
	},
	rightLink: {
		textDecoration: "none",
		fontSize: 24,
		color: theme.palette.common.white,
		marginLeft: theme.spacing(3),
	},
	linkSecondary: {
		color: theme.palette.secondary.main,
	},
	profileLink: {
		display: "flex",
		alignItems: "center",
		margin: theme.spacing(3),
	},
	space: {
		margin: theme.spacing(3),
	},
});

function AppAppBar(props) {
	const { classes } = props;
	const {
		auth: { token },
		profile,
	} = useSelector((state) => ({ auth: state.auth, profile: state.profile }));
	const role = token ? "user" : "guest";

	return (
		<div>
			<AppBar
				position="fixed"
				style={{
					zIndex: "900",
				}}
			>
				<Toolbar className={classes.toolbar}>
					{role == "user" && (
						<div className={classes.left}>
							<NextLink href={"/post-list"}>
								<a color="inherit" className={classes.rightLink}>
									{"Post List"}
								</a>
							</NextLink>
							<NextLink href={"/post"}>
								<a color="inherit" className={classes.rightLink}>
									{"Create Post"}
								</a>
							</NextLink>
						</div>
					)}
					<Link color="inherit" className={classes.title} href="/">
						{"onepirate"}
					</Link>
					<div className={classes.right}>
						<StylesNextLink>
							{headersLink.map((item) => {
								const noRender = item.role !== role;

								if (noRender) return;

								return (
									<NextLink href={item.path} key={item.id}>
										<a className={classes.rightLink}>{item.name}</a>
									</NextLink>
								);
							})}
							{role === "user" && (
								<div>
									<NextLink href={"/profile"}>
										<a className={classes.profileLink}>
											<Avatar
												className={classes.leftt}
												alt={profile.baseInformation.name}
												src={profile.baseInformation.avatar}
											/>
											<span className={classes.space}>
												{profile.baseInformation.name}
											</span>
										</a>
									</NextLink>
								</div>
							)}
						</StylesNextLink>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.placeholder} />
		</div>
	);
}

AppAppBar.propTypes = {
	/**
	 * Override or extend the styles applied to the component.
	 */
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
