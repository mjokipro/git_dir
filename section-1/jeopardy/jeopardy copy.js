const BASE_URL = 'http://jservice.io';

let cats = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

let categories = async function getCategoryIds() {

    let newArr = [];
    let count = 0;
    
        
    while (newArr.length < 10) {
            
        let random = Math.floor(Math.random() * 10001);
        // let result = cates[random];
        const response = await axios.get(`${BASE_URL}/api/category?id=${random}`,);
        newArr.push(response.data);

    }
        
    count++;
    
    newArr.filter(v => v.id);
    newArr.slice(0, 6);
    console.log(newArr);

        

    // console.log(response.data)

    let catArray;
    let catCount = 0;

    while (catArray < 6) {
        catArray.push(getCategory(newArr));
    }

    catCount++;
    console.log(catArray);
    return newArr;
    console.log(await getCategory(newArr));
}

 

 
    

    
//   const res = await axios.get(`https://jservice.io/api/clues?id=${catId}`);
// function mapQs() {

//     let questions = {};
//     questions = cat.data;
//     shuffle(questions);
//     console.log(questions);
// 	let clueArr = questions.map((v) => {
//         return {
//             title: v.category.title,
//             clues:
//             {
//             question: v.question,
//                 answer: v.answer
//             }
//         };
//     });
//     for (let clu of clueArr) {
//         cats.push(clu);
//     }
//     let shufClues = shuffle(clueArr);
//     console.log(shufClues)

    
//     return getCategory(shufClues);
// }

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
function shuffle( arr) {
    console.debug('shuffle()');
    newArr = [];
    let rand, val, i;
    for (i = arr.length - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * (i + 1));
        val = arr[i];
        arr[i] = arr[rand];
        arr[rand] = val;
        newArr.push(arr[rand]);
    }
    return newArr;
}

function getCategory(catId) {
    // const res = await axios.get(`https://jservice.io/api/clues?id=${catId}`);
    
    let [{ title, clues: cluesArr }] = catId;
    
    let [{ question, answer }] = cluesArr;
    
    console.log(cluesArr);
    // let [{title, cl}]
    catId.map(v => { 
    return [{
        title: title,
        clues: {
            question,
            answer,
            }
    }]
})

    const newArr = []
    
    return catId;
}



/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
*/
const WIDTH = 6;
const HEIGHT = 5;
let board = [];

const allEqual = arr => arr.every(v => v === arr[0])
function allTheSame(array) {

}

async function fillTable() {
    console.debug('fillTable()');
    
    let getCats = [];
    getCats = await categories();
    console.log(getCats);
    getCats.slice(0, 6);
    // getCats = shuffle(cats).slice(0, 6);
    let catDat = [];
    console.log(getCats);
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }  
    
    

    
    for (let i = 0; i < 6; i++) {
        catDat.push(getCats[i]);       
    }

    console.log(catDat);

    catDat.slice(0, 5);


    $("#jeopardy").remove();
    $('#categories').remove();
    $('tr').remove();
    let $board;
  $board = $('<table id="jeopardy"></table>');
    $('body').append($board);
    let $tHead = $('<tr id="categories"></tr>');
    $($board).append($tHead);
    
    for (let x = 0; x < WIDTH; x++) {
        
        let $th = $('<th></th>');
        $th.attr('id', x);
        $th.html(catDat[x].title);
        $tHead.append($th);
    }
    
    $board.append($tHead); 
    for (let y = 0; y < HEIGHT; y++) {
        const $tr = $('<tr></tr>');
        
        for (let x = 0; x < WIDTH; x++) {
            let $td = $('<td></td>'); 
            $td.html('?');
            $td.attr('id', `${y}-${x}`); 
            $tr.append($td); 
            $($td).on('click', function(e) {
                for (let y = 0; y < HEIGHT; y++) {
                    for (let x = 0; x < WIDTH; x++) {
                        if (e.target.id === `${y}-${x}`) {
                            if ($(e.target).html() !== '?') {
                                console.log($(e.target));
                                $(e.target).html(`${getCats[x].clues[y].answer}`)
                                .toggleClass("flipped-second");
                            } else {
                                console.log($(e.target))
                                $(e.target).html(`${getCats[x].clues[y].question}`)
                                .toggleClass("flipped-first");
                            }
                        }
                    }
                }
            });
        }
        
        ($board).append($tr).eq(0);     
    }
    $('body').css("background-image", "none");

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */



async function restart() {
    
    $("i").toggleClass("fa fa-spin fa-spinner");
    $("#restart").eq(0).remove();
    $("#categories").eq(0).remove();
    $('#start').after('<button id="restart">Restart</button>');
    $('#restart').on('click', handleClick);
    hideLoadingView();
    await categories();
    fillTable();

}


async function handleClick(evt) {
    console.debug('handleClick(evt)');
    // showLoadingView();
    $("i").toggleClass("fa fa-spin fa-spinner");
    $("#restart").eq(0).remove();
    $("#categories").eq(0).remove();
    $('#start').after('<button id="restart">Restart</button>');
    $('#restart').on('click', restart);
    hideLoadingView();
    await categories();
    fillTable();
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
*/

function showLoadingView() {
    console.debug('showLoadingView()');
    $("i").toggleClass("fa fa-spin fa-spinner");
    $('body').css("background-image", "url(../jeopardy.gif)");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    console.debug('hideLoadingView()');
    $("i").toggleClass("fa fa-spin fa-spinner");
    
}



/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    console.debug('setupAndStart()');
    showLoadingView();
}

/** On click of start / restart button, set up game. */
$('#start').on('click', handleClick)
// TODO

/** On page load, add event handler for clicking clues */
$(window).on("load", setupAndStart);
// TODO