import './App.css'
import {MapViewPage} from "./Pages/MapViewPage.tsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {MapGroupPage} from "./Pages/MapGroupPage.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MapViewPage/>}/>
              <Route path="/groups" element={<MapGroupPage/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
