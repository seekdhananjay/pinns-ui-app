import React, {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import GuardedLinks from 'components/GuardedLinks';
import UnGuardedLinks from 'components/UnGuardedLinks';
import Dashboard from 'components/Dashboard';
import UserDashboard from 'components/UserDashboard';

import { API_URL, LOGIN_PROVIDERS } from 'config';
import { getIsLoggedIn, getLoggedInUserInfo } from 'utils';
import io from 'socket.io-client';
const socket = io(API_URL);
const provider = LOGIN_PROVIDERS[0];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const ShellPage = () => {
    const [user, setUser] = useState({});
    const [disabled, setDisabled] = useState('');
    const [authStatus, setAuthStatus] = useState(false);
    let popupReference = null;
    useEffect(()=> {
        if(getIsLoggedIn() && getLoggedInUserInfo){
            setAuthStatus(getIsLoggedIn());
            setUser(getLoggedInUserInfo());
        }
    }, []);
    const checkPopup = () => {
        const check = setInterval(() => {
        if (!popupReference || popupReference.closed || popupReference.closed === undefined) {
            clearInterval(check);
            setDisabled('');
        }
        }, 1000)
    };

    const openPopup = () => {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/${provider}?socketId=${socket.id}`

        return window.open(url, '',       
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
        )
    };

    const startAuth = () => {
        if (!disabled) {
            popupReference = openPopup();
            socket.on(provider, (user) => {
                setUser(user);
                setAuthStatus(true);
                popupReference.close();
                localStorage.setItem('user', JSON.stringify(user));
            });
            checkPopup();
            setDisabled('disabled');
        }
    };

    const doLogout = () => {
        setAuthStatus(false);
        setUser({});
        localStorage.removeItem('user');
    }
    const doLogin = () => {
        startAuth();
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Pinns
                        </Typography>
                        { authStatus ? <GuardedLinks logout={doLogout} user={user}/> : <UnGuardedLinks login={doLogin} /> }
                    </Toolbar>
                </AppBar>
            </div>
            { authStatus ? <UserDashboard user={user} /> : <Dashboard /> }
        </>
    )
}

export default ShellPage;