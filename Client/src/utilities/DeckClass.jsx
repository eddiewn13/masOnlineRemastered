export default class DeckClass{
    constructor(){
        this.deck = [
            {
                name: "AceHeart",
                value: 14,
                suit: "heart",
            },
            {
                name: "TwoHeart",
                value: 2,
                suit: "heart",
            },
            {
                name: "ThreeHeart",
                value: 3,
                suit: "heart",
            },
            {
                name: "FourHeart",
                value: 4,
                suit: "heart",
            },
            {
                name: "FiveHeart",
                value: 5,
                suit: "heart",
            },
            {
                name: "SixHeart",
                value: 6,
                suit: "heart",
            },
            {
                name: "SevenHeart",
                value: 7,
                suit: "heart",
            },
            {
                name: "EightHeart",
                value: 8,
                suit: "heart",
            },
            {
                name: "NineHeart",
                value: 9,
                suit: "heart",
            },
            {
                name: "TenHeart",
                value: 10,
                suit: "heart",
            },
            {
                name: "JackHeart",
                value: 11,
                suit: "heart",
            },
            {
                name: "QueenHeart",
                value: 12,
                suit: "heart",
            },
            {
                name: "KingHeart",
                value: 13,
                suit: "heart",
            },
            {
                name: "AceSpade",
                value: 14,
                suit: "spade",
            },
            {
                name: "TwoSpade",
                value: 2,
                suit: "spade",
            },
            {
                name: "ThreeSpade",
                value: 3,
                suit: "spade",
            },
            {
                name: "FourSpade",
                value: 4,
                suit: "spade",
            },
            {
                name: "FiveSpade",
                value: 5,
                suit: "spade",
            },
            {
                name: "SixSpade",
                value: 6, 
                suit: "spade",
            },
            {
                name: "SevenSpade",
                value: 7,
                suit: "spade",
            },
            {
                name: "EightSpade",
                value: 8,
                suit: "spade",
            },
            {
                name: "NineSpade",
                value: 9,
                suit: "spade",
            },
            {
                name: "TenSpade",
                value: 10,
                suit: "spade",
            },
            {
                name: "JackSpade",
                value: 11,
                suit: "spade",
            },
            {
                name: "QueenSpade",
                value: 12,
                suit: "spade",
            },
            {
                name: "KingSpade",
                value: 13,
                suit: "spade",
            },
            {
                name: "AceDiamond",
                value: 14,
                suit: "diamond",
            },
            {
                name: "TwoDiamond",
                value: 2,
                suit: "diamond",
            },
            {
                name: "ThreeDiamond",
                value: 3,
                suit: "diamond",
            },
            {
                name: "FourDiamond",
                value: 4,
                suit: "diamond",
            },
            {
                name: "FiveDiamond",
                value: 5,
                suit: "diamond",
            },
            {
                name: "SixDiamond",
                value: 6,
                suit: "diamond",
            },
            {
                name: "SevenDiamond",
                value: 7,
                suit: "diamond",
            },
            {
                name: "EightDiamond",
                value: 8,
                suit: "diamond",
            },
            {
                name: "NineDiamond",
                value: 9,
                suit: "diamond",
            },
            {
                name: "TenDiamond",
                value: 10,
                suit: "diamond",
            },
            {
                name: "JackDiamond",
                value: 11,
                suit: "diamond",
            },
            {
                name: "QueenDiamond",
                value: 12,
                suit: "diamond",
            },
            {
                name: "KingDiamond",
                value: 1,
                suit: "diamond",
            },
            {
                name: "AceClub",
                value: 14,
                suit: "club",
            },
            {
                name: "TwoClub",
                value: 2,
                suit: "club",
            },
            {
                name: "ThreeClub",
                value: 3,
                suit: "club",
            },
            {
                name: "FourClub",
                value: 4,
                suit: "club",
            },
            {
                name: "FiveClub",
                value: 5,
                suit: "club",
            },
            {
                name: "SixClub",
                value: 6,
                suit: "club",
            },
            {
                name: "SevenClub",
                value: 7,
                suit: "club",
            },
            {
                name: "EightClub",
                value: 8,
                suit: "club",
            },
            {
                name: "NineClub",
                value: 9,
                suit: "club",
            },
            {
                name: "TenClub",
                value: 10,
                suit: "club",
            },
            {
                name: "JackClub",
                value: 11,
                suit: "club",
            },
            {
                name: "QueenClub",
                value: 12,
                suit: "club",
            },
            {
                name: "KingClub",
                value: 13,
                suit: "club",
            },

            
        ];
        this.shuffle();

    }



      shuffle(){
      for (let i = 0; i < 1000; i++)
      {
          let location1 = Math.floor((Math.random() * this.deck.length));
          let location2 = Math.floor((Math.random() * this.deck.length));
          let tmp = this.deck[location1];
  
          this.deck[location1] = this.deck[location2];
          this.deck[location2] = tmp;
      }
    }

    GiveCard(){
        return this.deck.pop();
    }

      
    
}