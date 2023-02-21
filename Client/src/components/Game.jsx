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

const [stunsPlayers, setStunsPlayers] = useState([])

const[history, setHistory] = useState([])

const [drawCardsPile, setDrawCardsPile] = useState([])
const[turn, setTurn] = useState('')
const [currentValue, setCurrentValue] = useState('')


const ENDPOINT = ''


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

            socket.on('updateGameState', ({gameOver, winner, turn, count, player1Deck, player1FlippedCards, player2Deck, player2FlippedCards, player3Deck, player3FlippedCards, player4Deck, player4FlippedCards, history, playedCardsPile, stunsPlayers, drawCardsPile, currentValue }) => {
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


        const calculateStunsPlayers = (newHistory) => {
            let bigVal = 0;

            // Calculates highest card in pile
            for (let i = 0; i < newHistory.length; i++) {
                if(newHistory[i].card.value == bigVal){
                    bigVal = newHistory[i].card.value
                }
            }

            // Calculates if two cards are the same





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

        const drawCard = () => {
            return drawCardsPile.pop();
        }

        const cardPlayedHandler = (playedCard) => {
            let newStunsPlayers = [];
            let newCount;
            let newHistory;
            switch(turn) {

                case 'Player 1' :


                    if(checkIfStunsAvailable(turn, playedCard).stuns){
                        if(playedCard === checkIfStunsAvailable(turn,playedCard).card){

                            for (let i = 0; i < history.length; i++) {

                            }
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



        if(roomFull === true){
            return (
                <div>
                    <h1>Room is full</h1>
                </div>
            )
        } else{
            return (

                <div>
                    <React.Fragment>
                    Stuns Players:
                    {stunsPlayers.map((item, i) => (
                            <div>{item}</div>
                    ))}
                    </React.Fragment>


                    {currentUser === 'Player 1'  && <>
                    <div>
                    <br />
                        <h1>This is player 1</h1>

                        <br />
                        Your cards: {player1Deck.map((item, i) =>(
                            <p
                            onClick={turn === 'Player 1' ? () => cardPlayedHandler(item) : undefined}
                            >Card {i+1}: {item.name}</p>
                        ))}

                        <br /><br />
                        Player 2 Cards: {player2Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                        ))}

                        <br />
                        Player 3 Cards: {player3Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br />
                        Player 4 Cards: {player4Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br /><br />
                        Played Cards: {playedCardsPile.map((item, i) => (
                            <p>Card Pile: {i+1} {item.name}</p>
                        ))}

                    </div>
                    </>}

                    {currentUser === 'Player 2' && <>
                    <br />
                        <h1>This is player 2</h1>

                        <br />

                        Your cards: {player2Deck.map((item, i) =>(
                            <p
                            onClick={turn === 'Player 2' ? () => cardPlayedHandler(item) : undefined}
                            >Card {i+1}: {item.name}
                            </p>
                             ))}

                        <br /><br />

                        Player 1 Cards: {player1Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                        ))}

                        <br />

                        Player 3 Cards: {player3Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br />

                             Player 4 Cards: {player4Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                            <br /><br />

                            Played Cards: {playedCardsPile.map((item, i) => (
                            <p>Card Pile: {i+1} {item.name}</p>
                             ))}
                    </>}

                    {currentUser === 'Player 3' && <>
                    <br />
                        <h1>This is player 3</h1>
                        <br />
                        Your cards: {player3Deck.map((item, i) =>(
                            <p
                            onClick={turn === 'Player 3' ? () => cardPlayedHandler(item) : undefined}
                            >Card {i+1}: {item.name}
                            </p>
                            ))}

                        <br /><br />

                        Player 1 Cards: {player1Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                        ))}

                        <br />

                        Player 2 Cards: {player2Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br />

                        Player 4 Cards: {player4Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br  /><br />

                        Played Cards: {playedCardsPile.map((item, i) => (
                            <p>Card Pile: {i+1} {item.name}</p>
                        ))}

                    </>}

                    {currentUser === 'Player 4' && <>
                    <br />
                        <h1>This is player 4</h1>

                        <br />

                        Your cards: {player4Deck.map((item, i) =>(
                            <p
                            onClick={turn === 'Player 4' ? () => cardPlayedHandler(item) : undefined}
                            >Card {i+1}: {item.name}
                            </p>
                            ))}

                        <br /><br />

                        Player 1 Cards: {player1Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                        ))}

                        <br />

                        Player 2 Cards: {player2Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}

                        <br />

                        Player 3 Cards: {player3Deck.map((item, i) =>(
                            <p>Card {i+1}: Hidden card</p>
                            ))}


                        <br /><br />

                        Played Cards: {playedCardsPile.map((item, i) => (
                            <p>Card Pile: {i+1} {item.name}</p>
                        ))}
                    </>}
                </div>
            )
        }
}


export default Game;
