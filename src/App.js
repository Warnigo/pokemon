import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/homeP';
import Page from './components/pages/page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:name' element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
