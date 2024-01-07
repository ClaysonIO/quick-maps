import './App.css'
import {MapViewPage} from "./Pages/MapViewPage.tsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {MapGroupPage} from "./Pages/MapGroupPage.tsx";
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
                    <Route path="/groups/create" element={<MapGroupPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
