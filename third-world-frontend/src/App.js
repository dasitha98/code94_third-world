import React from 'react';
import { Route, BrowserRouter, Switch, Router, Routes } from "react-router-dom";
import './App.css'
import MainRoutes from './components/routes/mainRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainRoutes} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;