import { Dispatch, SetStateAction } from "react"

export default interface Iicon {
    size: string;
    color: string;
    line?: boolean
}

export interface ISwitch {
    label: string,
    isTrue: boolean,
    handleClick: () => any
}

export interface IButtonProps extends  React.PropsWithChildren{
    type?: ('button' | 'submit');
    outline?: boolean;
    color: string;
    disable?: boolean;
    onClick?: () => any
}

export interface IInputProps {
    Icon?: React.FC<Iicon>;
    type: string;
    name: string;
    label: string;
    formik: any
}

export interface IModel extends React.PropsWithChildren {
    isOpen: boolean,
    size?: 'medium' | 'large';
    closeModal?: () => any
}

export interface IAddAddress {
    name: string;
    phoneNumber: string
}

export interface ISelectInput {
    label: string
}

export interface ICreditCard {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface ICreditCardComponent {
    type: 'master' | 'visa'
}
  