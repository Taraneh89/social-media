import * as React from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import NextLink from "next/link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { UseStyle } from "./sign-upStyle";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../../redux/store/actions/auth";

const MyTextInput = ({ ...props }) => {
	const [field, meta] = useField(props);
	const hasError = meta.touched && meta.error;
	return (
		<>
			<TextField
				helperText={meta.error}
				error={hasError}
				{...field}
				{...props}
			/>
		</>
	);
};

export function SignUpSide() {
	const classes = UseStyle();
	const dispatch = useDispatch();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" color="#ff3366">
						Sign up
					</Typography>
					<Formik
						initialValues={{
							name: "",
							email: "",
							password: "",
							passwordConfirmation: "",
						}}
						validationSchema={Yup.object({
							name: Yup.string().required().min(3).max(30),
							email: Yup.string()
								.email("Invalid email addresss`")
								.required("Required"),
							password: Yup.string()
								.required("No password provided.")
								.min(8, "Password is too short - should be 8 chars minimum.")
								.matches(
									/[a-zA-Z]/,
									"Password can only contain Latin letters."
								),
							passwordConfirmation: Yup.string()
								.oneOf([Yup.ref("password"), null], "Passwords must match")
								.required("No passwordconfirmation provided."),
						})}
						onSubmit={async (values, actions) => {
							const { setErrors } = actions;
							dispatch(signUp(values, setErrors));
						}}
					>
						{({ handleSubmit }) => {
							return (
								<form noValidate onSubmit={handleSubmit}>
									<MyTextInput
										type="text"
										margin="normal"
										required
										fullWidth
										id="name"
										label="Full Name"
										name="name"
										autoComplete="name"
										autoFocus
									/>
									<MyTextInput
										type="email"
										margin="normal"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										autoFocus
									/>
									<MyTextInput
										margin="normal"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
									/>
									<MyTextInput
										margin="normal"
										required
										fullWidth
										name="passwordConfirmation"
										label="passwordConfirmation"
										type="password"
										id="passwordConfirmation"
										autoComplete="passwordConfirmation"
									/>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										className={classes.submit}
									>
										Sign UP
									</Button>
									<Grid container>
										<Grid item>
											<NextLink href="/sign-in" variant="body2">
												{"Do you  have an account? Sign In"}
											</NextLink>
										</Grid>
									</Grid>
								</form>
							);
						}}
					</Formik>
				</div>
			</Grid>
		</Grid>
	);
}
