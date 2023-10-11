import React from 'react'
import ReactDOM from 'react-dom/client'
import Routers from "./routes/Routers.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
)
