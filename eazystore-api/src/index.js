const env = require('./config/env');
const { connect } = require('./config/db');
const { buildApp } = require('./app');
const { seed } = require('./seed/seed');

async function main() {
  await connect();
  await seed();
  const app = buildApp();
  app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});
