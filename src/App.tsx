import React from "react";
import './App.css'
import {MapPage} from "./Pages/MapPage.tsx";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {GroupEditPage} from "./Pages/GroupEditPage.tsx";
import {SettingsPage} from "./Pages/SettingsPage.tsx";
import {GroupListPage} from "./Pages/GroupListPage.tsx";
import {Layout} from "./Components/Layout.tsx";
import {LoginPage} from "./Pages/LoginPage.tsx";
import {AddressListPage} from "./Pages/AddressListPage.tsx";
import {useUser} from "./Hooks/useUser.ts";
import {ProjectCreatePage} from "./Pages/ProjectCreatePage.tsx";
import {ProjectListPage} from "./Pages/ProjectListPage.tsx";
import {AddressesAddPage} from "./Pages/AddressesAddPage.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

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
                    <Route path={"/projects/:projectId/groups"} element={<GroupListPage/>}/>
                    <Route path={"/projects/:projectId/groups/edit"} element={<GroupEditPage/>}/>
                    <Route path={"/projects/:projectId/addresses"} element={<AddressListPage/>}/>
                    <Route path={"/projects/:projectId/addresses/add"} element={<AddressesAddPage/>}/>
                    <Route path={"/projects/:projectId/settings"} element={<SettingsPage/>}/>
                    <Route path={"*"} element={<Navigate to={"/projects"}/>}/>
                </Route>
            </Routes>
                : <LoginPage/>}
            <ToastContainer
                position={"bottom-left"}
            />
        </BrowserRouter>
    )
}

export default App
