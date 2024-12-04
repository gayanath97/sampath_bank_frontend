import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import EmployeeList from './components/pages/EmployeeList';
import CreateEmployee from './components/pages/CreateEmployee';
import UpdateEmployee from './components/pages/UpdateEmployee';
import EditEmployee from './components/pages/EditEmployee';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/create" element={<CreateEmployee />} />
            <Route path="/employees/update/:id" element={<UpdateEmployee />} />
            <Route path="/employees/edit/:id" element={<EditEmployee />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
