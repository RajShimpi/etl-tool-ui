import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClientIdProvider, JobDataProvider, ProjectIdProvider,ProjectProvider } from './components/JobDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ProjectProvider>
  <ProjectIdProvider>
  <ClientIdProvider>
  <JobDataProvider>
    <App />
  </JobDataProvider>
  </ClientIdProvider>
  </ProjectIdProvider>
  </ProjectProvider>
);
{/* </React.StrictMode> */ }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

