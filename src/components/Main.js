import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Die from './Die'


export default function Main() {
    
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)


    useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld === true)
        const firstValue = dice[0].value
        const sameValues = dice.every(die => die.value === firstValue)
        if(allHeld && sameValues)
            setTenzies(true)
        
        if(tenzies)
            console.log("You won!")
    },[dice,tenzies])

    function allNewDice() {

        const newDice = []

        for(let i=0; i<10; ++i){
            newDice.push({
                value: Math.ceil(Math.random()*6),
                isHeld : false,
                id: nanoid()
            })
        }
        return newDice
    }
    // console.log(dice[0].id)

    function holdDie(id) {
        console.log(id)
        setDice( oldDice => oldDice.map(die =>
            {return (die.id === id ? {...die, isHeld : !die.isHeld}: die)}
        ))
    }

    function rollDice() {
        console.log("rolled") 
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                {
                    ...die,
                    value: Math.ceil(Math.random()*6)
                }
            }))
        }
        else{
            setDice(allNewDice)
            setTenzies(false)
        }
    }

    const diceElement = dice.map(die => (
        <Die 
            key= {die.id} 
            value= {die.value} 
            isHeld= {die.isHeld}
            holdDice={() => holdDie(die.id)}
        />) )
   
    return (
        <div>
            {tenzies && <Confetti/>}
            <div className="main">
                <h1 className="title">Tenzies</h1>
                <h4 className='desc'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
                <div className='dice-container'>
                    {diceElement}
                </div>
                <button className="roll-button" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
                
            </div>
        </div>
    )
}