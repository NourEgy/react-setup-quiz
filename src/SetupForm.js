import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz, handleChange, handleSubmit , error} = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2> setup Quiz </h2>
          <div className="form-control">
            <label htmlFor="amount">Number Of Questions</label>
            <input type="number" name="amount" id="amount"
            value={ quiz.amount }
            onChange={handleChange}
            className="form-input" min={1} max={50} />
          </div>


          <div className="form-control">
            <label htmlFor="category">Select category</label>
            <select type="number" name="category" id="category"
            value={ quiz.category }
            onChange={handleChange}
            className="form-input">
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="poitics">poitics</option>
            </select>
          </div>
      

          
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select type="number" name="difficulty" id="difficulty"
            value={ quiz.difficulty }
            onChange={handleChange}
            className="form-input">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (<p className="error"> cant fenerate questions , please try different option </p>)}




          <button type="submit" className="submit-btn" onClick={handleSubmit} >Start</button>
         </form>
      </section>
    </main>
    )
}

export default SetupForm