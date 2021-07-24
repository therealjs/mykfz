import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import DistrictService from '../services/DistrictService';
import UserService from '../services/UserService';
import VehiclesTable from './VehiclesTable';
import Copyright from './Copyright';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    }
}));

function DistrictDashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState({});
    const [district, setDistrict] = useState({});
    const [vehicles, setVehicles] = useState([]);

    const logout = () => {
        console.log('logging out user');
        UserService.logout();
        if (props.location.pathname != '/') {
            props.history.push('/');
        } else {
            window.location.reload();
        }
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    useEffect(() => {
        const fetchData = async () => {
            let userResult = await UserService.getUserDetails();
            const districtUsername = userResult.username;
            let districtResult = await DistrictService.getDistrictByUser(
                districtUsername
            );
            let vehiclesResult = await DistrictService.getVehicles(
                districtResult._id
            );
            setUser(userResult);
            setDistrict(districtResult);
            setVehicles(vehiclesResult);
        };

        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="secondary"
                position="absolute"
                className={clsx(classes.appBar)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        MyKfz District Dashboard for {district.name} (
                        {district._id})
                    </Typography>
                    <IconButton color="inherit">
                        <ExitToAppIcon color="inherit" onClick={logout} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <VehiclesTable vehicles={vehicles} />
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default withRouter(DistrictDashboard);
