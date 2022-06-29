import ExclamationIcon from "../icons/ExclamationIcon";
import MarkCircleIcon from "../icons/MarkCircleIcon";
import AlertWrapper from "./AlertWrapper";

interface IAlertProps extends  React.PropsWithChildren{
    isError?: boolean;
    message: string | JSX.Element;
}

function Alert({isError = false, message, children}: IAlertProps) {
    return(
        <AlertWrapper isOpen={false}>
            <div className="w-full flex flex-col justify-center px-8 py-6">
                <div className="mx-auto mt-3">
                    {
                        isError ? 
                        <ExclamationIcon color="#000326" size="50"/> :
                        <MarkCircleIcon color="#6DBD28" size="50" />
                    }
                </div>
                <p className="text-center my-10">{ message }</p>
                <div className="w-full justify-center">
                    { children }
                </div>
            </div>
        </AlertWrapper>
    )
}

export default Alert