import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { deleteUserImageById } from "store/images.slice";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteImageDialog = ({openStatus, setOpenStatus, user, image}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        setOpen(openStatus);
    }, []);
    
    const handleClose = () => {
        setOpen(false);
        setOpenStatus();
    };
    
    const handleDelete = () => {
        dispatch(deleteUserImageById(user.userId, image._id));
        handleClose();
    }
    return (
        <>
            <div>
                <Dialog maxWidth={100} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" >Delete Image Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText  style={{color: 'red'}}>
                            <h2>Are you sure you want to delete permanently this image?</h2>
                        </DialogContentText>
                        <DialogActions style={{fontSize:'50px'}}>
                            <Button onClick={handleClose} variant="outlined" size="large" color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} variant="outlined" size="large" color="primary" autoFocus>
                                Delete
                            </Button>
                            </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        </>
      );
}

export default DeleteImageDialog;