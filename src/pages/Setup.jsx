import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom' 

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

import '../css/setup.css'
import pic from '../assets/quiz.svg'


const _difficulties = [ 
    {difficulty:'Easy', value:'easy'},
    {difficulty:'Medium', value:'medium'},
    {difficulty:'Hard', value:'hard'}
]

const _categories = [
    {category: "General Knowledge",value: 9,},
    { category: "Books", value: 10 },
    { category: "Films", value: 11 },
    { category: "Music", value: 12 },
    { category: "Musicals and Theaters", value: 13 },
    { category: "Television", value: 14 },
    { category: "Video Games", value: 15 },
    { category: "Board Games", value: 16 },
    { category: "Science and Nature", value: 17 },
    { category: "Computer", value: 18 },
    // { category: "Mathematics", value: 19 },
    { category: "Mythology", value: 20 },
    { category: "Sports", value: 21 },
    { category: "Geography", value: 22 },
    { category: "History", value: 23 },
    { category: "Politics", value: 24 },
    // { category: "Art", value: 25 },
    { category: "Celebrities", value: 26 },
    { category: "Animals", value: 27 },
    { category: "Vehicles", value: 28 },
    { category: "Comics", value: 29 },
    { category: "Gadgets", value: 30 },
    { category: "Japanese Anime", value: 31 },
    { category: "Cartoon and Animations", value: 32 },
];

export default function Setup({userInfo, setUserInfo}){
    const [btnDisable, setBtnDisable] = useState(true)
    const navigate = useNavigate()


    const handleSubmit = (e)=>{
        e.preventDefault()

        // get the gategory text
        let categoryText = _categories.find(e => e.value === userInfo.category).category
        setUserInfo({...userInfo, categoryText:categoryText})
        
        if(btnDisable) return null
        navigate('/quiz')
    }

    useEffect(()=>{
        if(userInfo.name && userInfo.difficulty && userInfo.category) return setBtnDisable(false)
        setBtnDisable(true)
    },[userInfo])

    return <div className="setup">
        <div className='setup-wrapper'>
            <Typography variant='h3'>Quick setup</Typography>

            <form className="setup-form" onSubmit={handleSubmit}>
                <TextField
                    className="form-input"
                    id="outlined-password-input"
                    label="Username"
                    type="text"
                    value={userInfo.name}
                    onChange={(e)=> setUserInfo({...userInfo, name:e.target.value})}
                />

                <FormControl className="form-input">
                    <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
                    <Select
                        className="form-input"
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={userInfo.difficulty}
                        label="Category"
                        onChange={(e)=> setUserInfo({...userInfo, difficulty:e.target.value})}
                    >
                        {_difficulties.map((dif, index) => <MenuItem value={dif.value} key={index}>{dif.difficulty}</MenuItem>)}

                    </Select>
                    <FormHelperText>Select your preferred defficulty level</FormHelperText>
                </FormControl>

                <FormControl className="form-input">
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                        className="form-input"
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={userInfo.category}
                        label="Category"
                        onChange={(e)=> setUserInfo({...userInfo, category:e.target.value})}
                    >
                        {_categories.map((e, index) => <MenuItem value={e.value} key={index}>{e.category}</MenuItem>)}
                    </Select>
                    <FormHelperText>Select your preffered category</FormHelperText>
                </FormControl>

                <Button disabled={btnDisable} variant="contained" type="submit">Submit</Button>
            </form>
               
        </div>
        <img src={pic} className="setup-logo" alt="quiz" />
    </div>
}