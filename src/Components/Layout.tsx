import {Outlet, useParams} from "react-router";
import {NavLink, useSearchParams} from "react-router-dom";
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
    Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, {useMemo, useState} from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useUser} from "../Hooks/useUser.ts";
import {useResolutionTypes} from "../Hooks/useResolutionTypes.ts";
import {CalendarMonth} from "@mui/icons-material";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export function Layout() {
    const {projectId} = useParams<{projectId: string}>()
    const {user, logout} = useUser();
    const [dateRangeOpen, setDateRangeOpen] = useState(false);
    const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);

    //@ts-expect-error //TODO: Move this into a component that only renders if projectId is set
    const {data: resolutionTypes} = useResolutionTypes({projectId});

    const {filterCount, toggleFilter, filterStatus} = useResolutionFilters();

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
                <Toolbar >
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
                    <NavLink to={'/'} style={{display: 'flex', textDecoration: 'none', color: 'white'}}>
                    <img alt={'Logo'} src={'/logo-white.svg'} style={{marginRight: '1em', height: '30px', width: '30px', color: 'white', fill: 'white'}}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Visit Tracker
                    </Typography>
                    </NavLink>
                    <div style={{flexGrow: 1}}/>


                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2, display: {xs: 'none', sm: 'block'}}}
                        onClick={()=>setDateRangeOpen(true)}
                        disabled={!projectId}
                    >
                        <CalendarMonth/>
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2, display: {xs: 'none', sm: 'block'}}}
                        onClick={handleFilterMenu}
                        disabled={!projectId}
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
                        sx={{mr: 2, display: {xs: 'none', sm: 'block'}}}
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
                </Menu>
                <Menu
                    id="menu-appbar"
                    anchorEl={userAnchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(userAnchorEl)}
                    onClose={handleUserClose}
                >
                    <MenuItem
                        sx={{display: {xs: 'flex', sm: 'none'}}}
                        onClick={()=>setDateRangeOpen(true)}
                    >
                        Set Date Range
                    </MenuItem>
                    <MenuItem
                        sx={{display: {xs: 'flex', sm: 'none'}}}
                        onClick={(e)=>{
                            handleFilterMenu(e)
                            handleUserClose()}}
                    >
                        Filter Addresses
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                        sx={{display: {xs: 'flex', sm: 'none'}}}
                        component={NavLink}
                        to={'https://github.com/ClaysonIO/quick-maps'} target={'_blank'}
                    >
                        GitHub
                    </MenuItem>
                    <Divider/>

                    <MenuItem onClick={() => {logout(); window.location.reload()}}>Log Out</MenuItem>
                </Menu>

                <Menu
                    id="menu-appbar"
                    anchorEl={filterAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
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
        <DateRangeDialog open={dateRangeOpen} setOpen={setDateRangeOpen}/>
    </div>
}

export function useDateRange(){
    const [searchParams, setSearchParams] = useSearchParams();

    const {startDate, endDate} = useMemo(()=>{
        return {
            startDate: searchParams.get('startDate'),
            endDate: searchParams.get('endDate')
        }
    }, [searchParams])

    function setStartDate(date: Dayjs | null){
        if(date) searchParams.set('startDate', date.format('YYYY-MM-DD'))
        else searchParams.delete('startDate')
        setSearchParams(searchParams)
    }
    function setEndDate(date: Dayjs | null){
        if(date) searchParams.set('endDate', date.format('YYYY-MM-DD'))
        else searchParams.delete('endDate')
        setSearchParams(searchParams)
    }

    return {
        startDate: startDate ? dayjs(startDate, 'YYYY-MM-DD') : null,
        endDate: endDate ? dayjs(endDate, 'YYYY-MM-DD') : null,
        setStartDate,
        setEndDate
    }
}

export function DateRangeDialog({open, setOpen}: {open: boolean, setOpen: (open: boolean)=>void}){
    const {startDate, endDate, setStartDate, setEndDate} = useDateRange()

    function clearDates(){
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <>

        <Dialog fullWidth={true} open={open} onClose={()=>setOpen(false)}>
            <DialogTitle>Choose a Date Range</DialogTitle>

            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1em', paddingTop: '1em'}}>
                <div style={{height: '.25em'}}/>
                <DatePicker label="Start Date" value={startDate} onChange={(v)=>setStartDate(v)}  />
                <DatePicker label="End Date" value={endDate} onChange={(v)=>setEndDate(v)} />
            </DialogContent>

            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button color={'error'} variant={'outlined'} onClick={()=>clearDates()}>Clear Dates</Button>
                <Button onClick={()=>setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>

            </>
    )
}