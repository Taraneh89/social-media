import { ThemeProvider, createGlobalStyle } from "styled-components";
import NextApp from "next/app";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { wrapper } from "../redux/store";
import { accessToken } from "../helpers/props";
import { SIGN_IN } from "../redux/store/actions/type";
import { fetchCurrent } from "../redux/store/actions/auth";
import Router from "next/router";
import NProgress from "nprogress";

// Css nprogress
import "nprogress/nprogress.css";

const GlobalStyle = createGlobalStyle`
	a {
		text-decoration: none;
	}
	.full-width {
		width: 100%;
	}
`;

const theme = {
	primary: "green",
};

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
	NProgress.done();
});

Router.events.on("routeChangeError", () => {
	NProgress.done();
});

class App extends NextApp {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		const token = accessToken(ctx);
		if (token) {
			ctx.store.dispatch({ type: SIGN_IN, payload: { token } });
			await ctx.store.dispatch(fetchCurrent());
		}

		return { pageProps };
	}

	componentDidMount() {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode)
			jssStyles.parentNode.removeChild(jssStyles);
	}
	render() {
		const { Component, pageProps } = this.props;
		return (
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
				<CssBaseline />
				<GlobalStyle />
			</ThemeProvider>
		);
	}
}

export default wrapper.withRedux(App);
