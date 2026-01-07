import { useState } from 'react'
import { languages } from './languages'
import { clsx }from 'clsx'
import { getFarewellText } from './utils'


export default function App() {

  const [ guessedLetters, setGuessedLetters ] = useState([])
  const [ currentWord, setCurrentWord ] = useState("react")

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
      <span key={index}>{isGuessed ? char.toUpperCase() : ""}</span>
    )
  })

  
  function userGuess(char) {
    setGuessedLetters(prev => prev.includes(char) ? prev : [...prev, char])
  }
//   setGuessedLetters(prevLetters => {
//     const lettersSet = new Set(prevLetters)
//     lettersSet.add(letter)
//     return Array.from(lettersSet)
// })
 
  
  return(
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
      </header>

      <section className={clsx("game-status", {
        "game-won": isGameWon,
        "game-lost": isGameLost
      })}>
        {isGameWon ? (
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
        )}
      </section>

      <section className='languages'>
        {languageElements}
      </section>

      <section className='word'>
        {charElements}
      </section>

      <section className='keyboard'>
        {alphabetElements}
      </section>

      {isGameOver && <button className='new-game'>New Game</button>}
    </main>
  )
}

