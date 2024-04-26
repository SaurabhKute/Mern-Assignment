import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a base URL for the API
const BASE_URL = 'http://localhost:8000/api/transactions';

export const getAllTransactions = createAsyncThunk('Transactions/allTransactions', async ({searchQuery,page,rowsPerPage}) => {

  try {
    const response = await axios.get(`${BASE_URL}?searchQuery=${searchQuery}&page=${page}&rowsPerPage=${rowsPerPage}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getStatistics = createAsyncThunk('Transactions/statistics', async (query) => {

  try {
    try {
      const response = await axios.get(`${BASE_URL}/statistics?selectedMonth=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getBarChartData = createAsyncThunk('Transactions/barChart', async (query) => {

  try {
    try {
      const response = await axios.get(`${BASE_URL}/bar-chart?selectedMonth=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getPieChartData = createAsyncThunk('Transactions/pieChart', async (query) => {

  try {
    try {
      const response = await axios.get(`${BASE_URL}/pie-chart?selectedMonth=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getCombinedData = createAsyncThunk('Transactions/combinedData', async (query) => {

  try {
    try {
      const response = await axios.get(`${BASE_URL}/combined-data?selectedMonth=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
});