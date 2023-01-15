import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
export default function Items() {

    function handleDeleteAction(id: number){
        alert("Delete ID " + id)
    }

    function handleEditAction(id: number){
        alert("Edit")
    }

    function createRow(
        id: number,
        name: string,
        quantity: number
    ){
        return {id, name , quantity}
    }

    //Load the item data
    const rows = [
        createRow(1,"item1", 10),
        createRow(2,"item2", 20),
        createRow(3,"item3", 30),
        createRow(4,"item4", 40),
    ]


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right"> 
                                <Button variant="outlined" 
                                startIcon={<EditIcon />}
                                onClick={() => {handleEditAction(row.id)}}>
                                     Edit
                                </Button>
                            </TableCell>
                            <TableCell align="right"> 
                                <Button variant="outlined" 
                                startIcon={<DeleteIcon />}
                                onClick={() => {handleDeleteAction(row.id)}}>
                                     Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}