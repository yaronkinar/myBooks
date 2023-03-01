import React, {useEffect} from 'react';
import {BASE_URL, UserContext} from "./App.jsx";
import Book from "./Book.jsx";
import {Button, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import axios from "axios";

const Books = () => {
    const {books,startIndex,setStartIndex,query,setQuery,setBooks,favourites} = React.useContext(UserContext);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    useEffect(()=>{
        async function getData(){
            if(startIndex==0) return;

            let url = new URL(BASE_URL);
            url.searchParams.set('q', query);
            url.searchParams.set('startIndex', startIndex+10);
            setQuery(query)

            let axiosResponse = await axios.get(url);
            const data = axiosResponse.data?.items
            console.log(data)
            setBooks(data)
        }
        getData()
    },[startIndex])
    return (
        <>
            {books.length > 0 && (

                <>
                    <Button variant="contained" onClick={(e)=>{
                        setStartIndex((curr)=>{
                            if(curr==0){
                                return  0
                            }
                            return curr-10
                        })
                        console.log(query)
                    }}>Back</Button>
                    <Button variant="contained" onClick={(e)=>{
                        setStartIndex((curr)=>{
                            return curr+10
                        })
                        console.log(query)
                    }}>Next</Button>
                </>
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
