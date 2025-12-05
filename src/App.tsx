import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import QCM from './components/QCM/QCM';
import ExerciseList from './components/ExerciseList/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail/ExerciseDetail';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/qcm" element={<QCM />} />
              <Route path="/exercises" element={<ExerciseList />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <p>
                © 2025 Decathlon Digital - Nuit de l'Info Challenge{' '}
                <span className="footer-heart">❤️</span>
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
