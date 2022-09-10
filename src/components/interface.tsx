import { ICart, IDetails, IProduct } from "../interface";

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
    onClick?: () => any | undefined | void
}

export interface IInputProps {
    Icon?: React.FC<Iicon>;
    type: string;
    name: string;
    label: string | undefined;
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
    label: string,
    data?: {value: string, label: string}[],
    name: string;
    // cb?: (a?: string) => any
    onChange?: (a?: string) => any | void
    formik: any
}

export interface IAutoComplete {
    label: string,
    data?: any[] | null,
    name: string;
    onChange?: (a?: any) => any | void;
    formik: any;
    size?: 'small' | 'large';
    loading?: boolean;
    getOptions?: (option: any) => any
}

export interface IDateInput {
    label: string;
    name: string;
    formik?: any
}

export interface ICreditCard {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface ICreditCardComponent {
    type: 'master' | 'visa',
    hasBorder?: boolean
}

export interface IWrapperProps extends  React.PropsWithChildren{
    styles?: string
}

export interface ICheckoutSummaryProps {
    checkoutdetails?: Partial<IDetails>[] | Partial<ICart>[] ,
    price: {
        total: number;
        sub_total: number;
        total_delivery_fee: number | null;
        vat: number | null
    }
}
  