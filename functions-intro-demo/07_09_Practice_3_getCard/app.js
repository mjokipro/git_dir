// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----1,2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object



function getCard() {
    const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const suits = ["clubs", "spades", "hearts", "diamonds"];

    const random = Math.floor(Math.random() * vals.length);
    const ranVal = vals[random];

    const random2 = Math.floor(Math.random() * suits.length);
    const ranSuit = suits[random2];

    return { randomValue: ranVal, randomSuit: ranSuit };
}



getCard()