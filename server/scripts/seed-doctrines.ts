import { runSeed } from '../src/services/seed-service.js';

runSeed()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Falha na execução do seed:', err);
    process.exit(1);
  });
