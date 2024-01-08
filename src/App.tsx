import './App.css'
import {MapViewPage} from "./Pages/MapViewPage.tsx";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {GroupEditPage} from "./Pages/GroupEditPage.tsx";
import {SettingsPage} from "./Pages/SettingsPage.tsx";
import {GroupListPage} from "./Pages/GroupListPage.tsx";
import {Layout} from "./Components/Layout.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<MapViewPage/>}/>
                    <Route path="/map" element={<MapViewPage/>}/>
                    <Route path="/map/:groupId" element={<MapViewPage/>}/>
                    <Route path={"/groups"} element={<GroupListPage/>}/>
                    <Route path="/groups/edit" element={<GroupEditPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                    <Route path={"*"} element={<Navigate to={"/map"}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
