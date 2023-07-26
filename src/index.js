import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const codeInfo = {
  name: "code",
  lang: "React",
};

const CodeContext = createContext(codeInfo);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CodeContext.Provider value={codeInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CodeContext.Provider>
);

export default CodeContext;