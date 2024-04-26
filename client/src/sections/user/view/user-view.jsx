import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';

import { useDispatch } from 'react-redux';
import { getAllTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData } from '../../../features/Transactions/transactionAction';
import { emptyRows } from '../utils';
import { Pagination, Stack, Typography } from '@mui/material';

export default function UserPage() {
    const dispatch = useDispatch();

    // State for the current page, rows per page, and transactions
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [transaction, setTransaction] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages,setTotalPages] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('3');

    // Debounce the search query
    useEffect(() => {
        const debouncedHandle = setTimeout(() => {
            dispatch(getAllTransactions({ searchQuery, page, rowsPerPage }))
                .then(transactionData => {
                    setTransaction(transactionData.payload.transactions);
                    setTotalPages(transactionData.payload.totalPages);
                    setPage(transactionData.payload.currentPage);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, 100); // Debounce delay
    
        // Clear the timeout if the component unmounts or searchQuery or page changes
        return () => clearTimeout(debouncedHandle);
    }, [searchQuery, page, rowsPerPage, dispatch]);
    



    useEffect(() => {
        dispatch(getStatistics(selectedMonth));
        dispatch(getBarChartData(selectedMonth));
        dispatch(getPieChartData(selectedMonth));
        dispatch(getCombinedData(selectedMonth))
    }, [selectedMonth]);

    // Handle changes in the search query
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value)
    }

    const handlePageChange = (event,value) =>{
        setPage(value);
    }

    // Filter data based on search query
    const filteredData = transaction.filter(
        ({ title, description, price }) => (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            price.toString().includes(searchQuery)
        )
    );

    // Check if no results were found
    const notFound = !filteredData?.length && !!searchQuery;

    return (
        <Container>
            <Card>
                {/* Toolbar with search input */}
                <UserTableToolbar search={searchQuery} onSearch={handleSearch} onMonthChange={handleMonthChange} month={selectedMonth} />

                <Scrollbar>
                    {/* Table container */}
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            {/* Table head */}
                            <UserTableHead headLabel={[
                                { id: 'id', label: 'ID' },
                                { id: 'title', label: 'Title' },
                                { id: 'description', label: 'Description' },
                                { id: 'price', label: 'Price' },
                                { id: 'category', label: 'Category' },
                                { id: 'sold', label: 'Sold' },
                                { id: 'image', label: 'Image' },
                            ]} />
                            {/* Table body */}
                            <TableBody>
                                {/* Render filtered data */}
                                {filteredData
                                    .slice(0, rowsPerPage)
                                    .map((row, index) => (
                                        <UserTableRow
                                            key={index}
                                            id={row.id}
                                            title={row.title}
                                            description={row.description}
                                            price={row.price}
                                            category={row.category}
                                            sold={row.sold}
                                            image={row.image}
                                        />
                                    ))
                                }

                                {/* Render "no data found" message */}
                                {notFound && <TableNoData query={searchQuery} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

    
                <Stack spacing={2} sx={{padding:"25px" ,float:'right'}}>
                <Pagination count={totalPages} color="primary" onChange={handlePageChange} />
                </Stack>

            </Card>
        </Container>
    );
}
