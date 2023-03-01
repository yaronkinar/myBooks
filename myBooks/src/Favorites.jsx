import React, {useEffect, useState} from 'react';
import {BASE_URL, UserContext} from "./App.jsx";
import Book from "./Book.jsx";
import {Button, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import axios from "axios";
import Nav from "./Nav"

const Fav = () => {
    const {startIndex,setStartIndex,query,setQuery,setBooks,favourites} = React.useContext(UserContext);
    const [myFav, setMyFav] = useState([]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
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
                    console.log(map)
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
            </div>
        </>

    );
};

export default Fav;
