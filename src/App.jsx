import { useState } from 'react'
import { languages } from './languages'


export default function App() {

  const languageElements = languages.map(lang => {
    const styles = {
        backgroundColor: lang.backgroundColor,
        color: lang.color
    }
    return (
        <span key={lang.name} className='chip' style={styles}>{lang.name}</span>
    )
})

  const [ currentWord, setCurrentWord ] = useState("react")

  const charElements = currentWord.split('').map((char, index) => {
    return (
      <span key={index}>{char.toUpperCase()}</span>
    )
  })
 
  
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
    </main>
  )
}

