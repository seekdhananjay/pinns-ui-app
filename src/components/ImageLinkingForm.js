import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveImage } from "store/image.slice";
const ImageLinkingForm = ({handleDialogClose}) => {
    
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        handleDialogClose();
        dispatch(saveImage(data))
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="imageName"  style={{width: '82.8%'}} ref={register({ required: true })} placeholder="Image name" />
                <br />
                {errors.imageName && <span>This field is required.</span>}
                <br />
                <input name="imageURL" type="url" style={{width: '82.8%'}}
                    ref={register({
                        required: true,
                        pattern: {
                            value: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i,
                            message: "invalid image url"
                        }
                    })}
                    placeholder="Image URL"
                    
                />
                <br />
                {errors.imageURL && <span>This field is required & must be image url.</span>}
                <br />
                <textarea name="imageDescription" ref={register} rows="6" cols="56" placeholder="Image Description">
                </textarea>
                <br />
                <input type="submit" value="Create a Pin"/>
            </form>
        </>
    );
}

export default ImageLinkingForm;