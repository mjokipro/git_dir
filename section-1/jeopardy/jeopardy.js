const BASE_URL = 'http://jservice.io';
const NUM_CATEGORIES = 6;

let cates = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

let categories = async function getCategoryIds() {

    let cats = [];
    let count = 0;
    let newCatIds = [];
    let newCats = [];

    // let random = Math.floor(Math.random() * 10001);
    
    const response = await axios.get(`${BASE_URL}/api/random?count=${NUM_CATEGORIES}`,);
    cats = response.data;
        
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        newCatIds.push(cats[i].category.id)
    }

    
    
    // while (newCats.length < 6) {
    //     // let cat = 
    // //     let result = cats[count].id;
    //     newCats.push(await getCategory(newCatIds[count]));

    // }
        
    // count++;


    // newArr.slice(0, 6);
    console.log(newCatIds);

    // for (let i = 0; i < newCatIds.length; i++) {
    //     newCats.push(await getCategory(newCatIds[i]));
    // }

    console.log(newCats);

    // await getCategory(newCatIds);

    return newCatIds;
    
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
    console.debug('getCategory(catId)');

    console.log(catId)

    let catArr = [];

    let res = await axios.get(`https://jservice.io/api/clues?category=${catId}`);

    // let data = res.data;
    console.log(res.data);
    
    // console.log(cats[0].category.title);
    
    // let [{ answer, question, category: { title } }] = res.data;
    // let [{ answer, question, category: cluesArr }] = res.data;
    
    // let { title } = cluesArr;

    // res.data.map(v => {
    //     return [{
    //         title: title,
    //         clues: {
    //             question,
    //             answer,
    //         }
    //     }]
    // })

    for (let i = 0; i < res.data.length; i++) {
        catArr.push( {
            title: title,
            clues: {
                question,
                answer,
            }
        })
    }
    console.log(catArr);

//     catArr = res.data.map((val) => {     
//         // let v = val.v;
//         return {
//             title: val.category.title,
//             clues: {
//                 question: val.question,
//                 answer: val.answer,
//             }
//         }

// })
    console.log(catArr[0]);
    const newArr = []
    
    return catArr;
}

function stuffMap() {

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

async function fillTable(cats) {
    console.debug('fillTable()');
    
    let getCats = [];
    // getCats = await categories();
    getCats = cats.slice(0, 6);
    console.log(getCats);
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
    let catIds = await categories();

    let catsArr = [];
    
    for (let i = 0; i < 6; i++) {
        catsArr[i] = await getCategory(catIds[i]);
    }
    console.log(catsArr);
    fillTable(catsArr)

    // for (let i = 0; i < catIds.length; i++) {
    //     $cates[i] = await getCategory(categories[i]);
    // }
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