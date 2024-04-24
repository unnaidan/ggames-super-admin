import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Imports
import 'dayjs/locale/mn';
import 'react-modern-drawer/dist/index.css';

// These styles apply to every route in the application
import './index.css';

dayjs.locale('mn');
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
