import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import UpdateData from "./component/UpdateData";

const myRouter = createBrowserRouter([
  {
    path: "",
    Component: Home,
  },
  { path: "/update-data", Component: UpdateData },
]);

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
