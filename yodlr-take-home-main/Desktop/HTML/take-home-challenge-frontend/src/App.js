import react from 'react'
import UserSignUp from './UserSignUp'
import Admin from './Admin'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import UserPage from './UserPage'

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                    <Route exact path="/:id">
                        <UserPage />
                    </Route>
                    <Route exact path="/">
                        <UserSignUp />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;