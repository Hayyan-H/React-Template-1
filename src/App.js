import { BrowserRouter as Route } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom" //prettier-ignore

import "./styles/global.scss";

import MainLayout from "./layout/MainLayout";

import pages from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {pages.map((page) => (
        <Route key={page.path} path={page.path} element={<MainLayout Page={page.page} />} />
      ))}
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
