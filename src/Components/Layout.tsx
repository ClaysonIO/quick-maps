import {Outlet, useParams} from "react-router";
import {NavLink} from "react-router-dom";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    MenuItem,
    Menu,
    Checkbox,
    FormControlLabel,
    Avatar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import {useUsers} from "../Hooks/useUsers.ts";
import {ErrorBar} from "./ErrorBar.tsx";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useUser} from "../Hooks/useUser.ts";
import {useErrors} from "../Hooks/useErrors.ts";
import {useResolutionTypes} from "../Hooks/useResolutionTypes.ts";

export function Layout() {
    const {projectId} = useParams<{projectId: string}>()
    const {errors} = useErrors()
    const {user, logout} = useUser();
    const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);

    //@ts-expect-error //TODO: Move this into a component that only renders if projectId is set
    const {data: resolutionTypes} = useResolutionTypes({projectId});

    const {filterCount, toggleFilter, filterStatus} = useResolutionFilters();
    const {isAdmin} = useUsers()

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setUserAnchorEl(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    return <div style={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
        <Box>
            <AppBar position="static" sx={{backgroundColor: 'rgb(21, 116, 147)'}}>
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
                    <img alt={'Logo'} src={'/logo-white.svg'} style={{marginRight: '1em', height: '30px', width: '30px', color: 'white', fill: 'white'}}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Visit Tracker
                    </Typography>
                    <div style={{flexGrow: 1}}/>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={handleFilterMenu}
                    >
                        <FilterAltIcon/>
                    </IconButton>
                    <IconButton
                        component={NavLink}
                        to={'https://github.com/ClaysonIO/quick-maps'}
                        target={'_blank'}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <GitHubIcon/>
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={handleUserMenu}
                    >
                    <Avatar alt={user?.name} src={user?.picture} />
                    </IconButton>
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
                    <MenuItem component={NavLink} to={'/projects'} onClick={handleClose}>Projects</MenuItem>
                    <MenuItem disabled={!projectId} component={NavLink} to={`/projects/${projectId}/map`} onClick={handleClose}>Map</MenuItem>
                    <MenuItem disabled={!projectId} component={NavLink} to={`/projects/${projectId}/addresses`} onClick={handleClose}>Address Table</MenuItem>
                    {isAdmin &&
                        <MenuItem component={NavLink} to={'/settings'} onClick={handleClose}>Settings</MenuItem>}
                    {isAdmin && <MenuItem component={NavLink} to={'/users'} onClick={handleClose}>Users</MenuItem>}
                </Menu>
                <Menu
                    id="menu-appbar"
                    anchorEl={userAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={Boolean(userAnchorEl)}
                    onClose={handleUserClose}
                >
                    <MenuItem onClick={() => {logout(); window.location.reload()}}>Log Out</MenuItem>
                </Menu>

                <Menu
                    id="menu-appbar"
                    anchorEl={filterAnchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                >
                    {resolutionTypes.map((resolution) => (
                        <MenuItem key={resolution.id} sx={{gap: '0.5em'}}>
                            <FormControlLabel
                                control={<Checkbox/>}
                                checked={filterStatus(resolution.id)}
                                onChange={() => toggleFilter(resolution.id)}
                                label={resolution.name}
                            />
                            <div style={{flexGrow: 1}}/>
                            <div>({filterCount(resolution.id)})</div>
                            <div className={`my-div-icon ${resolution.id}`}/>
                        </MenuItem>))}
                </Menu>
            </AppBar>
        </Box>
        <div style={{flex: 1}}>
            <Outlet/>
        </div>
        {errors.map((error, index)=>(<ErrorBar key={index} error={error}/>))}
    </div>
}