import axios from "axios";
import transactionModel from "../models/transactionSchema.js";
import chalk from "chalk";

const seedTransactionsData = async () => {
  try {

    await transactionModel.deleteMany({});
    console.log(chalk.blue('Existing data cleared from the collection.'));

    const response = await axios.get(`${process.env.THIRD_PARTY_API_URL}`);
    const transactions = response.data;
  
    const res = await transactionModel.insertMany(transactions, { maxTimeMS: 30000 });
    if (res) {
      console.log(chalk.whiteBright('Database initialized with seed data.'));
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default seedTransactionsData;
