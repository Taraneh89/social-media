import axios from "axios";
import { SIGN_IN } from "../redux/store/actions/type";

class Api {
	constructor(obj) {
		const { dispatch, getState } = obj;
		const {
			auth: { token },
		} = getState();

		this.xhr = axios.create({
			baseURL: "http://localhost:2030/",
			headers: {
				Authorization: token,
			},
		});
		this.dispatch = dispatch;
		this.getState = getState;
	}

	handleErr = (err) => {
		// Handle err

		if (err) {
			if (err.response) {
				if (err.response.status === 401) {
					this.dispatch({
						type: SIGN_IN,
						payload: {
							token: "",
						},
					});
				}
			}
		}
	};

	handleRes = (res) => {
		// Handle res
	};

	Get(url, params) {
		return new Promise((resolve, reject) => {
			this.xhr
				.request(url, {
					method: "get",
					params,
				})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					this.handleErr(err);
				});
		});
	}

	Put(url, params) {
		return new Promise((resolve, reject) => {
			this.xhr
				.request({
					data: params,
					method: "PUT",
					url,
				})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					this.handleErr(err);
				});
		});
	}

	Post(url, params) {
		return new Promise((resolve, reject) => {
			this.xhr
				.post(url, params)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					this.handleErr(err);
				});
		});
	}
	Delete(url, data) {
		return new Promise((resolve, reject) => {
			let itemdata = { ...this.params };
			if (data) itemdata = { ...this.params, ...data };
			this.xhr
				.delete(url, { data: itemdata })
				.then((res) => {
					this.handleRes(res);
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					this.handleErr(err);
				});
		});
	}
}
export default Api;
