import { createSlice } from "@reduxjs/toolkit";
import {getAllTransactions,getStatistics,getBarChartData,getCombinedData,getPieChartData} from './transactionAction';

const initialState = {
  transactions: null,
  statistics: null,
  pieChart: null,
  barChart: null,
  combinedData: null,
  loading: false
}



const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
   
    builder.addCase(getAllTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload
    });
    builder.addCase(getAllTransactions.rejected, state => {
      state.loading = false;
    });
   
    builder.addCase(getStatistics.pending, state => {
      state.loading = true;
    });
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      state.loading = false;  
      state.statistics = action.payload
    });
    builder.addCase(getStatistics.rejected, state => {
      state.loading = false;
    });
   
    builder.addCase(getBarChartData.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBarChartData.fulfilled, (state, action) => {
      state.loading = false;
      state.barChart = action.payload
    });
    builder.addCase(getBarChartData.rejected, state => {
      state.loading = false;
    });
   
    builder.addCase(getPieChartData.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPieChartData.fulfilled, (state, action) => {
      state.loading = false;
      state.pieChart = action.payload
    });
    builder.addCase(getPieChartData.rejected, state => {
      state.loading = false;
    });
   
    builder.addCase(getCombinedData.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCombinedData.fulfilled, (state, action) => {
      state.loading = false;
      state.combinedData = action.payload
    });
    builder.addCase(getCombinedData.rejected, state => {
      state.loading = false;
    });

  },
});
export default transactionSlice.reducer;
