import { createBrowserRouter } from "react-router";
import AppLayOut from "./pages/AppLayout";
import Form from "./pages/form";
import SafeKidsHomepage from "./pages/Home";
import { Explain } from "./pages/explain";
import ContactPage from "./pages/contact";
// import Form2 from "./pages/form";
export const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    children: [
      { path: "/", element: <SafeKidsHomepage /> },
      { path: "form", element: <Form /> },
      { path: "explanation", element: <Explain /> },
      { path: "contact", element: <ContactPage /> },
      // ,{path:"f2",element:<Form2/>}
    ],
  },
]);
