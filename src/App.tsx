import React from "react";
import './App.css'
import {MapPage} from "./Pages/MapPage.tsx";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {Layout} from "./Components/Layout.tsx";
import {LoginPage} from "./Pages/LoginPage.tsx";
import {AddressListPage} from "./Pages/AddressListPage.tsx";
import {useUser} from "./Hooks/useUser.ts";
import {ProjectCreatePage} from "./Pages/ProjectCreatePage.tsx";
import {ProjectListPage} from "./Pages/ProjectListPage.tsx";
import {AddressesAddPage} from "./Pages/AddressesAddPage.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {PrivacyPage} from "./Pages/PrivacyPage.tsx";

function App() {
    const {user} = useUser();

    return (
        <BrowserRouter>
            {user ?
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={"/projects"} element={<ProjectListPage/>}/>
                    <Route path={"/projects/create"} element={<ProjectCreatePage/>}/>
                    <Route path={"/projects/:projectId/map"} element={<MapPage/>}/>
                    <Route path={"/projects/:projectId/map/:groupId"} element={<MapPage/>}/>
                    <Route path={"/projects/:projectId/addresses"} element={<AddressListPage/>}/>
                    <Route path={"/projects/:projectId/addresses/add"} element={<AddressesAddPage/>}/>
                    <Route path={'/privacy'} element={<PrivacyPage/>}/>
                    <Route path={"*"} element={<Navigate to={"/projects"}/>}/>
                </Route>
            </Routes>
                :
                <Routes>
                    <Route path={'/privacy'} element={<PrivacyPage/>}/>
                    <Route path={'*'} element={<LoginPage/>}/>
                </Routes>
            }
            <ToastContainer
                position={"bottom-left"}
            />
        </BrowserRouter>
    )
}

export default App
