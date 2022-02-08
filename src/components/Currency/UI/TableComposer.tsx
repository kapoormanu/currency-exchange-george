import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Currency } from 'types/currency';
import CurrencyItem from 'components/Currency/UI/CurrencyItem';

type TableComposerProps = {
    headers: string[];
    rows: Currency[];
    baseCurrency: string;
    loadingFailure?: boolean;
};
export const TableComposer = ({ headers, rows, baseCurrency, loadingFailure }: TableComposerProps) => {
    const INITIAL_PAGE = 0;
    const ALL_ROWS = -1;

    const [page, setPage] = React.useState(INITIAL_PAGE); // Set initial page to zero
    const [rowsPerPage, setRowsPerPage] = React.useState(ALL_ROWS);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, maxWidth: '90vw', margin: '0 auto' }} aria-label='Currency List'>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 &&
                        (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                            (row) => (
                                <CurrencyItem
                                    currencyData={row}
                                    baseCurrency={baseCurrency}
                                    key={row.currency}></CurrencyItem>
                            )
                        )}
                    {!loadingFailure && rows.length === 0 && (
                        <tr>
                            <td colSpan={5} role='alert' className='fade alert alert-danger show'>
                                No currencies available.
                            </td>
                        </tr>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[{ label: 'All', value: -1 }, 5, 10, 25, 50]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page'
                                },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
