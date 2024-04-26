import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Ima
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';

import Iconify from '../../components/iconify/iconify';
import Label from '../../components/label';
import { Typography } from '@mui/material';


export default function UserTableRow({
  id,
  title,
  description,
  price,
  category,
  sold,
  image,
}) {

  return (
    <>
      <TableRow hover tabIndex={-1} >
        <TableCell></TableCell>

        <TableCell  >

          {id}
        </TableCell>

        <TableCell>
          {title.slice(0, 20)+'...'}
        </TableCell>

        <TableCell>
          {description.slice(0, 50)+'...'}
        </TableCell>

        <TableCell>
          {Number(price).toFixed(2)} ₹
        </TableCell>

        <TableCell>
          {category}
        </TableCell>

        <TableCell>
          <Label color={(sold == true && 'error') || 'success'}>{sold ? "Sold" : "Available"}</Label>
        </TableCell>

        {/* <TableCell align="center">{ sold ? 'Yes' : 'No'}</TableCell> */}
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Image alt={title} src={image} /> */}
          <img 
          
         style={{height:35, width:35, marginLeft:20}}
          src={image} alt={title} loading='lazy' />
          {/* <Typography variant="subtitle2" noWrap>
              {name}
            </Typography> */}
          </Stack>
        </TableCell>


      </TableRow>

    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  price: PropTypes.any,
  category: PropTypes.any,
  sold: PropTypes.any,
  image: PropTypes.any,
};
