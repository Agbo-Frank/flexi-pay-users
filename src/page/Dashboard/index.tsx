import Body from "../../components/Body";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

import { Route, Routes } from 'react-router-dom';
import Overview from "./Overview";
import SavedItems from "./SavedItems";


function Dashboard (): JSX.Element {
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <Header />
                <Categories />
                <ul className="flex xl:px-fp-5 2xl:px-fp-10 my-6 text-sm">
                    <li className="text-grey-700">Home /</li> 
                    <li> Overview</li>
                </ul>
                <div className="flex px-6 justify-between justify-stretch xl:px-fp-5 2xl:px-fp-10">
                    <SideBar />
                    <div className="h-full w-9/12">
                        <Routes>
                            <Route path="/" element={<Overview />}/>
                            <Route path="/saveditems" element={<SavedItems />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default Dashboard