import React from "react";
import { Link } from "react-router-dom";

export default function PhaseOne() {
    return (
        <section className="w-screen h-screen bg-[#312E2B] flex flex-col  justify-center items-center text-white">
            <div className="w-fit flex flex-col gap-[60px] justify-center items-center">
                <h1 className="text-[70px]">Phase One</h1>
                <div className="flex items-center justify-between w-full ">
                    <Link to={"/guide"}>
                        <img
                            src="./bilder/arrow.png"
                            alt="<-"
                            className="text-[50px] w-[50] h-[50px]"
                        />
                    </Link>
                    <Link to={"/phaseTwo"}>
                        <h1 className="text-[28px]">Next</h1>
                    </Link>
                </div>
                <div className="flex justify-center gap-4 w-[60vw] h-[50vh]">
                    <img
                        src="\bilder\phaseOne.PNG"
                        alt="picture of game"
                        className="h-full border-white border-2"
                    />
                    <p className="max-w-[500px] overflow-scroll overflow-x-hidden">
                        The first phase of the game can be played in two
                        different ways, with or without pitch. Each stun
                        consists of two cards. This means that if there are more
                        than two players, the player to the left of the dealer
                        (known as "forehand") plays first, the next player plays
                        a card if they want and can, and then takes the stun.
                        Then it is the turn of the player who took the stun to
                        play to the next player, and so on. Let's assume that
                        you are "forehand". You play a nine of spades and your
                        opponent plays a nine of diamonds. The stun is tied and
                        you continue playing another card on top of the previous
                        ones. If you don't want the cards, you may play a low
                        card and hope your opponent doesn't win the stun. There
                        is no obligation to take stuns. The idea is to try to
                        get the best cards possible in the first phase of the
                        game in order to play in the second phase. Every time a
                        player takes a card from their hand, they must replace
                        it with a card from the pitch. Each player must always
                        have three cards in their hand, as long as there are
                        cards left in the pitch. But you also have another
                        option. If you want to take a chance on getting a better
                        card or maybe avoid winning a stun with one of your
                        cards, you have the right to play the top card from the
                        stack instead of one of your own three cards. In that
                        case, you take it and place it directly on the table.
                        You are not allowed to first pick it up and add it to
                        your hand. Eventually, the pitch will run out and then
                        it is necessary to play the cards that the players have
                        in their hands. The player who would have had the last
                        card in the pitch is not allowed to pick it up. Only
                        when all the cards that the players have in their hands
                        are played, does the player who would have had the last
                        card in the pitch pick it up, show it to everyone, and
                        then keep it. That card marks the pitch suit in the
                        second phase of the game.
                    </p>
                </div>
            </div>
        </section>
    );
}
