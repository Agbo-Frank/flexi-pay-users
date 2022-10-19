import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export function Breadcrumb({title}: {title?: string}){
    let {pathname} = useLocation()
    return(
        <header className="hidden sm:block w-full">
            <div className="my-2 fp-screen">
                <MuiBreadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}>
                    {
                        pathname.split('/').map((location, idx, paths) => (
                            <Link 
                                to={location === '' ? "/" : `/${location}`}
                                className="text-sm capitalize"
                                key={idx}>
                                    {
                                        location === '' ? 
                                        "Home" : 
                                        (paths.length === idx + 1 && title) ?
                                        title :
                                        location.replace(/-/g, ' ')
                                    }
                                </Link>
                        ))
                    }
                </MuiBreadcrumbs>
            </div>
        </header>
    )
}

export default Breadcrumb