import './App.css'
import {AddressMapPage} from "./Pages/AddressMapPage.tsx";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {GroupEditPage} from "./Pages/GroupEditPage.tsx";
import {SettingsPage} from "./Pages/SettingsPage.tsx";
import {GroupListPage} from "./Pages/GroupListPage.tsx";
import {Layout} from "./Components/Layout.tsx";
import {LoginPage} from "./Pages/LoginPage.tsx";
import {UsersListPage} from "./Pages/UsersListPage.tsx";
import {AddressListPage} from "./Pages/AddressListPage.tsx";
import {useUser} from "./Hooks/useUser.ts";
import {ProjectCreatePage} from "./Pages/ProjectCreatePage.tsx";
import {ProjectListPage} from "./Pages/ProjectListPage.tsx";
import {AddressesAddPage} from "./Pages/AddressesAddPage.tsx";

function App() {
    const {user} = useUser();

    return (
        <BrowserRouter>
            {user ?
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={"/projects"} element={<ProjectListPage/>}/>
                    <Route path={"/projects/create"} element={<ProjectCreatePage/>}/>
                    <Route path={"/projects/:projectId/map"} element={<AddressMapPage/>}/>
                    <Route path={"/projects/:projectId/map/:groupId"} element={<AddressMapPage/>}/>
                    <Route path={"/projects/:projectId/groups"} element={<GroupListPage/>}/>
                    <Route path={"/projects/:projectId/groups/edit"} element={<GroupEditPage/>}/>
                    <Route path={"/projects/:projectId/addresses"} element={<AddressListPage/>}/>
                    <Route path={"/projects/:projectId/addresses/add"} element={<AddressesAddPage/>}/>
                    <Route path={"/projects/:projectId/settings"} element={<SettingsPage/>}/>
                    <Route path={"/projects/:projectId/users"} element={<UsersListPage/>}/>
                    <Route path={"*"} element={<Navigate to={"/projects"}/>}/>
                </Route>
            </Routes>
                : <LoginPage/>}
        </BrowserRouter>
    )
}

export default App
