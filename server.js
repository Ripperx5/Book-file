require('dotenv').config();
const app = require('./app');
const { connectToDatabase } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDatabase();
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      console.error('Windows: run "netstat -ano | findstr :5000"');
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
