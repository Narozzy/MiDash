import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey!,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain!,
  projectId: process.env.REACT_APP_FIREBASE_projectId!,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId!,
  appId: process.env.REACT_APP_FIREBASE_appId!,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId!
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
