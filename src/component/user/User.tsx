import { Link, Route, Routes, useLocation } from "react-router-dom";
import UserLogIn from "./UserLogin";
import UserMenu from "./UserMenu";
import UserPrivateRoute from "../../utils/UserPrivateRoute";
import GetUser from "../../pages/user/GetUser";
import UpdateUser from "../../pages/user/UpdateUser";
import UserOrder from "../../pages/user/GetOrder";
import UpdateOrder from "../../pages/user/UpdateOrder";
import ForgetPass from "./ForgetPass";
import Reset from "./Reset";

const User = () =>{
    const location = useLocation();

    return(
        <div>
            {location.pathname === '/api/user' && (
                <nav>
                <ul>
                    <li><Link to="/api/user/login">Log In</Link></li>
                </ul>
                </nav>
            )}

            <Routes>
                <Route path="login" element={<UserLogIn />} />
                <Route path="forget-password" element={<ForgetPass />} />
                <Route path="reset-password/:id/:token" element = {<Reset/>}/>

                <Route element={<UserPrivateRoute/>}>
                    <Route path="menu/*" element={ <UserMenu/> } />
                    <Route path="get-user" element = { <GetUser/> } />
                    <Route path="update-user/:id" element = { <UpdateUser/> } />
                    <Route path="orders" element = { <UserOrder/> } />
                    <Route path="update-order/:id" element = { <UpdateOrder/> } />
                </Route>
            </Routes>
        </div>
    )
}

export default User;