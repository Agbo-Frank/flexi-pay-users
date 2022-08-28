import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

export function DropDown({id,component, arrow, children }: any){
    let [toggle,  setToggle] = useState<null | HTMLElement>(null)
    const open = Boolean(toggle);
    const handleClose = () => {
        setToggle(null);
    };
    return(
        <>
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => setToggle(e.currentTarget)}
                id="basic-button"
                className="font-light">
                {component} 
                {arrow && 
                    <span className='ml-3 font-light'>
                        {
                            toggle ? 
                            <i className="fa-solid fa-chevron-up"></i>:
                            <i className="fa-solid fa-chevron-down"></i>
                        }
                    </span>
                }
                
            </button>
            <Menu
                id={id}
                anchorEl={toggle}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {children}
            </Menu>
        </>
    )
}

export default DropDown