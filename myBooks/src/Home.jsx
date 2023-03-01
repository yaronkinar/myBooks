import React from "react";
import { UserContext} from "./App"

import Nav from "./Nav.jsx";
import Books from "./Books.jsx";
export const Home = () => {
    const data = React.useContext(UserContext);
    console.log(data.user)


    return (
        <>
        <Nav isFave={false}/>
            <Books/>

        </>
    );
};
