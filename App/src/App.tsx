import { RouterProvider } from "react-router-dom";
import routes from "./pages";
import GlobalStyle from "./ui/styles/Global";

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
      <GlobalStyle />
    </>
  );
};

export default App;
