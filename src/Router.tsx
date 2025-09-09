import { createBrowserRouter } from "react-router";
import AppLayOut from "./pages/AppLatout";
import Form from "./pages/form";
import SafeKidsHomepage from "./pages/Home";
import { Explain } from "./pages/explain";
import ContactPage from "./pages/contact";
export const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    children: [
      { path: "/", element: <SafeKidsHomepage /> },
      { path: "form", element:<Form/> },
    {path:"explanation", element:<Explain/>},
    {path:"contact",element:<ContactPage/>}
    ],
  },
]);
