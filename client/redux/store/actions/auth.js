import Router from "next/router";
import { setCookie } from "../../../helpers/props";
import { SIGN_IN, FETCH_CURRENT } from "./type";
//api/profile

export const signUp = (data, setErrors) => async (
	dispatch,
	getState,
	{ Api }
) => {
	const api = new Api({ dispatch, getState });
	const { name, email, password, passwordConfirmation } = data;

	try {
		await api.Post("api/users/register", {
			name,
			email,
			password,
			password2: passwordConfirmation,
		});
		dispatch(signIn({ email, password }));
	} catch (err) {
		// handle err
		if (
			err &&
			err.response &&
			err.response.status >= 400 &&
			err.response.status < 500
		) {
			if (err.response.status === 400) {
				setErrors({ email: "email already exists" });
			}
		}
	}
};

export const signIn = (data, setErrors) => async (
	dispatch,
	getState,
	{ Api }
) => {
	const api = new Api({ dispatch, getState });
	const { email, password } = data;

	try {
		const response = await api.Post("api/users/login", {
			email,
			password,
		});
		dispatch({
			type: SIGN_IN,
			payload: {
				token: response.data.token,
			},
		});
		setCookie("access_token", response.data.token, 3300);
		dispatch(fetchCurrent());

		Router.push("/");
	} catch (err) {
		// handel err
		if (
			err &&
			err.response &&
			err.response.status >= 400 &&
			err.response.status < 500
		) {
			if (err.response.status === 400) {
				setErrors({
					email: "Incorrect email or password",
					password: "Incorrect email or password",
				});
			}
			if (err.response.status === 404) {
				setErrors({
					email: "User not found",
				});
			}
		}
	}
};

// api/users/current
export const fetchCurrent = () => async (dispatch, getState, { Api }) => {
	const api = new Api({ dispatch, getState });

	try {
		const response = await api.Get("api/users/current");
		dispatch({
			type: FETCH_CURRENT,
			payload: response.data.item,
		});
	} catch (err) {
		// handle err
	}
};
