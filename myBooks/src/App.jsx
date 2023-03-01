import React, { useState } from 'react'
import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes, useParams} from "react-router-dom";
import Login from "./Login.jsx";
import {Home} from "./Home.jsx";
import axios from "axios";
import BookDetail from "./BookDetail.jsx";
import Fav from "./Favorites.jsx";
export const UserContext = React.createContext({
    user:"",
    setUser:()=>{

    },
    startIndex:0,
    setStartIndex:()=>{

    },
    books:[],
    setBooks:()=>{

    },
    query:"",
    setQuery:()=>{

        },
    favourites:[],
    setFavourites:()=>{

    }


});
export  const BASE_URL = `https://www.googleapis.com/books/v1/volumes`




function App() {
    const [user, setUser] = useState({user:""})
    const [books, setBooks] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [query, setQuery] = useState("")
    const [favourites, setFavourites] = useState([])
    let { id } = useParams();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <UserContext.Provider value={{
                user,setUser
            }}><Login/>
            </UserContext.Provider>,
        },{
            path: "/home",
            element:

                <UserContext.Provider value={{
                user,setUser,books,setBooks,startIndex,setStartIndex,setQuery,query,setFavourites,favourites
            }}>

                        <Home/>


            </UserContext.Provider>,
        },{
            path: "/book/:id",

            element:

                <UserContext.Provider value={{
                user,setUser,books,setBooks,startIndex,setStartIndex,setQuery,query,setFavourites,favourites
            }}>

                        <BookDetail id={id}/>


            </UserContext.Provider>,
        },{
            path: "/favourites",

            element:

                <UserContext.Provider value={{
                user,setUser,books,setBooks,startIndex,setStartIndex,setQuery,query,setFavourites,favourites
            }}>

                        <Fav/>


            </UserContext.Provider>,
        },
    ]);


  return (
      <UserContext.Provider value={{
          user,
          setUser,
          books,
          setBooks
      }}>
    <div className="app">


            <RouterProvider router={router} />


    </div>
</UserContext.Provider>
  )
}

export default App
