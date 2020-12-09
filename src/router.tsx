import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home';
import Learn from './components/tutorial/Learn';


export default function MyRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/learn'>
          <Learn></Learn>
        </Route>
        <Route path='/'>
          <Home></Home>
        </Route>
     </Switch> 
    </BrowserRouter>
  );
}
