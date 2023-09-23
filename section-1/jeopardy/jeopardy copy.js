const BASE_URL = 'http://jservice.io';

let cats = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    
    let count = 0;
    let catId = [286, 209,
        1892,
        4483,
        88,
        218,
        1072,
        881,
        7355,
        574,
        16,
        3336,
        6224,
        14701,
        388,
        7347,
        380,
        411,
        1147,
        1686,
        2760,
        1808,
        651,
        726,
        1404,
        3333,
        1150,
        1140,
        2350,
        538,
        863,
        530,
        50,
        809,
        7740,
        1559,
        9238,
        255,
        12876,
        6436,
        3968,
        1896,
        14508,
        11948,
        10646,
        16250,
        311,
        7312,
        49,
        770,
        17982,
        1445,
        131];
 
    let newArr = shuffle(catId);
    console.log(newArr);
    console.debug('getCategoryIds');
    
    //  while(newArr.length < 6) {
        
    //     let random = Math.floor(Math.random() * newArr.length + count);
    //     let result = catId[random];
    //     newArr.push(result);
    //   count++;
    //  }
    
  const res = await axios.get(`https://jservice.io/api/clues?id=${catId}`);
    
    //    [{ title, clues: { question, answer } }] = res.data;
    
    // console.log(res.data);
    let questions = {};
    questions = res.data;
    shuffle(questions);
    console.log(questions);
	let clue = questions.map((v) => {
        return {
            title: v.category.title,
            clues:
            {
            question: v.question,
                answer: v.answer
            }
        };
    });
    for (let clu of clue) {
        cats.push(clu);
    }
    console.log(clue)
    // console.log(categories);
    
    return getCategory(clue);
}

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

async function getCategory(catId) {
    function shuffle(arr) {
        console.debug('shuffle()');
        newArr = [];
        let rand, val, i;
        for (i = arr.length - 1; i > 0; i--) {
            rand = Math.floor(Math.random() * (i + 1));
            val = arr[i];
            arr[i] = arr[rand];
            arr[rand] = val;
        }
        return newArr;
    }
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

async function fillTable() {
    console.debug('fillTable()');
    let isTrue = true;
    let getCats = shuffle(cats).slice(0, 6);
    let catDat = [];
    console.log(getCats);
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }  
   
   
    // [{ title, clues: { question, answer } }] = cats;

    for (let i = 0; i < 6; i++) {
        catDat.push(getCats[i]);
    }

    catDat.slice(0, 5);

    // for (let cat of catDat) {
    //     if (cat === catDat[cat]) {
    //         isTrue = false;
    //     }
    // }
    

    // console.log(catDat);
    
    $("#jeopardy").eq(0).remove();
    $('#categories').eq(0).remove();
    let $board = $('<table id="jeopardy"></table>');
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
                                $(e.target).html(`${cats[x].clues.answer}`)
                                .toggleClass("flipped-second");
                            } else {
                                console.log($(e.target))
                                $(e.target).html(`${cats[x].clues.question}`)
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

// function checkDupes(arrr) {
//     console.debug('checkDupes()');



//     console.log(catDat);
// }

async function restart() {
    
    $("i").toggleClass("fa fa-spin fa-spinner");
    $("#restart").eq(0).remove();
    $("#categories").eq(0).remove();
    $('#start').after('<button id="restart">Restart</button>');
    $('#restart').on('click', handleClick);
    hideLoadingView();
    await getCategoryIds();
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
    await getCategoryIds();
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