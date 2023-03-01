import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {UserContext} from "./App.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import Book from "./Book.jsx";
import Nav from "./Nav"
const BookDetail = ({info}) => {
    let { id } = useParams();
    console.log(id)
    const [book, setBook] = useState({});

    useEffect(()=>{
        //https://www.googleapis.com/books/v1/volumes/
       async function getData(){
            let axiosResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = axiosResponse.data
           console.log(data)
           setBook(data)

        }
        getData()

    },[id])
    return (
     <div>
         <Nav/>
            {book && (
                <Card>


                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            title: {book?.volumeInfo?.title}
                        </Typography>
                        <Typography gutterBottom component="div">
                            publisher: {book?.volumeInfo?.publisher}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            description:
                            {book?.volumeInfo?.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            published Date:
                            {book?.volumeInfo?.publishedDate}
                        </Typography>
                    </CardContent>

                </Card>
            )}
                </div>

    )




};

export default BookDetail;
