import "./App.css";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Signup from "./components/signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
