import {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import Setup from './pages/Setup'
import Quiz from './pages/Quiz';
import Results from './pages/Results'

export default function App() {

  const [userInfo, setUserInfo] = useState({
    name:'', difficulty:'', category:undefined, categoryText:''
  })

  const [score, setScore] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Setup userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      <Route path="/quiz" element={<Quiz score={score} setScore={setScore} userInfo={userInfo}/>}/>
      <Route path="/results" element={<Results score={score} userInfo={userInfo}/>}/>
    </Routes>
  )
}
