import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "Redux/Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectRoutes from "Routes/ProjectRoutes";

function App() {
  return (
    <BrowserRouter>
      <Provider store={Store}>
        <ToastContainer />
        <ProjectRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
