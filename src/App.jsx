import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './assets/Homepage';
import FormsPage from './assets/forms';
import Records from './assets/datapage';
import Hotels from './assets/Hotels';
import InternetSpeedChart from './assets/chart';
import './App.css';

function App() {
  return (
    <div className='appbody'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path='/records' element={<Records />} />
          <Route path="/chart" element={<InternetSpeedChart />} />
          <Route path='/hotels' element={<Hotels />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;

