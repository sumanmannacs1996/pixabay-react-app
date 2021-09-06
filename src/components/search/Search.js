import React,{useState,useEffect} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-result/ImageResults';

const initalAppState ={
    appUrl:'https://pixabay.com/api/',
    apiKey:'23242108-c2884e0f1de3f03e14d5d24ab',
    images:[]
}

const initalInputState={
    searchText:'',
    amount:12,
}

function Search() {
    const [inputState,setinputState] = useState(initalInputState);
    const [appState,setAppState] = useState(initalAppState);

    const inputChangeHandler =(e,index,value)=>{
        console.dir(e.target.name);
        if(e.target.name !== undefined){
            setinputState((prevState)=>{
                return {...prevState,[e.target.name]:e.target.value}
            });
        }
        else{
            setinputState({...inputState,amount:value});
        }    
    }
    const {searchText,amount} = inputState;

    useEffect(()=>{
        if(inputState.searchText === ''){
            setAppState({...appState,images:[]});
            return;
        }
        let timer;
        timer = setTimeout(async()=>{
            axios.get(`${appState.appUrl}/?key=${appState.apiKey}&q=${inputState.searchText}&image_type=photo&per_page=${inputState.amount}`)
            .then(res=>{
            console.log(res.data.hits);
            setAppState({...appState,images:[...res.data.hits]});
            })
        },400)
        // clean up code
        return ()=>{
            clearTimeout(timer);
        }    
    },[searchText,amount]);


    return (
        <div>
            <TextField
            label="ML Features"
            name='searchText'
            value= {appState.searchText}
            onChange={inputChangeHandler}
            floatingLabelText ="Search for Image"
            InputLabelProps={{ shrink: true }}
            />
            <br/>
            <SelectField
                name='amount'
                floatingLabelText='Amount'
                value={inputState.amount}
                onChange={inputChangeHandler}
            >
                <MenuItem value={6} primaryText="6"/>
                <MenuItem value={12} primaryText="12"/>
                <MenuItem value={18} primaryText="18"/>
                <MenuItem value={24} primaryText="24"/>
                <MenuItem value={30} primaryText="30"/>
                <MenuItem value={36} primaryText="36"/>
            </SelectField>
            <br/>
            {
                appState.images.length > 0 ? <ImageResults images ={appState.images}/> : <h1 style={{textAlign:'center'}}>No Image Found!</h1>
            }

        </div>
    )
}

export default Search
