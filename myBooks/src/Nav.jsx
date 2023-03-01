import * as React from 'react';
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';


import MoreIcon from '@mui/icons-material/MoreVert';
import {Button, Link, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { UserContext} from "./App.jsx";
import {BASE_URL} from "./App.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite.js";
import {useNavigate} from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));





export default function Nav({isFave}) {
    const {setBooks,startIndex,setQuery,favourites,query} = useContext(UserContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =    useState(null);
    const [search,setSearch] = useState("")
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(()=>{
        console.log({isFave})
    },[isFave])


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleSearch = (e) =>{
        setSearch(e.target.value)
        setQuery(e.target.value)
    }
    const searchBooks = (e) => {

        e.preventDefault()

        async function getData(){
            let url = new URL(BASE_URL);
            url.searchParams.set('q', search||query);
            url.searchParams.set('startIndex', startIndex);
            setQuery(search)
            try {
                let axiosResponse = await axios.get(url);
                const data = axiosResponse.data?.items
                console.log(data)
                setBooks(data)
            }catch (e){

            }

        }

        getData()
    }
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >



        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/Home" color="inherit">
                        My Books
                    </Link>


                    {isFave &&  "sfsf"}

                    <Search>
                      {/*  <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>*/}
                        <TextField
                            value={search}
                            onChange={handleSearch}
                            hiddenLabel
                            placeholder="Search"
                            id="filled-hidden-label-small"

                            variant="filled"
                            size="small"
                        />

                    </Search>
                    <Button variant="contained" onClick={searchBooks} >Search</Button>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>


                        <IconButton size="large" onClick={()=>{
                            navigate("/favourites")
                        }
                        } aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={favourites?.length} color="error">
                                <FavoriteIcon></FavoriteIcon>
                            </Badge>
                        </IconButton>


                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
