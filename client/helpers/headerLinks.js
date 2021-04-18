/**
 * id: custom uniq id
 * name: name for link
 * path: path for link
 * role: user access => guest | user
 */

const headersLink = [
  {
    id: 1,
    name: "Sign in",
    path: "/sign-in",
    role: "guest",
  },
  {
    id: 2,
    name: "Sign up",
    path: "/sign-up",
    role: "guest",
  },
  // {
  //   id: 3,
  //   name: "Profile",
  //   path: "/profile",
  //   role: "user",
  // },
];

export default headersLink;
