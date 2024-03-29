import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./scenes/Students";
import Student from "./scenes/Students/Student";
import Teachers from "./scenes/Teachers";
import Teacher from "./scenes/Teachers/Teacher";
import Schools from "./scenes/Schools";
import School from "./scenes/Schools/School";

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> }>
                <Route index element={<Navigate to="/children/" replace />} />
                <Route path="/children/:type" element={ <Students /> } />
                <Route path="/children/:type/:sheetId" element={ <Students /> } />
                <Route path="/children/:type/:sheetId/:id" element={ <Student /> } />
                <Route path="/teachers" element={ <Teachers /> } />
                <Route path="/teachers/:id" element={ <Teacher /> } />
                <Route path="/schools" element={ <Schools /> } />
                <Route path="/schools/:id" element={ <School /> } />
                <Route path="*" element={<Navigate to="/children/qv/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>

export default App;