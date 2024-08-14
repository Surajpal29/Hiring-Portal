import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Loader from "./Pages/loader/loader.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
// index.js or App.js
import "react-toastify/dist/ReactToastify.css";
import { element } from "prop-types";
import SearchPeople from "./Pages/searchPeople/SearchPeople.jsx";

// Lazy load components
const App = lazy(() => import("./App.jsx"));
const TrustedCompaniesList = lazy(() =>
  import("./Components/TrustedCompaniesList.jsx")
);
const FindAJobPage = lazy(() => import("./Pages/FindAJobPage.jsx"));
const Login = lazy(() => import("./Pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./Pages/SignupPage.jsx"));
const UserProfilePage = lazy(() => import("./Pages/UserProfilePage.jsx"));
const AboutUsPage = lazy(() => import("./Pages/AboutUsPage.jsx"));
const ChatsPage = lazy(() => import("./Pages/chatspage/chatspage.jsx"));
const PostAJobPage = lazy(() => import("./Pages/PostAJob/postjobPage.jsx"));
const UserInfoForm = lazy(() =>
  import("./Pages/UserInfoFormPage/UserInfoForm.jsx")
);
const BlogPage = lazy(() => import("./Pages/BlogPage.jsx"));

// Define routes
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/:userId", element: <App /> },
      { path: "/", element: <App /> },
      { path: "find-a-job", element: <FindAJobPage /> },
      { path: "/about", element: <AboutUsPage /> },
      { path: "/searchPeople", element: <SearchPeople /> },
      { path: "/postAJob", element: <PostAJobPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignupPage /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "/UserInfoFormData/:userId", element: <UserInfoForm /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/chats", element: <ChatsPage /> },
];

// Create router
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
    <ToastContainer />
  </Provider>
);
