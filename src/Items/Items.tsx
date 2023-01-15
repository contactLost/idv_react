import {useState} from 'react';
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
import * as AxiosConfig from "../AxiosConfig.js";
import { useEffect } from 'react';
import React from 'react';
import BottomBar from './BottomBar.tsx';


export default function Items() {

    const [items, setItems] = useState<ItemListResponse|null>(null )
    const [refetch, setRefetch] = useState<boolean>(false)

    async function handleAddItem(){

        var Iname = prompt("Item Name")
        var Idesc = prompt("Item Description")
        var Iquan = prompt("Item Quantity")

        const result = await AxiosConfig.default.post(
            "/item/addItem",
            {
                "itemDesc": Idesc,
                "itemName": Iname,
                "itemQuan": Iquan
            }).then(resp=> setItems(null))
        
    }

    async function changePasswordHandler(){
        var newPass = prompt("New Password")

        var user = JSON.parse(sessionStorage.getItem("userinfo")!)

        const result = await AxiosConfig.default.post(
            "/user/updatePassword",
            {
                "id": user.id,
                "userName": user.userName,
                "password": newPass
            }).then(resp=> setItems(null))
    }

    async function handleDeleteAction(id: number){

        console.log(id)

        const result = await AxiosConfig.default.post(
            "/item/deleteItem",
            {
                "id": id,
            }).then(resp=>{
                setItems(null);
                setRefetch(true)
            })
    }

    async function handleEditAction(id: number){

        var Iname = prompt("Item Name")
        var Idesc = prompt("Item Description")
        var Iquan = prompt("Item Quantity")

        const result = await AxiosConfig.default.post(
            "/item/updateItem",
            {
                "itemid": id,
                "itemDesc": Idesc,
                "itemName": Iname,
                "itemQuan": Iquan
            }).then(resp=> {
                setItems(null)
                setRefetch(true)
            })
    }

    useEffect( () => {
        AxiosConfig.default.get("/item/getItemsOfUser").then( resp=>
            setItems(resp.data)
        )
    })

    if(!items) return "Loading...";
    return (
        
        <>
        <TableContainer component={Paper}>
            <Button/>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.itemList.map((row) => (
                        <TableRow
                            key={row.itemName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.itemName}</TableCell>
                            <TableCell align="right">{row.itemDescription}</TableCell>
                            <TableCell align="right">{row.itemQuantity}</TableCell>
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
        <Button sx={{"marginTop": "10px"}} variant="outlined" onClick={handleAddItem}>
            Create New Item
        </Button>
        <BottomBar></BottomBar>
        </>
    );

}
class ItemListResponse{

    itemList: [
        {
            "id": number,
            "itemName": string,
            "itemDescription": string,
            "itemQuantity": number,
            "itemOwner": null
        }
    ]

}