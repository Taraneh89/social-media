import * as React from 'react';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { UseStyle } from './FillProfileStyle';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import ChipInput from 'material-ui-chip-input';
import { useSelector, useDispatch } from 'react-redux';
import { fillProfile } from '../../../redux/store/actions/profileAction';

import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

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

export function FillProfile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => ({
    name: state.profile.baseInformation?.name,
    email: state.profile.baseInformation?.email,
  }));
  const classes = UseStyle();
  const [category, setCategory] = React.useState('Person');
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Formik
      initialValues={{
        handel: '',
        website: '',
        country: '',
        instagram: '',
        github: '',
        linkedin: '',
        twitter: '',
        skills: '',
        status: '',
      }}
      validationSchema={Yup.object({
        handel: Yup.string()
          .default(null)
          .nullable(),
        status: Yup.string()
          .nullable()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .matches(
            /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,49}$/,
            'Enter correct status !'
          )
          .required('Enter corecct status'),

        website: Yup.string().matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Enter correct url!'
        ),
        countary: Yup.string().min(2).max(20),
        instagram: Yup.string().matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Enter correct url!'
        ),
        github: Yup.string().matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Enter correct url!'
        ),
        linkedin: Yup.string(),
        twitter: Yup.string().matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Enter correct url!'
        ),
        skills: Yup.array()
          .min(1, 'Must have at least one friend')
          .max(20, 'That is too '),
      })}
      onSubmit={async (values) => {
        dispatch(fillProfile({ ...values, handle: category }));
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
              <Grid spacing={3} xs={false} md={12}>
                <div className={classes.margin}>
                  <MyTextInput
                    type="text"
                    fullWidth
                    id="name"
                    label=""
                    name="name"
                    autoComplete="name"
                    value={state.name}
                    autoFocus
                    readOnly
                  />
                  <MyTextInput
                    type="email"
                    value={state.email}
                    fullWidth
                    id="email"
                    label=""
                    name="email"
                    autoComplete="email"
                    autoFocus
                    readOnly
                  />

                  <FormControl autoFocus fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      fullWidth
                      name="handle"
                      value={category}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value={'Person'}>Person</MenuItem>
                      <MenuItem value={'Company'}>Company</MenuItem>
                    </Select>
                  </FormControl>
                  <MyTextInput
                    type="text"
                    fullWidth
                    id="status"
                    label="Status"
                    name="status"
                    autoComplete="Status"
                    autoFocus
                  />
                  <MyTextInput
                    type="url"
                    fullWidth
                    id="url"
                    label="Web site"
                    name="website"
                    autoComplete="Web site"
                    autoFocus
                  />
                  <MyTextInput
                    type="text"
                    fullWidth
                    id="location"
                    label="Countary Name"
                    name="countary"
                    autoComplete="Countary Name"
                    autoFocus
                  />
                  <MyTextInput
                    type="text"
                    name="instagram"
                    id="Instagram"
                    label="Instagram"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <InstagramIcon className={classes.right} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <MyTextInput
                    type="text"
                    name="github"
                    id="GitHub"
                    label="GitHub"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <MyTextInput
                    type="text"
                    name="linkedin"
                    id="LinkedIn"
                    label="LinkedIn"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <MyTextInput
                    type="text"
                    name="twitter"
                    id="Twitter"
                    label="Twitter"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <TwitterIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ChipInput
                    fullWidth
                    name="skills"
                    label="Skills"
                    placeholder="Type and press enter to add"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Container>
          </form>
        );
      }}
    </Formik>
  );
}
