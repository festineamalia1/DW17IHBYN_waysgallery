import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import SignupPage from "pages/SignupPage";
import Home from "pages/Home";
import Subcrib from "pages/Subcribtion";
import AddVideo from "pages/AddVideo";
import EditVideo from "pages/EditVideo";
import Creator from "pages/ContentCreator";
import MyChanel from "pages/MyChanel";
import DetailVid from "pages/DetailVideo";
import Hire from "pages/HirePage";
import MyOrder from "pages/MyOrder";
import SendProjek from "pages/SendProjek";
import ViewProjek from "pages/ViewProjek";
import "assets/scss/style.scss";
import { API, setAuthToken } from "config/api";
import Switch from "react-bootstrap/esm/Switch";
import { TaskContext } from "context/TaskContext";
import PrivateRoute from "components/PrivateRoute";

import ScrollToTop from "components/ScrollToTop";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(TaskContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser();
  }, []);
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/subcrib" component={Subcrib} />
          <PrivateRoute exact path="/addvideo" component={AddVideo} />
          <PrivateRoute exact path="/hire/:id" component={Hire} />
          <PrivateRoute exact path="/edit" component={EditVideo} />
          <PrivateRoute exact path="/creator/:id" component={Creator} />
          <PrivateRoute exact path="/mychanel" component={MyChanel} />
          <PrivateRoute exact path="/myorder" component={MyOrder} />
          <PrivateRoute exact path="/projek/:id" component={SendProjek} />
          <PrivateRoute exact path="/viewprojek/:id" component={ViewProjek} />
          <PrivateRoute exact path="/detailvid/:id" component={DetailVid} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
