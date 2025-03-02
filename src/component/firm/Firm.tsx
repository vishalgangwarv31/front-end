import { Link, Route, Routes, useLocation } from "react-router-dom";
import FirmLogIn from "./FirmLogIn";
import FirmPrivateRoute from "../../utils/FirmPrivateRoute";
import FirmMenu from "./FirmMenu";
import GetFirm from "../../pages/frim/GetFirm";
import UpdateFirm from "../../pages/frim/UpdateFirm";
import FirmOrder from "../../pages/frim/FirmOrder";
import UpdateOrder from "../../pages/frim/UpdateOrder";
import ForgetPass from "./ForgetPass";
import Reset from "./Reset";

const Firm = () =>{
    const location = useLocation();


    return(
        <div>
            {location.pathname === '/api/firm' && (
                <nav>
                <ul>
                    <li><Link to="/api/firm/login">Log In</Link></li>
                </ul>
                </nav>
            )}

            <Routes>
                <Route path="login" element={<FirmLogIn />} />
                <Route path="forget-password" element={<ForgetPass />} />
                <Route path="reset-password/:id/:token" element = {<Reset/>}/>

                <Route element={<FirmPrivateRoute/>}>
                    <Route path="menu/*" element={ <FirmMenu/> } />
                    <Route path="get-firm" element = { <GetFirm/> } />
                    <Route path="update-firm" element = { <UpdateFirm/>} />
                    <Route path="order" element= { <FirmOrder/> } />
                    <Route path="update-order" element= { <UpdateOrder/>} />
                </Route>
            </Routes>
        </div>

        
    )
}

export default Firm;