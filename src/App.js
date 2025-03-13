import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Main from './pages/main/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
