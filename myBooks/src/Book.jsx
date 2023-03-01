import React, {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";
import {UserContext} from "./App.jsx";

const Book = ({id,info}) => {
    const {setFavourites,favourites} = useContext(UserContext);
    const [isFave, setIsFave] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        let exists = favourites?.includes(id);
        setIsFave(exists)
    },[favourites])
    return (
        <Card>

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                   title: {info.title}
                </Typography>
                <Typography gutterBottom  component="div">
                  publisher: {info?.publisher}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    description:
                    {info.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">

                        published Date:

                    {info.publishedDate}
                </Typography>
            </CardContent>
            <CardActions>

                <Button size="small" onClick={()=>{
                    navigate(`/book/${id}`);
                }
                }>

                    Show More</Button>
                <IconButton onClick={()=>{
                    console.log({id})
                    let exists = favourites?.includes(id);




                    if(!exists){

                        setFavourites(()=>{

                            return [...new Set([...favourites,id])]
                        })
                    }else {

                        const set = new Set(favourites);
                        set.delete(id)

                     //   console.log({filter1})
                        setFavourites(()=>{
                           return [...set]
                        })
                    }

                }
                }>
                    <FavoriteIcon  style={{ color:  isFave ? "red" : "gray" }}></FavoriteIcon>
                </IconButton>

            </CardActions>
        </Card>
    );
};

export default Book;
