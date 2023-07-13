import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { worker } from './mocks/worker';

worker.start();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
