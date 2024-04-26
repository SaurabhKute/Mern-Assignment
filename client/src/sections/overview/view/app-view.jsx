
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import UserPage from '../../user/view/user-view';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import { useSelector } from 'react-redux';


export default function AppView() {

  const stats = useSelector(state => state.transactions.statistics);
  const pieChartData = useSelector(state => state.transactions.pieChart);
  const barChartData = useSelector(state => state.transactions.barChart);

  const chartData = barChartData?.map(item => ({
    x: item.range.replace(' ', ''), // Remove spaces for consistency
    y: item.count
  }));

  const pieData = pieChartData?.map((item) => ({
    label: item.category.replace(' ', ' '),
    value: item.itemCount
  }))

  return (
    <Container maxWidth="md">  
      <Typography variant="h4" sx={{ mb: 5, mt:4 ,textAlign: 'center' }}>
        Tranasaction Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">

        <Grid xs={12} sm={12} md={12}>
          <UserPage />
        </Grid>


        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Sale"
            subheader="₹"
            total={Number(stats?.totalSaleAmount ? stats?.totalSaleAmount : 0).toFixed(2)}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Sold Items"
            // subheader="Items"
            total={stats?.totalSoldItems ? stats?.totalSoldItems : 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Not Sold Items"
            // subheader="Items"
            total={stats?.totalNotSoldItems ? stats?.totalNotSoldItems : 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>



        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Bar Chart Statistics"
            subheader=""
            chart={{
              series: [{
                data: chartData
              }]

            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: pieData
            }}
          />
        </Grid> */}


<Grid item xs={12} md={6} lg={8}>
  {chartData && chartData?.length > 0 && (
    <AppWebsiteVisits
      title="Bar Chart Statistics"
      subheader=""
      chart={{
        series: [{
          data: chartData
        }]
      }}
    />
  )}
</Grid>

<Grid item xs={12} md={6} lg={4}>
  {pieData && pieData?.length > 0 && (
    <AppCurrentVisits
      title="Pie Chart Statistics"
      chart={{
        series: pieData
      }}
    />
  )}
</Grid>



      </Grid>
    </Container>

  );
}
