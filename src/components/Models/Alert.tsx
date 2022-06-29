import ExclamationIcon from "../icons/ExclamationIcon";
import MarkCircleIcon from "../icons/MarkCircleIcon";
import ModelWrapper from "./ModelWrapper";

interface IAlertProps extends  React.PropsWithChildren{
    isError: boolean;
    message: boolean;
}

function Alert({isError = false, message, children}: IAlertProps) {
    return(
        <ModelWrapper>
            <div>
                {
                    isError ? 
                    <ExclamationIcon color="#000326" size="60"/> :
                    <MarkCircleIcon color="#6DBD28" size="60" />
                }
                <p>{ message }</p>
                <div>
                    { children }
                </div>
            </div>
        </ModelWrapper>
    )
}

export default Alert