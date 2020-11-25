import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = ({logout}) => {

    return (
        <>
            <IconButton color="inherit">
                <ExitToAppIcon onClick={() => { logout() }}/>
            </IconButton>
        </>
    )
}

export default Logout;