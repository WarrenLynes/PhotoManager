(async () => {
  const MongoClient = require('mongodb').MongoClient;
  const PromptList = require('prompt-list');
  const rimraf = require('rimraf');

  async function dropDataBase() {
    const connection = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true } );
    const client = await connection.connect({ useUnifiedTopology: true });
    const db = client.db('starter');
    await db.dropDatabase();
    rimraf('uploads', (x) => {
      client.close();
    });
  }

  const list = new PromptList({
    name: 'confirm-delete-db',
    message: 'DELETE DB: BOUNCE',
    choices: ['YES', 'NO']
  });

  list.ask(async (answer) => {
    if (answer === 'YES')
      return await dropDataBase();
    return 1;
  });
})();
