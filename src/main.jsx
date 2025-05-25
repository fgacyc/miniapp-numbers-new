import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {ConfigProvider} from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ConfigProvider locale={enUS}>
                <App/>
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
