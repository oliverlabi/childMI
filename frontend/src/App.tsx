import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./scenes/Students";

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route path="/students" element={ <Students /> } />
            </Route>
        </Routes>
    </BrowserRouter>

export default App;