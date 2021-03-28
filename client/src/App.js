import React from 'react';
import Messages from './Messages';
import Links from './Links';
import AllLinks from './AllLinks'
import { Route, Switch , Redirect } from "react-router-dom";
import Form from './Form';

const App = () => {
  return (
    <div className="App">
       <Switch >
                <Route exact path="/" component={() => <Form/>} />
                <Route path="/messages/:id" render={(props) =>  <Messages  {...props} />} />
                <Route path="/links/:id" render={(props) =>  <Links  {...props} />} />
                <Route path="/allLinks/" render={(props) =>  <AllLinks  {...props} />} />
                <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;
