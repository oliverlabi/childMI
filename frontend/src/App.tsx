import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./scenes/Students";
import Teachers from "./scenes/Teachers";
import Schools from "./scenes/Schools";

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route index element={<Students />} />
                <Route path="/teachers" element={ <Teachers /> } />
                <Route path="/schools" element={ <Schools /> } />
            </Route>
        </Routes>
    </BrowserRouter>

export default App;