import { useState } from 'react'
import { languages } from './languages'
import { clsx }from 'clsx'
import { getFarewellText, generateRandomWord } from './utils'
import Confetti from "react-confetti"


export default function App() {

  const [ guessedLetters, setGuessedLetters ] = useState([])
  const [ currentWord, setCurrentWord ] = useState(generateRandomWord())

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)



  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map((lang, index) => {
    const styles = {
        backgroundColor: lang.backgroundColor,
        color: lang.color
    }
    const isLost = index < wrongGuessCount 
    return (
        <span 
          key={lang.name} 
          className= {clsx("chip", isLost && "lost")}
          // className={`chip ${isLost ? "lost" : ""}`}
          style={styles}
        >
          {lang.name}
        </span>
    )
})


  const alphabetElements = alphabet.split('').map((char) => {
    const isGuessed = guessedLetters.includes(char)
    const isCorrect = currentWord.includes(char)
    const isWrong = isGuessed && !isCorrect
    return (
      <button 
        onClick={() => userGuess(char)} 
        key={char}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(char)}
        aria-label={`Letter ${char}`}
        className={clsx({
          'correct': isGuessed && isCorrect,
          'wrong': isWrong,
        })}
      >{char.toUpperCase()}</button>
    )
  })


  const charElements = currentWord.split('').map((char, index) => {
    const isGuessed = guessedLetters.includes(char)
    return (
      <span key={index}>{isGuessed || isGameLost ? char.toUpperCase() : ""}</span>
    )
  })

  
  function userGuess(char) {
    if (isGameOver) return
    setGuessedLetters(prev => prev.includes(char) ? prev : [...prev, char])
  }
//   setGuessedLetters(prevLetters => {
//     const lettersSet = new Set(prevLetters)
//     lettersSet.add(letter)
//     return Array.from(lettersSet)
// })

  function renderGameStatus(){
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
        </>
      )
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose!</p>
        </>
      )
    }

    if (isLastGuessIncorrect && wrongGuessCount > 0) {
      const justLostLanguage = languages[wrongGuessCount - 1]
      if (justLostLanguage) {
        const farewellMessage = getFarewellText(justLostLanguage.name)
        return (
          <>
            <h2>{farewellMessage}</h2>
            <p>You have {languages.length - wrongGuessCount - 1} attempts left.</p>
          </>
        )
      }
    }

    return (
      <>
        <h2>Keep guessing...</h2>
        <p>You have {languages.length - wrongGuessCount - 1} attempts left.</p>
      </>
    )
  }

  function newGame(){
    setCurrentWord(generateRandomWord())
    setGuessedLetters([])
  }
 
  
  return(
    <main>
      {isGameWon && <Confetti />  }
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
      </header>

      <section aria-live="polite" role="status" className={clsx("game-status", {
        "game-won": isGameWon,
        "game-lost": isGameLost
      })}>
        {/* {isGameWon ? (
          <>
            <h2>You win!</h2>
          </>
        ) : isGameLost ? (
          <>
            <h2>Game over!</h2>
            <p>You lose!</p>
          </>
        ) : (
          <>
            <h2>Keep guessing...</h2>
            <p>You have {languages.length - wrongGuessCount - 1} attempts left.</p>
          </>
        )} */}
        {renderGameStatus()}
      </section>

      <section className='languages'>
        {languageElements}
      </section>

      <section className='word'>
        {charElements}
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ? 
            `Correct! The letter ${lastGuessedLetter} is in the word.` : 
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
            }
            You have {languages.length - 1} guesses left.
        </p>
        <p>Current word: {currentWord.split("").map(char => 
        guessedLetters.includes(char) ? char + "." : "blank.")
        .join(" ")}</p>
            
      </section>

      <section className='keyboard'>
        {alphabetElements}
      </section>

      {isGameOver && <button className='new-game' onClick={newGame}>New Game</button>}
    </main>
  )
}

