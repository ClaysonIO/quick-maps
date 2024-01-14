import './App.css'
import {AddressMapPage} from "./Pages/AddressMapPage.tsx";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {GroupEditPage} from "./Pages/GroupEditPage.tsx";
import {SettingsPage} from "./Pages/SettingsPage.tsx";
import {GroupListPage} from "./Pages/GroupListPage.tsx";
import {Layout} from "./Components/Layout.tsx";
import netlifyIdentity from 'netlify-identity-widget'
import {LoginPage} from "./Pages/LoginPage.tsx";
import {UsersListPage} from "./Pages/UsersListPage.tsx";
import {AddressListPage} from "./Pages/AddressListPage.tsx";

function App() {
    const user = netlifyIdentity.currentUser()

    console.log("USER", user)
    return (
        <BrowserRouter>
            {user ?
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<AddressMapPage/>}/>
                    <Route path="/map" element={<AddressMapPage/>}/>
                    <Route path="/map/:groupId" element={<AddressMapPage/>}/>
                    <Route path={"/groups"} element={<GroupListPage/>}/>
                    <Route path="/groups/edit" element={<GroupEditPage/>}/>
                    <Route path={"/addresses"} element={<AddressListPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                    <Route path="/users" element={<UsersListPage/>}/>
                    <Route path={"*"} element={<Navigate to={"/map"}/>}/>
                </Route>
            </Routes>
                : <LoginPage/>}
        </BrowserRouter>
    )
}

export default App
