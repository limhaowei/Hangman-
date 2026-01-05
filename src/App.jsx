import { useState } from 'react'
import { languages } from './languages'
import { clsx }from 'clsx'


export default function App() {

  const [ guessedLetters, setGuessedLetters ] = useState([])
  const [ currentWord, setCurrentWord ] = useState("react")

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  ''

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

      <section className='game-status'>
        <h2>You Win!</h2>
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

      <button className='new-game'>New Game</button>
    </main>
  )
}

