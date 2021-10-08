import axios from 'axios'
import React, { useState, useContext, /*useEffect*/ } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'
/*
const url = ''
const tempURL = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

*/
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [isModleOpen, setIsModleOpen] = useState(false);
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy'
    })

    const fetchQuestions = async (url) => {

        setLoading(true);
        setWaiting(false);

        const response = await axios.get(url).catch((err) => console.log(err))
        

        if (response) {
            const data = response.data.results
            
            if (data.length > 0) {
                setQuestions(data);
                setWaiting(false);
                setLoading(false);
                setError(false);
            } else {
                setError(true);
                setWaiting(true);
            }
        } else {
            setWaiting(true);
         ;
        }
        
    }

    const nextQuestions = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            if (index > questions.length - 1) {
                openModle();
                return 0
            }
            else {
                return index
            }
        })
    }

    const checkAnswer = (value) => {
        if (value) {
            setCorrect((oldState) => oldState + 1);
        }
        nextQuestions()
    }

    const openModle = () => {
        setIsModleOpen(true);
    }

    const closeModle = () => {
        setWaiting(true);
        setCorrect(0);
        setIsModleOpen(false);
    }

    const handleChange = (e) => {
   
        const name = e.target.name;
        const value = e.target.value;
        setQuiz({...quiz, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const  { amount, category , difficulty } = quiz;
        const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
        fetchQuestions(url);
    }

/*
    useEffect(() => {
        fetchQuestions(`${tempURL}`);
    }, [])
*/

  return <AppContext.Provider value={{
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    isModleOpen,
    nextQuestions,
    checkAnswer,
    closeModle,
    quiz,
    handleChange,
    handleSubmit



  }}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }