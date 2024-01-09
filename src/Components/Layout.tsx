import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {AppBar, Box, IconButton, Toolbar, Typography, MenuItem, Menu} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import netlifyIdentity from 'netlify-identity-widget'
import {useUsers} from "../Hooks/useUsers.ts";


export function Layout() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {isAdmin} = useUsers()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div style={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={handleMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Quick Maps
                    </Typography>
                </Toolbar>


                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={NavLink} to={'/map'} onClick={handleClose}>All Addresses</MenuItem>
                    <MenuItem component={NavLink} to={'/groups'} onClick={handleClose}>Groups</MenuItem>
                    <MenuItem component={NavLink} to={'/groups/edit'} onClick={handleClose}>Edit Groups</MenuItem>
                    <MenuItem component={NavLink} to={'/addresses'} onClick={handleClose}>Address Table</MenuItem>
                    {isAdmin && <MenuItem component={NavLink} to={'/settings'} onClick={handleClose}>Settings</MenuItem>}
                    {isAdmin && <MenuItem component={NavLink} to={'/users'} onClick={handleClose}>Users</MenuItem>}
                    <MenuItem onClick={()=>netlifyIdentity.logout()}>Log Out</MenuItem>
                </Menu>
            </AppBar>
        </Box>
        <div style={{flex: 1}}>
            <Outlet/>
        </div>
    </div>
}