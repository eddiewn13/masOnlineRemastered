import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import DeckClass from "../utilities/DeckClass"
import { Link, useResolvedPath } from 'react-router-dom'




let socket


const Game = () => {
      var code = window.location.href;


// Player / Room State

const[room, setRoom] = useState(code);
const[roomFull, setRoomFull] = useState(false);
const[users,setUsers] = useState([]);
const[currentUser, setCurrentUser] = useState('');
const[count, setCount] = useState(1);

// Game State (Phase One)
const [gameOver, setGameOver] = useState();
const [winner, setWinner] = useState();

const [player1Deck, setPlayer1Deck] = useState([]);
const [player1FlippedCards, setPlayer1FlippedCards ] = useState([]);

const [player2Deck, setPlayer2Deck] = useState([]);
const [player2FlippedCards, setPlayer2FlippedCards ] = useState([]);

const [player3Deck, setPlayer3Deck] = useState([]);
const [player3FlippedCards, setPlayer3FlippedCards ] = useState([]);

const [player4Deck, setPlayer4Deck] = useState([]);
const [player4FlippedCards, setPlayer4FlippedCards ] = useState([]);

const [playedCardsPile, setPlayedCardsPile] = useState([])

const [highestStuns, setHighestStuns] = useState([])

const [stunsPlayers, setStunsPlayers] = useState([])

const[history, setHistory] = useState([])

const [drawCardsPile, setDrawCardsPile] = useState([])
const[turn, setTurn] = useState('')
const [currentValue, setCurrentValue] = useState('')




// Delar ut alla kort och skapar connection till rummet.
      useEffect(() => {
            const shuffledCards = new DeckClass();

            const drawCardsPile = shuffledCards.deck;

            const player1Deck = shuffledCards.deck.splice(0, 3);
            const player2Deck = shuffledCards.deck.splice(0, 3);
            const player3Deck = shuffledCards.deck.splice(0, 3);
            const player4Deck = shuffledCards.deck.splice(0, 3);


            const connectionOptions =  {
                "forceNew" : false,
                "reconnectionAttempts": "Infinity",
                "timeout" : 10000,
                "transports" : ["websocket"]
            }

            socket = io.connect("http://127.0.0.1:3001", connectionOptions)

            socket.emit('join_room', room, (error) => {
                  if(error)
                  setRoomFull(true);
            })


            // Skickar gamets start till servern.
            socket.emit('initGameState', {
                    gameOver: false,
                    turn: 'Player 1',
                    count: count,
                    player1Deck: [...player1Deck],
                    player1FlippedCards: [],
                    player2Deck: [...player2Deck],
                    player2FlippedCards: [],
                    player3Deck: [...player3Deck],
                    player3FlippedCards: [],
                    player4Deck: [...player4Deck],
                    player4FlippedCards: [],
                    history: [],
                    highestStuns: highestStuns,
                    stunsPlayers: [],
                    playedCardsPile: [],
                    drawCardsPile: [...drawCardsPile],
                    currentValue: 0,

            })
        }, [])

        useEffect(() => {
            socket.on('initGameState', ({ gameOver, turn, count, history, player1Deck, player2Deck, player3Deck, player4Deck, drawCardsPile }) => {
                setGameOver(gameOver)
                setTurn(turn)
                setCount(count)
                setHistory(history)
                setPlayer1Deck(player1Deck)
                setPlayer2Deck(player2Deck)
                setPlayer3Deck(player3Deck)
                setPlayer4Deck(player4Deck)
                setDrawCardsPile(drawCardsPile)
            })

            socket.on('updateGameState', ({gameOver, winner, turn, count, player1Deck, player1FlippedCards, player2Deck, player2FlippedCards, player3Deck, player3FlippedCards, player4Deck, player4FlippedCards, history, playedCardsPile, highestStuns, stunsPlayers, drawCardsPile, currentValue }) => {
                gameOver && setGameOver(gameOver)
                gameOver === true && null
                winner && setWinner(winner)
                turn && setTurn(turn)
                count && setCount(count)
                player1Deck && setPlayer1Deck(player1Deck)
                player1FlippedCards && setPlayer1FlippedCards(player1FlippedCards)
                player2Deck && setPlayer2Deck(player2Deck)
                player2FlippedCards && setPlayer2FlippedCards(player2FlippedCards)
                player3Deck && setPlayer3Deck(player3Deck)
                player3FlippedCards && setPlayer3FlippedCards(player3FlippedCards)
                player4Deck && setPlayer4Deck(player4Deck)
                player4FlippedCards && setPlayer4FlippedCards(player4FlippedCards)
                history && setHistory(history)
                playedCardsPile && setPlayedCardsPile(playedCardsPile)
                highestStuns && setHighestStuns(highestStuns)
                stunsPlayers && setStunsPlayers(stunsPlayers)
                drawCardsPile && setDrawCardsPile(drawCardsPile)
                currentValue && setCurrentValue(currentValue)
            })

            socket.on("roomData", ({ users }) => {
                setUsers(users)

            })


            socket.on('currentUserData', ({ name }) => {
                setCurrentUser(name)

            })


        },[])

        // Funktion för att kolla vilka spelare som ska spela i stuns (Funkar ej än)
        const calculateStunsPlayers = (newHistory) => {
            let bigVal = 0;


            // Calculates highest card in pile
            for (let i = 0; i < newHistory.length; i++) {
                if(newHistory[i].card.value == bigVal){
                    bigVal = newHistory[i].card.value
                }
            }

            // Calculates if there is a stuns
            let stunsPeople = [];


            console.log(newHistory)


            // Trying to calculate all players with the same cards


                for (let i = 0; i < newHistory.length; i++) {
                    if(bigVal == newHistory[i].card.value){

                        let newStunsPlayers = [...stunsPlayers, newHistory[i].player]

                        socket.emit('updateGameState', {
                            stunsPlayers: [...newStunsPlayers]
                        })
                        console.log(newHistory[i].player)
                        console.log(newStunsPlayers);
                    }

        }

    }

    function getHighestCard(){
        for (let i = 0; i < newHistory.length; i++) {
            if(newHistory[i].card.value == bigVal){
                bigVal = newHistory[i].card.value
            }
        }

        return bigVal;
    }

    // Kollar igenom spelarens hand och kollar om det går att stunsa.
        const checkIfStunsAvailable = (player, playedCard) => {
            if(player == 'Player 1'){
                for (let i = 0; i < player1Deck.length; i++) {
                    for (let j = 0; j < playedCardsPile.length; j++) {

                        if(player1Deck[i].value === playedCardsPile[j].value){
                            return {
                                stuns: true,
                                card: player1Deck[i],
                            }
                        }

                    }
                }
                return false
            }

            if(player == 'Player 2'){
                for (let i = 0; i < player2Deck.length; i++) {
                    for (let j = 0; j < playedCardsPile.length; j++) {

                        if(player2Deck[i].value === playedCardsPile[j].value){
                            return {
                                stuns: true,
                                card: player2Deck[i],

                            }
                        }

                    }
                }
                return false

            }

            if(player == 'Player 3'){
                for (let i = 0; i < player3Deck.length; i++) {
                    for (let j = 0; j < playedCardsPile.length; j++) {

                        if(player3Deck[i].value === playedCardsPile[j].value){
                            return {
                                stuns: true,
                                card: player3Deck[i],
                            }
                        }

                    }
                }
                return false

            }

            if(player == 'Player 4'){
                for (let i = 0; i < player4Deck.length; i++) {
                    for (let j = 0; j < playedCardsPile.length; j++) {

                        if(player4Deck[i].value === playedCardsPile[j].value){
                            return {
                                stuns: true,
                                card: player4Deck[i],
                            }
                        }

                    }
                }
            }
            return false

        }

        //Simpel funktion för att få ett kort
        const drawCard = () => {
            return drawCardsPile.pop();
        }


        //Hanterar kortet som "vill" läggas ut (aka kolla om det får läggas och vad som händer efter beroende på vilket kort och vem)
        const cardPlayedHandler = (playedCard) => {
            let newStunsPlayers = [];
            let newCount;
            let newHistory;
            switch(turn) {

                case 'Player 1' :


                    if(checkIfStunsAvailable(turn, playedCard).stuns){

                        if(playedCard === checkIfStunsAvailable(turn,playedCard).card){

                        }
                        else{
                            alert("You must stuns")
                            break;
                        }
                    }


                       const removeCard = player1Deck.indexOf(playedCard)


                        let newPlayer1Deck = [...player1Deck.slice(0, removeCard), ...player1Deck.slice(removeCard + 1)]
                        newPlayer1Deck.push(drawCard())
                        newCount = count+1
                        newHistory = [...history, {player: 'Player 1', card: playedCard}]

                        socket.emit('updateGameState', {
                            drawCardsPile: [...drawCardsPile],
                            playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), playedCard, ...playedCardsPile.slice(playedCardsPile.length)],
                            player1Deck: [...newPlayer1Deck],
                            history: [...newHistory],
                            turn: 'Player 2',
                            count: newCount,
                        })




                        console.log(newHistory)

                        if(count === 4){
                            calculateStunsPlayers(newHistory)
                        }

                    break;

                case 'Player 2' :
                    const removeCard2 = player2Deck.indexOf(playedCard)




                    if(checkIfStunsAvailable(turn, playedCard).stuns){
                        if(playedCard === checkIfStunsAvailable(turn,playedCard).card){


                        }
                        else{
                            alert("You must stuns")
                            break;
                        }
                    }


                    let newPlayer2Deck = [...player2Deck.slice(0, removeCard2), ...player2Deck.slice(removeCard2 + 1)]
                    newPlayer2Deck.push(drawCard());
                    newHistory = [...history, {player: 'Player 2', card: playedCard}]
                    newCount = count+1;
                    socket.emit('updateGameState', {
                        drawCardsPile: [...drawCardsPile],
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), playedCard, ...playedCardsPile.slice(playedCardsPile.length)],
                        player2Deck: [...newPlayer2Deck],
                        history: [...newHistory],
                        turn: 'Player 3',
                        count: newCount,

                    })
                    console.log(newHistory)

                    console.log("Count: " + count)

                    if(count === 4){
                        calculateStunsPlayers(newHistory)
                    }

                break;
                case 'Player 3' :


                    if(checkIfStunsAvailable(turn, playedCard).stuns){
                        if(playedCard === checkIfStunsAvailable(turn,playedCard).card){

                        }
                        else{
                            alert("You must stuns")
                            break;
                        }
                    }
                    const removeCard3 = player3Deck.indexOf(playedCard)

                    let newPlayer3Deck = [...player3Deck.slice(0, removeCard3), ...player3Deck.slice(removeCard3 + 1)]
                    newPlayer3Deck.push(drawCard())
                    newCount = count+1
                    newHistory = [...history, {player: 'Player 3', card: playedCard}]

                    socket.emit('updateGameState', {
                        drawCardsPile: [...drawCardsPile],
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), playedCard, ...playedCardsPile.slice(playedCardsPile.length)],
                        player3Deck: [...newPlayer3Deck],
                        history: [...newHistory],
                        turn: 'Player 4',
                        count: newCount,
                    })
                    console.log(newHistory)

                    console.log(count)
                    console.log(stunsPlayers);

                    if(count === 4){
                        calculateStunsPlayers(newHistory)
                    }

                break;
                case 'Player 4' :

                    if(checkIfStunsAvailable(turn, playedCard).stuns){
                        if(playedCard === checkIfStunsAvailable(turn,playedCard).card){


                        }
                        else{
                            alert("You must stuns")
                            break;
                        }
                    }
                    const removeCard4 = player4Deck.indexOf(playedCard)


                    let newPlayer4Deck = [...player4Deck.slice(0, removeCard4), ...player4Deck.slice(removeCard4 + 1)]
                    newPlayer4Deck.push(drawCard())
                    newCount = count+1;

                    newHistory = [...history, {player: 'Player 4', card: playedCard}]


                    socket.emit('updateGameState', {
                        drawCardsPile: [...drawCardsPile],
                        playedCardsPile: [...playedCardsPile.slice(0, playedCardsPile.length), playedCard, ...playedCardsPile.slice(playedCardsPile.length)],
                        player4Deck: [...newPlayer4Deck],
                        history: [...newHistory],
                        turn: 'Player 1',
                        count: newCount,
                    })
                    console.log(newHistory)

                    console.log(count)

                    if(count === 4){
                        calculateStunsPlayers(newHistory)
                    }
                break;
            }
        }


    // Om rummet är fullt (aka 4 spelare connected) visa bara en h1 (gör ett lobby rum senare, skulle vara mysigt om vi har tid)
        if(roomFull === true){
            return (
                <div className='flex flex-col gap-14 justify-center items-center h-screen w-screen'>
                    <h1 className='text-[80px] font-bold'>Room is full</h1>
                    <Link to={'/dashboard'}>
                        <input type="button" value="Return to home page" className='text-3xl font-bold p-3 bg-[#e64820] rounded-3xl cursor-pointer hover:bg-[#9e341a]' />
                    </Link>
                </div>
            )
        } else{
            return (

                <div className='flex flex-col justify-center items-center h-screen w-screen gap-5'>
                    <>
                    Stuns Players:
                    {stunsPlayers.map((item, i) => (
                            <div>{item}</div>
                    ))}
                    </>


{/* //!--------------------------------------------------------player 1--------------------------------------------------------------- */}
                    {currentUser === 'Player 1'  && <>
                     
                    <h1>This is player 1</h1>

                    <div className=' grid grid-rows-3 grid-flow-col gap-4 w-[70vw]'>
                    

                        
                      


                    <div className='row-span-3 flex flex-col gap-5  '>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>

                                Player 2 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player2Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>
                                Player 3 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player3Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center '>
                                Player 4 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player4Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>
                    </div>

                        <div className='col-span-2 row-span-2 flex flex-col gap-[10px]  items-center  '>
                            
                            Played Cards: 
                            <div className='grid grid-cols-4 gap-[20px] border-[#F2F1E4] border-4 min-w-[500px] max-w-fit h-[400px] p-5 overflow-scroll'>
                               {playedCardsPile.map((item, i) => (
                                   <img
                                   key={i}
                                   className="h-[200px] "
                                   src={(`../bilder/${item.name}.png`)}
                                   />
                                   ))}
                              
                            </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center  col-span-2 '>

                            Your cards:
                            <div className='flex  gap-[20px] '>
                            {player1Deck.map((item, i) => (
                                <img
                                    key={i}
                                    className="h-[200px] hover:border-[#eeac31] hover:border-4 hover:rounded-xl ease-in duration-100  cursor-pointer"
                                    onClick={turn === 'Player 1' ? () => cardPlayedHandler(item) : undefined}
                                    src={(`../bilder/${item.name}.png`)}
                                    />
                            ))}

                            </div>
                        </div>

                    </div>
                    </>}

{/* //!--------------------------------------------------------player 2--------------------------------------------------------------- */}

                    {currentUser === 'Player 2' && <>
                    
                        <h1>This is player 2</h1>


                        <div className=' grid grid-rows-3 grid-flow-col gap-4 w-[70vw]'>
                    

                        
                      


                    <div className='row-span-3 flex flex-col gap-5  '>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>

                                Player 1 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player1Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>
                                Player 3 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player3Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center '>
                                Player 4 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player4Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>
                    </div>

                        <div className='col-span-2 row-span-2 flex flex-col gap-[10px]  items-center  '>
                            
                            Played Cards: 
                            <div className='grid grid-cols-4 gap-[20px] border-[#F2F1E4] border-4 min-w-[500px] max-w-fit h-[400px] p-5 overflow-scroll'>
                               {playedCardsPile.map((item, i) => (
                                   <img
                                   key={i}
                                   className="h-[200px] "
                                   src={(`../bilder/${item.name}.png`)}
                                   />
                                   ))}
                              
                            </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center  col-span-2 '>

                            Your cards:
                            <div className='flex  gap-[20px]'>
                            {player2Deck.map((item, i) => (
                                <img
                                    key={i}
                                    className="h-[200px] hover:border-[#eeac31] hover:border-4 hover:rounded-xl ease-in duration-100  cursor-pointer"
                                    onClick={turn === 'Player 2' ? () => cardPlayedHandler(item) : undefined}
                                    src={(`../bilder/${item.name}.png`)}
                                    />
                            ))}

                            </div>
                        </div>

                    </div>
                    </>}

{/* //!--------------------------------------------------------player 3--------------------------------------------------------------- */}


                    {currentUser === 'Player 3' && <>

                        <h1>This is player 3</h1>
                        <div className=' grid grid-rows-3 grid-flow-col gap-4 w-[70vw]'>
                    

                        
                      


                    <div className='row-span-3 flex flex-col gap-5  '>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>

                                Player 1 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player1Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>
                                Player 2 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player2Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center '>
                                Player 4 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player4Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>
                    </div>

                        <div className='col-span-2 row-span-2 flex flex-col gap-[10px]  items-center  '>
                            
                            Played Cards: 
                            <div className='grid grid-cols-4 gap-[20px] border-[#F2F1E4] border-4 min-w-[500px] max-w-fit h-[400px] p-5 overflow-scroll'>
                               {playedCardsPile.map((item, i) => (
                                   <img
                                   key={i}
                                   className="h-[200px] "
                                   src={(`../bilder/${item.name}.png`)}
                                   />
                                   ))}
                              
                            </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center  col-span-2 '>

                            Your cards:
                            <div className='flex  gap-[20px]'>
                            {player3Deck.map((item, i) => (
                                <img
                                    key={i}
                                    className="h-[200px] hover:border-[#eeac31] hover:border-4 hover:rounded-xl ease-in duration-100  cursor-pointer"
                                    onClick={turn === 'Player 3' ? () => cardPlayedHandler(item) : undefined}
                                    src={(`../bilder/${item.name}.png`)}
                                    />
                            ))}

                            </div>
                        </div>

                    </div>

                    </>}

{/* //!--------------------------------------------------------player 4--------------------------------------------------------------- */}
                    {currentUser === 'Player 4' && <>

                        <h1>This is player 4</h1>


                        <div className=' grid grid-rows-3 grid-flow-col gap-4 w-[70vw]'>
                    

                        
                      


                    <div className='row-span-3 flex flex-col gap-5  '>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>

                                Player 1 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player1Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>
                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center'>
                                Player 2 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player2Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>

                        <div className='flex flex-col gap-[10px] justify-center items-center '>
                                Player 3 Cards: 
                                
                                <div className='flex  gap-[20px]'>
                                    {player3Deck.map((item, i) =>(
                                        <img
                                        key={i}
                                        className="h-[200px]"
                                        src={(`../bilder/BackSide.png`)}
                                        />
                                    ))}

                                </div>

                        </div>
                    </div>

                        <div className='col-span-2 row-span-2 flex flex-col gap-[10px]  items-center  '>
                            
                            Played Cards: 
                            <div className='grid grid-cols-4 gap-[20px] border-[#F2F1E4] border-4 min-w-[500px] max-w-fit h-[400px] p-5 overflow-scroll'>
                               {playedCardsPile.map((item, i) => (
                                   <img
                                   key={i}
                                   className="h-[200px] "
                                   src={(`../bilder/${item.name}.png`)}
                                   />
                                   ))}
                                
                            </div>
                        </div>
                                    
                        <div className='flex flex-col gap-[10px] justify-center items-center  col-span-2 '>

                            Your cards:
                            <div className='flex  gap-[20px]'>
                            {player4Deck.map((item, i) => (
                                <img
                                    key={i}
                                    className="h-[200px] hover:border-[#eeac31] hover:border-4 hover:rounded-xl ease-in duration-100  cursor-pointer"
                                    onClick={turn === 'Player 4' ? () => cardPlayedHandler(item) : undefined}
                                    src={(`../bilder/${item.name}.png`)}
                                    />
                            ))}

                            </div>
                        </div>

                    </div>
                    </>}
                </div>
            )
        }
    }

export default Game;
