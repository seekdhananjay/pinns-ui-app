import React, {useState, useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImageLinkingForm from 'components/ImageLinkingForm';

const AddLinkDialog = ({openStatus, setOpenStatus}) => {
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        setOpen(openStatus);
    }, []);
    
    const handleClose = () => {
        setOpen(false);
        setOpenStatus();
    };
    
    return (
        <>
            <div>
                <Dialog maxWidth={100} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Image Link Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Link an image with Name and Description and It'll show up in your dashboard.
                        </DialogContentText>
                        <ImageLinkingForm handleDialogClose={handleClose} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
      );
}

export default AddLinkDialog;