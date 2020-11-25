import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import AddLinkDialog from 'components/AddLinkDialog';

const AddLink = () => {
    const [open, setOpen] = useState(false);
    const handleDialogClose = () => {
        setOpen(false);
    };

    const addIconClickHandler = () => {
        setOpen(true);
    };

    return (
        <>
            <IconButton color="inherit">
                <AddIcon onClick={()=> {addIconClickHandler()}} />
                <div style={{display: 'inline-block'}}>
                    {open && <AddLinkDialog openStatus={open} setOpenStatus={handleDialogClose} />}
                </div>
            </IconButton>
        </>
    )
}

export default AddLink;