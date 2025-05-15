import React from 'react';
import MultiStepForm from './MultiStepForm';
import './FormStyles.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Registration Form</h1>
      </header>
      <main>
        <MultiStepForm />
      </main>
      <footer className="app-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;