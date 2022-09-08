import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export function Breadcrumb(){
    let location = useLocation()
    return(
        <header className="hidden sm:block w-full">
            <div className="my-2 fp-screen">
                <MuiBreadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}>
                    {
                        location.pathname.split('/').map((location, idx) => (
                            <Link 
                                to={location === '' ? "/" : `/${location}`}
                                className="text-sm"
                                key={idx}>{location === '' ? "Home" : location}</Link>
                        ))
                    }
                </MuiBreadcrumbs>
            </div>
        </header>
    )
}

export default Breadcrumb