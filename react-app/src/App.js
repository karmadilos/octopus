import React from 'react';
import { Route, BrowserRouter  } from 'react-router-dom';
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'
import { UserinfoPage } from './pages/userinfo'
import { NetworkPage } from './pages/network'

export function App () {

    return (
      <div >
        <BrowserRouter >
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/network"component={NetworkPage}/>
            <Route exact path="/user/:user_id"component={UserinfoPage}/>
        </BrowserRouter>
      </div>
    )
}

export default App;
