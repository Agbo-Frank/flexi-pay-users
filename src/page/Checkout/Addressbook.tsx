import ModelWrapper from "../../components/Models/ModelWrapper";




export function AddressBook({open, close}: {open: boolean, close: () => void | any}){
    return(
        <ModelWrapper isOpen={open} closeModal={close}>

        </ModelWrapper>
    )
}

export default AddressBook