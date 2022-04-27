import React from 'react';
import { Route, BrowserRouter, Redirect, Switch, useHistory } from "react-router-dom";
import Notification from './components/Helpers/notification';
import AuthRoutes from './routes/AuthRoutes'
import MainRoutes from './routes/MainRoutes'

function App() {

  const windowWidth = window.innerWidth;
  if(windowWidth < 768){
    return(
      <div>
        <text class="h2">Please use a desktop for a better experience</text>
      </div>
    )
  }else{
    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthRoutes} />
          <Route path="/" component={MainRoutes} />
        </Switch>
      </BrowserRouter>
      <Notification />
      </>
    );
  }
}

export default App;