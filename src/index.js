import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClientIdProvider, DashboardIdProvider, DashboardMetabaseDataProvider, JobDataProvider, JobNameProvider, JobProjectIdProvider, ProjectIdProvider, ProjectProvider, ProjectidProvider } from './components/JobDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <DashboardMetabaseDataProvider>
    <DashboardIdProvider>
    <ProjectProvider>
        <ProjectidProvider>
          <JobProjectIdProvider>
        <ProjectIdProvider>
        <JobNameProvider>
            <ClientIdProvider>
              <JobDataProvider>
                <App />
              </JobDataProvider>
            </ClientIdProvider>
            </JobNameProvider>
            </ProjectIdProvider>
            </JobProjectIdProvider>
        </ProjectidProvider>
        </ProjectProvider>
    </DashboardIdProvider>
  </DashboardMetabaseDataProvider>
);
{/* </React.StrictMode> */ }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

