import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootRouter from "./navigation/RootRouter";
import "../src/i18next";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </Router>
  );
}

export default App;
