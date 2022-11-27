import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./scenes/Students";
import Teachers from "./scenes/Teachers";
import Teacher from "./scenes/Teachers/Teacher";
import Schools from "./scenes/Schools";

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route index element={<Students />} />
                <Route path="/teachers" element={ <Teachers /> } />
                <Route path="/teachers/:year/:id" element={ <Teacher /> } />
                <Route path="/schools" element={ <Schools /> } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>

export default App;