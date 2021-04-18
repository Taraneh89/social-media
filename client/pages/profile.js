import React from "react";
import AppFooter from "../components/IndexPage/assets/AppFooter";
import AppAppBar from "../components/IndexPage/assets/AppAppBar";
import withRoot from "../components/IndexPage/withRoot";
import { useSelector } from "react-redux";
import { checkProtected } from "../helpers/props";
import { FillProfile } from "../components/form/Profile/FillProfile";

const Profile = withRoot(() => {
	const state = useSelector((state) => state);

	return (
		<React.Fragment>
			<AppAppBar />
			<FillProfile />
			<AppFooter />
		</React.Fragment>
	);
});

Profile.getInitialProps = async (ctx) => {
	await checkProtected(ctx, async () => {});
	return {};
};

export default Profile;
