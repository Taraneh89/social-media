import React, { useEffect, useState, useRef } from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Typography from "@material-ui/core/Typography";
import { UseStyle } from "../sign-in/sign-inStyle";
import { useDispatch } from "react-redux";
import {
  PostAction,
  EditAction,
} from "../../../redux/store/actions/postAction";
import { useRouter } from "next/router";
import axios from "axios";

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

export function CreatePost() {
  const classes = UseStyle();
  const dispatch = useDispatch();
  const router = useRouter();
  const [item, setItem] = useState({
    title: "",
    text: "",
  });

  const isRender = useRef(false);

  useEffect(() => {
    isRender.current = true;
    if (router.query.id) {
      // This is edit page
      async function fetchPostItem() {
        const response = await axios.get(
          `http://localhost:2030/api/posts/${router.query.id}`
        );
        setItem(response.data);
      }

      fetchPostItem();
      /**
       * (async () => {
       *  // My codes here
       * })()
       */
    } else {
      // This is create post page
    }
  }, []);

  useEffect(() => {
    if (isRender.current) {
      // Our codes here
      setItem({
        title: "",
        text: "",
      });
    }
  }, [router.query]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {router.query.id ? "Edit post" : "Create Post"}
          </Typography>
          <Formik
            initialValues={{ title: item.title, description: item.text }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(2, "Too Short!")
                .max(30, "Too Long!")
                .required("you must enter a title"),
              description: Yup.string()
                .min(10, "Too Short!")
                .max(300, "Too Long!")
                .required("you must enter  a description"),
            })}
            onSubmit={async (values, actions) => {
              const { resetForm } = actions;
              if (router.query.id) {
                dispatch(
                  EditAction({
                    callback: resetForm,
                    id: router.query.id,
                    data: values,
                  })
                );
              } else {
                dispatch(PostAction(values, resetForm));
              }
            }}
            enableReinitialize={true}
          >
            {({ handleSubmit }) => {
              return (
                <form noValidate onSubmit={handleSubmit}>
                  <MyTextInput
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Enter Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                  />
                  <MyTextInput
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Enter Description"
                    type="text"
                    id="description"
                    autoComplete="description"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submit}
                  >
                    submit
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
