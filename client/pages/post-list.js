import React from "react";
import AppFooter from "../components/IndexPage/assets/AppFooter";
import AppAppBar from "../components/IndexPage/assets/AppAppBar";
import withRoot from "../components/IndexPage/withRoot";
import { useSelector } from "react-redux";
import { postsListAction } from "../redux/store/actions/postAction";
import { CreatePostsList } from "../components/form/post/CreatePostsList";

const PostsList = withRoot(() => {
  const state = useSelector((state) => state);

  return (
    <React.Fragment>
      <AppAppBar />
      <CreatePostsList />
      <AppFooter />
    </React.Fragment>
  );
});


PostsList.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(postsListAction());
  return {};
};
export default PostsList;
