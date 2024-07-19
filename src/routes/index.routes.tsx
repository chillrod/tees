import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/app/Home";
import { Admin } from "@/app/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>hey</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);
