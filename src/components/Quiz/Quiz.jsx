import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
const Quiz = () => {
    let [Index, setIndex] = useState(0)
    let [question, setquestion] = useState(data[Index])
    let [lock, setlock] = useState(false)
    let [score, setscore] = useState(0)
    let [result, setresult] = useState(false)

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_Array = [option1, option2, option3, option4]
    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("Correct")
                setlock(true)
                setscore(prev => prev + 1)
            } else {
                e.target.classList.add("Wrong")
                setlock(true)
                option_Array[question.ans - 1].current.classList.add("Correct")

            }
        }
    }
    const next = () => {
        if (lock === true) {
            if (Index === data.length - 1) {
                setresult(true)
                return 0
            }
            setIndex(++Index)
            setquestion(data[Index])
            setlock(false)
            option_Array.map((option) => {
                option.current.classList.remove("Wrong")
                option.current.classList.remove("Correct")
                return null

            })
        }

    }
    const reset = () => {
        setIndex(0)
        setquestion(data[0])
        setscore(0)
        setlock(false)
        setresult(false)
    }
    return (
        <div className='container'>
            <h1 className='Heading'>Quiz App</h1>
            <hr />
            {result ? <></> : <> <h2 className='question'>{Index + 1}. {question.question}</h2>
                <ul>
                    <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                </ul>
                <button className="Next" onClick={next}>Next</button>
                <div className='index'>{Index + 1} of {data.length} questions </div>
            </>}
            {result ? <><h2 className='score'>You scored {score} Out of {data.length}</h2>
                <button onClick={reset}>Reset</button></> : <></>}


        </div>
    )
}

export default Quiz