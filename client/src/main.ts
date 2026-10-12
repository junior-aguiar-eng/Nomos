import './styles/nodus.css';
import { NodusApp } from './engines/nodus-app';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (root) {
    const app = new NodusApp(root);
    app.init();
    console.log('[NODUS] Sistema Neural Editorial Jurídico carregado com sucesso.');
  }
});
