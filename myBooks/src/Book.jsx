import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";
import {UserContext} from "./App.jsx";

const Book = ({id,info}) => {
    const {books,startIndex,setStartIndex,query,setQuery,setBooks,setFavourites,favourites} = React.useContext(UserContext);
    const [isFave, setIsFave] = useState(false);

    const navigate = useNavigate();

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
                    <Typography>
                        published Date:
                    </Typography>
                    {info.publishedDate}
                </Typography>
            </CardContent>
            <CardActions>

                <Button size="small" onClick={()=>{
                    navigate(`/book/${id}`);
                }
                }>

                    Learn More</Button>
                <IconButton onClick={()=>{
                    console.log({id})
                    let exists = favourites?.includes(id);

                    console.log({exists})
                    setIsFave((curr)=>{
                        return !curr
                    })
                    if(!exists){

                        setFavourites((curr)=>{

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
