import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import initialize from './app/initialize.jsx';

const run = () => {
  const container = document.getElementById('root');
  const Vdom = initialize();

  createRoot(container)
    .render(Vdom);
};

run();
