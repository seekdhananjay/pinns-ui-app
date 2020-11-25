
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const UnGuardedLinks = ({login}) => {
    const classes = useStyles();

    return (
        <>
            <div>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<GitHubIcon />}
                    onClick={()=> {login();}}
                >
                    Login with Github
                </Button>
            </div>
        </>
    )
}

export default UnGuardedLinks;