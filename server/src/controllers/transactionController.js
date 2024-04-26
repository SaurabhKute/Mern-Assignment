import { allTransactionsData, barChartData, pieChartData, TransactionsStatisticsData } from "../services/transactionService.js";

const transactionController = {

  getAllTransactions: async (req, res) => {
    try {
      
      const { searchQuery,page,rowsPerPage } = req.query;
      const result = await allTransactionsData(Number(page), Number(rowsPerPage), searchQuery);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const { selectedMonth } = req.query;

      if (!selectedMonth) {
        return res.status(400).json({ error: 'Month is required' });
      }
      const statistics = await TransactionsStatisticsData(selectedMonth);
      res.json(statistics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBarChartData: async (req, res) => {
    try {
      const { selectedMonth } = req.query;
      if (!selectedMonth) {
        return res.status(400).json({ error: 'Month is required' });
      }

      const data = await barChartData(selectedMonth);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getPieChartData: async (req, res) => {
    try {
      const { selectedMonth } = req.query

      const categoriesStatistics = await pieChartData(selectedMonth);

      const formattedResponse = categoriesStatistics.map(({ category, itemCount }) => ({ category: category, itemCount }));

      res.json(formattedResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getCombinedData: async (req, res) => {
    try {
      const { selectedMonth } = req.query;

      if (!selectedMonth) {
        return res.status(400).json({ error: 'Month is required' });
      }

      const [transactions, statistics, barChartDataResult, pieChartDataResult] = await Promise.all([
        allTransactionsData(1, 10, ''),
        TransactionsStatisticsData(selectedMonth),
        barChartData(selectedMonth),
        pieChartData(selectedMonth)
      ]);

      const combinedData = {
        transactions,
        statistics,
        barChartData: barChartDataResult,
        pieChartData: pieChartDataResult
      };

      res.json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default transactionController;