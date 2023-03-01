import React, {useEffect} from 'react';
import {BASE_URL, UserContext} from "./App.jsx";
import Book from "./Book.jsx";
import {Button} from "@mui/material";
import axios from "axios";

const Books = () => {
    const {books,startIndex,setStartIndex,query,setQuery,setBooks} = React.useContext(UserContext);


    useEffect(()=>{
        async function getData(){

            if(startIndex>=0){
                let url = new URL(BASE_URL);
                url.searchParams.set('q', query);
                url.searchParams.set('startIndex', startIndex);
                setQuery(query)

                let axiosResponse = await axios.get(url);
                const data = axiosResponse.data?.items
                console.log(data)
                setBooks(data)
            }


        }
        getData()
    },[startIndex])
    return (
        <>
            {books.length > 0 && (

                <div className="buttons">
                    <Button variant="contained" onClick={()=>{
                        setStartIndex((curr)=>{
                            console.log(curr)

                            return curr-10
                        })
                        console.log(query)
                    }}>Back</Button>
                    <Button variant="contained" onClick={()=>{
                        setStartIndex((curr)=>{
                            return curr+10
                        })
                        console.log(query)
                    }}>Next</Button>
                </div>
            )}

            <div className="grid">

                {books?.map((book)=>{
                    return (
                        <Book key={book.id} id={book.id} info={book?.volumeInfo}></Book>



                    )
                })}
            </div>
        </>

    );
};

export default Books;
