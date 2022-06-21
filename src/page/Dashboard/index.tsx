import Body from "../../components/Body";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

import { Route, Routes } from 'react-router-dom';
import Overview from "./Overview";


function Dashboard (): JSX.Element {
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <Header />
                <Categories />
                <div className="flex px-6 justify-between justify-stretch xl:px-fp-5 2xl:px-fp-10">
                    <SideBar />
                    <div className="h-full w-9/12">
                        <Routes>
                            <Route path="/" element={<Overview />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default Dashboard