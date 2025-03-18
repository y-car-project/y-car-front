import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Main from './pages/main/Main';
import Main from './pages/main/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Signup />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
