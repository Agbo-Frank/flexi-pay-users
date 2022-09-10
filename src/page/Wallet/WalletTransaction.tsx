import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import React, { useEffect } from "react"
import { ITransacation } from "../../interface"
import { useLazyGetTransactionQuery } from "../../redux/api/wallet"


function Row({txn}: {txn: ITransacation}){

    function formateDate(date: string){
        let d = new Date(date)
        let dd = d.getDay()
        let mm = d.getMonth()
        let yy = d.getFullYear()

        return `${dd}/${mm}/${yy}`
    }
    return (
        <TableRow hover 
        // sx={{'&:hover': {boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'}}}
        >
            <TableCell className="flex items-center space-x-2">
                <i className={`fa-solid ${txn.type === "CREDIT" ? "text-[#8EC162] bg-[#8EC162]/20 fa-arrow-down" : "text-[#FF5000] bg-[#FF5000]/20 fa-arrow-up"}  rounded-full w-6 h-6 inline-grid place-items-center`}></i>
                <span>{txn.type === "CREDIT" ? "Credit" : "Debit"}</span>
            </TableCell>
            <TableCell>₦ {txn.amount}</TableCell>
            <TableCell className="" sx={{maxWidth: 300}}><span className="capitalize truncate w-full block text-sm">{txn.info}</span></TableCell>
            <TableCell>
                <span className={txn.status === "SUCCESSFUL" ? "text-[#8EC162] bg-[#8EC162]/20 p-1" : "text-[#FF5000] bg-[#FF5000]/20 p-1 text-xs" }>
                    { txn?.status }
                </span>
            </TableCell>
            <TableCell>{ formateDate(txn.created_at)}</TableCell>
            <TableCell>Debit Card</TableCell>
        </TableRow>
    )
}

export function WalletTransaction(){
    let [getTransaction, {transaction, pagination, isLoading}] = useLazyGetTransactionQuery({
        selectFromResult: ({ data, isLoading }) => ({
            transaction: data?.result.data,
            pagination: data?.result,
            isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    useEffect(() => {
        getTransaction("1")
    }, [transaction, pagination])
    function onChangePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number){
        getTransaction(page.toString())
    }
    return(
        <div className="w-full">
            <TableContainer className="bg-white rounded-lg" sx={{ maxHeight: 340 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                    <TableHead sx={{bgcolor: '#F9F8FF'}}>
                        <TableRow className="text-[#545362]" sx={{bgcolor: '#F9F8FF'}}>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Type</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Amount</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Description</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Status</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Date</TableCell>
                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Actions</TableCell>
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
                    onPageChange={onChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-white"
                />
            }
            
        </div>
    )
}