import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Calculator from './Calculator';
import PasswordProtect from './PasswordProtect';

function App() {
  return (
    <PasswordProtect>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </Router>
    </PasswordProtect>
  );
}

export default App;