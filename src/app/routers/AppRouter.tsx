import { createBrowserRouter } from "react-router-dom";

import { Home } from "../../pages/Home";


import App from "../App";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
