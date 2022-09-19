import { CopyText } from "../../components";
import ModelWrapper from '../../components/Models/ModelWrapper';
import { formatNumber } from '../../utils';
import moment from 'moment';
import { ITransacation, IUserTransacation } from '../../interface';

interface TxnModal<T> {
    txn:T,
    open: boolean;
    close: () => void | any
}

export function WalletTxnDetails({txn, open, close}: TxnModal<ITransacation>){
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Transaction Details">
            <div className="mx-4 h-fit pb-4">
                <ul className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg mb-3 space-y-2">
                    <li className='flex justify-between'>
                        <span>Transaction ref:</span>
                        <span className="mr-2"> <CopyText text={`${txn.reference}`}/></span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Transaction Type:</span>
                        <span>{txn.type}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Status:</span>
                        <span className={`${txn.status == "SUCCESSFUL" ? "text-[#8EC162] bg-[#8EC162]/20 p-1" : txn.status == "failed" ? "text-[#FF5000] bg-[#FF5000]/20" : "text-[#000] bg-[#000]/20"} p-1 text-xs`}>
                            { txn?.status }
                        </span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Amount:</span>
                        <span>₦ {formatNumber(`${txn.amount}`)}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Charges:</span>
                        <span> ₦ {formatNumber(`${txn.charges}`)}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Previous Balance:</span>
                        <span>₦ {formatNumber(`${txn.prev_balance}`)}</span>
                    </li>
                    <li className='flex justify-between font-semibold'>
                        <span>Balance:</span>
                        <span>₦ {formatNumber(`${txn.new_balance}`)}</span>
                    </li>
                </ul>
                
                {/* <div className="flex flex-col sm:flex-row justify-between gap-5 mb-4"> */}
                    <div className="text-grey-200 text-sm p-3 border border-solid rounded-lg w-full leading-7">
                        <div className="leading-7">
                            <h2 className="font-semibold">Description</h2>
                            <p className="text-grey-200 text-sm">{txn.info}</p>
                        </div>
                        <div className="leading-7">
                            <h2 className="font-semibold">Time and Date</h2>
                            <p className="text-grey-200 text-sm">{moment(txn.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                    </div>
                    
                {/* </div> */}
            </div>
        </ModelWrapper>
    )
}

export function UserTxnDetails({txn, open, close}: TxnModal<IUserTransacation>){
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Transaction Details">
            <div className="mx-4 h-fit pb-4">
                <ul className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg mb-3 space-y-2">
                    <li className='flex justify-between'>
                        <span>Transaction ref:</span>
                        <span> <CopyText text={`${txn.reference}`}/></span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Status:</span>
                        <span className={`${txn?.status == "SUCCESSFUL" ? "text-[#8EC162] bg-[#8EC162]/20 p-1" : txn?.status == "failed" ? "text-[#FF5000] bg-[#FF5000]/20" : "text-[#000] bg-[#000]/20"} p-1 text-xs`}>
                            { txn?.status.toUpperCase() }
                        </span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Service Type:</span>
                        <span>{txn.service_type}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Service Provider:</span>
                        <span>{txn.service_provider}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Service Number:</span>
                        <span>{txn.service_number}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span>Amount:</span>
                        <span>₦ {formatNumber(`${txn.amount}`)}</span>
                    </li>
                </ul>
                
                {/* <div className="flex flex-col sm:flex-row justify-between gap-5 mb-4"> */}
                    <div className="text-grey-200 text-sm p-3 border border-solid rounded-lg w-full leading-7">
                        <div className="leading-7">
                            <h2 className="font-semibold">Description</h2>
                            <p className="text-grey-200 text-sm">{txn.narration}</p>
                        </div>
                        <div className="leading-7">
                            <h2 className="font-semibold">Time and Date</h2>
                            <p className="text-grey-200 text-sm">{moment(txn.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                    </div>
                    
                {/* </div> */}
            </div>
        </ModelWrapper>
    )
}

export default WalletTxnDetails