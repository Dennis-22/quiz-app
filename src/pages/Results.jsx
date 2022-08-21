import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../css/results.css'
import pic from '../assets/quiz.svg'

export default function Results({score, userInfo}){
    const navigate = useNavigate()

    // dis play a text base on the user's performance
    const text = score > 7 ? "Impressive Performance" : 
    score >= 5 && score <= 7 ? "Well Done" : "Poor Performance"

    useEffect(()=>{
        //prevents user from reaching this page if he has not filled the form
        if(userInfo.name === '' || userInfo.category===undefined || userInfo.difficulty === '') return navigate('/')
    },[])

    return <div className="results">
        <img src={pic} className="results-img"/>

        <Typography variant="h4">{text} {userInfo.name}</Typography>

        <Typography>You scored {score}</Typography>
    
        <Button onClick={()=>navigate('/')}>Play again</Button>
    </div>
}