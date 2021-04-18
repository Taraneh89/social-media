import Router from "next/router";
import Cookies from "universal-cookie";

/**
 * truncate string
 * usage:
 * const myString = "alaskdfjasdjfkasdjflasjdflkasdjfkljsdlkfjds"
 * const myShortString = trunc(myString, 30)
 */
export function trunc(s, n) {
	if (s) {
		return s.length > n ? s.substr(0, n - 1) + "..." : s;
	} else {
		return "";
	}
}

/**
 * Change persian numbers to english
 * string | number
 * usage:
 * const number = "32444325345345"
 * const englishNumbers = toEnglish(number);
 */
export const toEnglish = function (val) {
	const find = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
	var replace = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	var replaceString = val;
	var regex;
	for (var i = 0; i < find.length; i++) {
		regex = new RegExp(find[i], "g");
		replaceString = replaceString.replace(regex, replace[i]);
	}
	return replaceString;
};

/**
 * Change english numbers to persian
 * string | number
 * usage:
 * const number = "۳۲۴۲۳۴۲۳۴۲۳۴۳۲"
 * const persianNumbers = toPersian(number);
 */
export const toPersian = function (val) {
	if (val) {
		const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
		return val.toString().replace(/[0-9]/g, function (w) {
			return id[+w];
		});
	} else {
		return val;
	}
};

/**
 * Set cookie into browser
 * @param {Cookie name, For example "token"} cName string
 * @param {For example "token value"} cValue string
 * @param {For example 100000000000} seconds number
 */
export const setCookie = (cName, cValue, seconds) => {
	let d = new Date();
	let sec = seconds * 1000;
	d.setTime(d.getTime() + sec);
	let expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cName}=${cValue}; ${expires};path=/`;
};

/**
 * @return => Cookie value, For example "token value"
 * @param {Cookie name, For example "token"} cName string
 */
export const getCookie = (cName) => {
	let name = `${cName}=`;
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

/**
 * Delete cookie
 * @param {Cookie name} name string
 * @default_name access_token
 */
export function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const accessToken = (ctx) => {
	let token = null;
	const { req } = ctx;

	if (typeof window === "undefined") {
		const cookies = new Cookies(req.headers.cookie);
		token = cookies.get("access_token");
	} else {
		token = getCookie("access_token");
	}

	return token;
};

/**
 * Redirect user if role !== "user"
 * @param {Next page context} ctx Context of getInitialProps function
 * @param {Callback function for run if user exists} callback Function
 */
export const checkProtected = async (ctx, callback) => {
	const { res } = ctx;
	const token = accessToken(ctx);
	const role = token ? "user" : "guest";

	switch (role) {
		case "user":
			if (callback) await callback();
			break;

		default:
			if (res) {
				res.writeHead(302, { Location: "/sign-in" });
				res.end();
				res.finished = true;
			} else {
				Router.push("/sign-in");
			}
			break;
	}
};
