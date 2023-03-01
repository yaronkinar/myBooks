import React, {useContext, useEffect, useState} from 'react';
import {BASE_URL, UserContext} from "./App.jsx";
import Book from "./Book.jsx";

import axios from "axios";
import Nav from "./Nav"

const Fav = () => {
    const {favourites} = useContext(UserContext);
    const [myFav, setMyFav] = useState([]);



    useEffect(()=>{
        async function getData(){
           let endpoints = favourites.map((favourites)=>{
               return `${BASE_URL}/${favourites}`
           });
           console.log(endpoints)
            Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                axios.spread((...allData) => {
                  //  console.log({ allData });
                    let map = allData.map((data)=>{
                        return data.data
                    });
                    setMyFav(map)

                })
            );

     /*       let url = new URL(BASE_URL);
            url.searchParams.set('q', query);
            url.searchParams.set('startIndex', startIndex+10);
            setQuery(query)

            let axiosResponse = await axios.get(url);
            const data = axiosResponse.data?.items
            console.log(data)
            setBooks(data)*/
        }
        getData()
    },[favourites])
    return (
        <>
            <Nav isFav={true}/>
            <div className="grid">

               {myFav?.map((book)=>{
                    return (
                        <Book key={book.id} id={book.id} info={book?.volumeInfo}></Book>



                    )
                })}
                {!myFav.length && (<div> Nothing to see here</div>)}
            </div>
        </>

    );
};

export default Fav;
