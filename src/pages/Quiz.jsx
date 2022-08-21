import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import '../css/quiz.css'
import { Button } from '@mui/material';


export default function Quiz({userInfo, score, setScore}){
    const [questions, setQuestions] = useState({loading:false, error:false, data:[]})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selected, setSelected] = useState(false) //this will make sure you cannot select question twice

    const navigate = useNavigate()

    const decodeText = (text)=>{
        let element = document.createElement('textarea')
        element.innerHTML = text
        return element.value
    }

    const handleShuffle = (data)=>{
        let sampled = data.map((ques)=>{
            let question = ques.question
            let correctAns = ques.correct_answer
            let incorrectAns = ques.incorrect_answers
            let choices = [...incorrectAns, correctAns]
            return {question, correctAns, choices: choices.sort(()=>Math.random() - 0.5)}
        })

        return sampled
    }

    const handleFetch = async()=>{
        let url = `https://opentdb.com/api.php?amount=10&category=${userInfo.category.toString()}&difficulty=${userInfo.difficulty}&type=multiple`
        setQuestions({loading:true, error:false, data:[]})
        try {
            let response = await axios.get(url)
            let results = await response.data.results
            let shuffled = await handleShuffle(results)
            setQuestions({loading:false, error:false, data:shuffled})    
        } catch (error) {
            setQuestions({loading:false, error:true, data:[]})
        }

    }

    const nextQuestion = () => {
        setTimeout(()=>{
            if ((currentQuestion + 1) === 10) return navigate('/results') // go to results page if user is done answering
            setCurrentQuestion(prev => prev + 1)
            setSelected(false)
        },2000)
    }


    const handleSelect = (ans)=>{
        if(selected)return null //this prevents the user from selecting multiple answers
        setSelected(true)
        if(questions.data[currentQuestion].correctAns === ans) setScore(prev => prev + 1)
        nextQuestion()
    }

    const getClassName = (ans)=>{ //will switch the background colors to show right or wrong when you select answer
        if(!selected) return "quiz-ans-default"
        if(questions.data[currentQuestion]?.correctAns === ans) return "quiz-ans-correct"
        else return "quiz-ans-wrong"
    }

    useEffect(()=>{
        //prevents user from reaching this page if he has not filled the form
        if(userInfo.name === '' || userInfo.category === undefined || userInfo.difficulty === '') return navigate('/')
        handleFetch()
    },[])



    return <div className="quiz">
        <section className="quiz-score">
            <Typography>{userInfo.categoryText}</Typography>
            <Typography variant="button">Score: {score}</Typography>
            <Typography variant="button">lvl: {currentQuestion + 1}/10</Typography>
        </section>

        <div className="quiz-display">
    
            {
                questions.loading ? <Loading /> :
                questions.error ? <Error handleFetch={handleFetch}/> :

                <>
                    <Typography variant="h5">{decodeText(questions?.data[currentQuestion]?.question)}</Typography>

                    <section className="quiz-answers">
                        {questions?.data[currentQuestion]?.choices.map((ans, index) => 
                            <Typography key={index} onClick={()=>handleSelect(ans)}
                                className={getClassName(ans)}
                            >
                                {decodeText(ans)}
                            </Typography>
                        )}
                    </section>
                </>
            }


        </div>
    </div>
}

function Loading(){
    return <div className="quiz-show-status">
        <CircularProgress />
    </div>
}

function Error({handleFetch}){
    return <div className="quiz-show-status">
        <Typography variant="h5">Failed to fetch questions</Typography>

        <Button onClick={handleFetch} style={{marginTop:20}}>Retry</Button>
    </div>
}