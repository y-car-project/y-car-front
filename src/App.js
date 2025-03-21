import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'antd/dist/reset.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
