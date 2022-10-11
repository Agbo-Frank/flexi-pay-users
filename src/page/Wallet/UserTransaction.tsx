import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import { IUserTransacation } from "../../interface"
import { useLazyGetUserTransactionQuery } from "../../redux/api/wallet"
import moment from "moment"
import { formatNumber } from "../../utils"
import { CopyText, Empty, Wrapper } from "../../components"
import { UserTxnDetails } from "./TransactionDetails"
import { EditSqaureIcon, SubscriptionIcon, WalletIcon } from "../../components/icons"
import { IWalletBalanceProps } from "./WalletBalance"


function Row({txn}: {txn: IUserTransacation}){
    let [open, setOpen] = useState(false)
    return (
        <>
            <UserTxnDetails txn={txn} open={open} close={() => setOpen(false)}/>
            <TableRow hover 
            // sx={{'&:hover': {boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'}}}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
            >
                <TableCell className="flex items-center space-x-2" sx={{maxWidth: 100}}>
                    <span className="capitalize truncate w-full block text-sm">
                        <CopyText text={ `${txn?.reference}` } />
                    </span>
                </TableCell>
                <TableCell>
                    <span className="capitalize truncate text-sm">
                        ₦ {formatNumber(`${txn?.amount}`)}
                    </span>
                </TableCell>
                <TableCell><span className="capitalize truncate w-full block text-sm">{txn?.service_type}</span></TableCell>
                <TableCell><span className="capitalize truncate w-full block text-sm">{txn?.service_provider}</span></TableCell>
                <TableCell className="100px" sx={{maxWidth: 250}}>
                    <span className="capitalize truncate w-full block text-sm">
                        {txn?.narration}
                    </span>
                </TableCell>
                <TableCell>
                    <span className={`${txn?.status == "SUCCESSFUL" ? "text-[#8EC162] bg-[#8EC162]/20 p-1" : txn?.status == "failed" ? "text-[#FF5000] bg-[#FF5000]/20" : "text-[#000] bg-[#000]/20"} p-1 text-xs`}>
                        { txn?.status.toUpperCase() }
                    </span>
                </TableCell>
                {/* <TableCell>{ moment(txn?.created_at).format('l')}</TableCell> */}
            </TableRow>
        </>
    )
}

export function UserTransaction({ open, setOpen}: IWalletBalanceProps){
    let [page, setPage] = useState(1)
    let [getUserTransaction, {transaction, pagination, isLoading}] = useLazyGetUserTransactionQuery({
        selectFromResult: ({ data, isLoading }) => ({
            transaction: data?.result.data,
            pagination: data?.result,
            isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })
    
    useEffect(() => {
        getUserTransaction(page.toString())
    }, [page])
    console.log(transaction)
    return(
        <div className="w-full">
            {
                isLoading || (transaction && transaction.length === 0) ?
                <div>
                <TableContainer className="bg-white rounded-lg" sx={{ maxHeight: 340 }}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                        <TableHead sx={{bgcolor: '#F9F8FF'}}>
                            <TableRow className="text-[#545362]" sx={{bgcolor: '#F9F8FF'}}>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}} width='50px'>Ref</TableCell>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Amount</TableCell>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Type</TableCell>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Provider</TableCell>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}} width={100}>Description</TableCell>
                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Status</TableCell>
                                {/* <TableCell sx={{color: '#545362', fontSize: 15.5}}>Date</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                transaction?.map((txn) => (<Row txn={txn}/>))
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
                        // rowsPerPageOptions={[pagination.per_page]}
                        component="div"
                        count={pagination?.total || 0}
                        rowsPerPage={pagination?.per_page || 0}
                        page={pagination?.current_page || 0}
                        onPageChange={(e, page) => setPage(page)}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                        className="bg-white"
                    />
                }
                </div>:
                <Wrapper styles="grid place-items-center">
                    <Empty 
                        button={
                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<EditSqaureIcon color="white" size="16"/>}
                                onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                                size="large"
                            >
                                Fund Wallet
                            </Button>
                        } 
                        Icon={WalletIcon} 
                        title="No Transaction Yet" 
                        message="You currently don’t have any Trasaction at the moment, kindly fund your wallet" 
                    />
                </Wrapper>
            }
        </div>
    )
}

export default UserTransaction