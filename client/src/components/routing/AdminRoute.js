import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {

    var user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(localStorage.getItem('user'));
    }
    return (

        < Route
            {...rest}
            render={(props) =>
                (user && user.isAdmin) ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default AdminRoute;