import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ITransacation, IUserTransacation } from "../../interface"
import { useGetUserTransactionQuery, useLazyGetTransactionQuery } from "../../redux/api/wallet"
import moment from "moment"
import { formatNumber } from "../../utils"


function Row({txn}: {txn: IUserTransacation}){
    return (
        <TableRow hover 
        // sx={{'&:hover': {boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'}}}
        >
            <TableCell className="flex items-center space-x-2">{ txn.reference }</TableCell>
            <TableCell>₦ {formatNumber(txn.amount)}</TableCell>
            <TableCell className="" sx={{maxWidth: 300}}><span className="capitalize truncate w-full block text-sm">{txn.service_type}</span></TableCell>
            <TableCell className="" sx={{maxWidth: 300}}><span className="capitalize truncate w-full block text-sm">{txn.service_provider}</span></TableCell>
            <TableCell>{txn.narration}</TableCell>
            <TableCell>
                <span className={`${txn.status == "SUCCESSFUL" ? "text-[#8EC162] bg-[#8EC162]/20 p-1" : txn.status == "failed" ? "text-[#FF5000] bg-[#FF5000]/20" : "text-[#000] bg-[#000]/20"} p-1 text-xs`}>
                    { txn?.status.toUpperCase() }
                </span>
            </TableCell>
            <TableCell>{ moment(txn.created_at).format('l')}</TableCell>
        </TableRow>
    )
}

export function UserTransaction(){
    let [page, setPage] = useState(1)
    let {transaction, pagination, isLoading} = useGetUserTransactionQuery(page, {
        selectFromResult: ({ data, isLoading }) => ({
            transaction: data?.result.data,
            pagination: data?.result,
            isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })
    console.log(transaction)
    return(
        <div className="w-full">
            <TableContainer className="bg-white rounded-lg" sx={{ maxHeight: 340 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                    <TableHead sx={{bgcolor: '#F9F8FF'}}>
                        <TableRow className="text-[#545362]" sx={{bgcolor: '#F9F8FF'}}>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Ref</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Amount</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Service Type</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Service Provider</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Description</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Status</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !isLoading &&  
                            transaction?.length === 0 ?<div>No Transaction</div>:
                            transaction?.map((txn) => (
                                <Row txn={txn}/>
                            ))
                        }
                    </TableBody>
                    
                </Table>
                <div>
                    {   
                        isLoading && 
                        <div className="flex justify-center w-full p-7 border mx-auto">
                            <CircularProgress /> 
                        </div>
                    }
                </div>
            </TableContainer>
            {
                pagination &&
                <TablePagination
                    rowsPerPageOptions={[pagination.per_page]}
                    component="div"
                    count={pagination.total}
                    rowsPerPage={pagination.per_page}
                    page={pagination.current_page}
                    onPageChange={(e, page) => setPage(page)}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-white"
                />
            }
            
        </div>
    )
}

export default UserTransaction