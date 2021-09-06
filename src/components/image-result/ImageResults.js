import React,{useState} from 'react'
import PropTypes from 'prop-types';
import {GridList,GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const modelInitialState ={
    open:false,
    currentImage:''
}

function ImageResults({images}) {
    const [modelState,setModelState] = useState(modelInitialState);

    const handleOpen =(currentImage)=>{
        setModelState({...modelState,open:true,currentImage})
    }
    const handleClose =()=>{
        setModelState({...modelState,open:false,currentImage:''});
    }

    const actions =[
        <FlatButton
        label="Close"
        primary={true}
        onClick={handleClose}
        />
    ]
    return (
        <div>
            <GridList cols={3}>
                {
                    images.map(img=>(
                        <GridTile
                        title={img.tags}
                        id={img.id}
                        subtitle={
                            <span>
                                by <strong>{img.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={()=>handleOpen(img.largeImageURL)}>
                                <ZoomIn color='white'/>
                            </IconButton>
                        }
                        >
                            <img src={img.largeImageURL}/>
                        </GridTile>
                    ))
                }
            </GridList>
            <Dialog
            actions={actions}
            modal={false}
            open={modelState.open}
            onRequestClose={handleClose}
            >
                <img src={modelState.currentImage} style={{width:'100%'}}/>
            </Dialog>
        </div>
    )
}

ImageResults.propTypes ={
    images:PropTypes.array.isRequired,
}
export default ImageResults
