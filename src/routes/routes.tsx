import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployees from "../pages/ListEmployees/employees";

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListEmployees />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesConfig;