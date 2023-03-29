import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import EmployerApp from './employer/EmployerApp.jsx';
import LandingPage from './LandingPage.jsx';
import StudentApp from './student/StudentApp.js';
import AdminApp from './admin/AdminApp.js';
function App() {

  return (
    <div className="Apps">

      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/employer/*' element={<EmployerApp />}></Route>
          <Route path='/student/*' element={<StudentApp />}> </Route>
          <Route path='/admin/*' element={<AdminApp/>}> </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
