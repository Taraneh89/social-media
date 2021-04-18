import React from "react";
import { Formik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import NextLink from "next/link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { UseStyle } from "./sign-inStyle";
import { signIn } from "../../../redux/store/actions/auth";
import { useDispatch } from "react-redux";

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

export function SignInSide() {
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
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
            })}
            onSubmit={async (values, actions) => {
              const { setErrors } = actions;
              dispatch(signIn(values, setErrors));
            }}
          >
            {({ handleSubmit }) => {
              return (
                <form noValidate onSubmit={handleSubmit}>
                  <MyTextInput
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <NextLink href="/sign-up" variant="body2">
                        Sign Up
                      </NextLink>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 5 }}></Box>
                </form>
              );
            }}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
