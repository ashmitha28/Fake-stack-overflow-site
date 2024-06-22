const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/fake_so';

async function dropAndDeleteDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Drop the database
    await mongoose.connection.db.dropDatabase();

    console.log(`Database dropped successfully.`);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Call the function to drop and delete the database
dropAndDeleteDatabase()
  .catch((error) => console.error(error))
  .finally(() => process.exit());