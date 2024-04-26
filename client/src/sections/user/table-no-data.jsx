import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';


export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 6,  }}>
        <Paper
          sx={{
            textAlign: 'center',
          
          }}
        >
          <Typography variant="h6" paragraph sx={{marginLeft:'230px'}}>
            Not found
          </Typography>

          <Typography variant="body2" sx={{marginLeft:'230px'}} >
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
