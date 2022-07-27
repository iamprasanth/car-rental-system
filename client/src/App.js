import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import CarList from './pages/car-list/CarList';
import DateSelection from './pages/date-selection/DateSelection';
import Confirmation from './pages/confirmation/Confirmation';
import ThankYou from './pages/thankyou/ThankYou';
import NotFound from './pages/error/NotFound';
import OrderList from './pages/order-list/OrderList';
import InnerPageLayout from './components/layout/InnerPageLayout';
import CustomerRoute from './components/routing/CustomerRoute';
import AdminRoute from './components/routing/AdminRoute';
import "bootstrap/dist/css/bootstrap.min.css";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";

export const App = () => {

    return (
        <>
            < Router >
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <InnerPageLayout>
                        <CustomerRoute exact path="/" component={DateSelection} />
                        <CustomerRoute exact path="/select-car" component={CarList} />
                        <CustomerRoute exact path="/confirmation" component={Confirmation} />
                        <CustomerRoute exact path="/thankyou" component={ThankYou} />

                        <AdminRoute exact path="/orders" component={OrderList} />
                    </InnerPageLayout>
                </Switch >
                {/* <Route path="*" component={NotFound} /> */}
            </ Router>
        </>
    )
}

export default App