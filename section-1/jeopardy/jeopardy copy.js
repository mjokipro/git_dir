const BASE_URL = 'http://jservice.io';
const NUM_CATEGORIES = 6;

let cates;
let newCats;
let newCatIds;
let catsArr;
let newArray;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

let categories = async function getCategoryIds() {

    let cats = [];
    let count = 0;
    newCatIds = [];
    newCats = [];
    

    // let random = Math.floor(Math.random() * 10001);
    
    const response = await axios.get(`${BASE_URL}/api/categories?count=100`,);
    cats = response.data;
        
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        newCatIds.push(_.sample(cats));
        // newCatIds.push(cats[i].category.id)
    }

    newCats = newCatIds.map(v => {
        return v.id;
    })
    

    console.log(newCatIds);

    // for (let i = 0; i < newCatIds.length; i++) {
    //     newCats.push(await getCategory(newCatIds[i]));
    // }

    console.log(newCats);

    // await getCategory(newCatIds);

    return newCatIds;
    
}



async function getCategory(catId) {
    console.debug('getCategory(catId)');

    console.log(catId.id)

    newArray = {};

    let res = await axios.get(`https://jservice.io/api/clues?category=${catId.id}`);

    let clues = res.data.slice(0, 6);

    console.log(clues);

     [{ question, answer, category: title }] = clues;
  
        
    let cluesArr = clues.map(v => {
        return {
            title: v.category.title,
            clues: {
                question,
                answer,
            }
        }
        })
        // let [{ question, answer }] = cluesArr;
        
        console.log(cluesArr);
        
        // console.log(clues);
        
        
        // [{ title, clues: cluesArr }] = clues;
        // [{ question, answer }] = cluesArr;
        // console.log([{title, clues: cluesArr}]);
    newArray += cluesArr;
    // console.log(newArray)
        return cluesArr;
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

async function fillTable(cats) {
    console.debug('fillTable()');
    
    let getCats = [];
    getCats = cats.slice(0, 6);
    console.log(cats);
    // getCats = shuffle(cats).slice(0, 6);
    let catDat = [];
    // console.log(getCats);
    for (let y = 0; y < HEIGHT; y++) {
        // for (let x = 0; x < HEIGHT; x++) {
            board.push(Array.from({ length: WIDTH }));
        // }
    }
    
    
    for (let i = 0; i < 6; i++) {
        catDat.push(getCats[i])

    }

    console.log(catDat);
    console.log(getCats[0]);

    catDat.slice(0, 6);


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
        $th.html(catDat[x][x].title);
        $tHead.append($th);
    }
    
    $board.append($tHead); 

    // for (let i = 0; i < getCats.length; i++) {
        for (let y = 0; y < HEIGHT; y++) {
            const $tr = $('<tr></tr>');
        
            for (let x = 0; x < WIDTH; x++) {
                let $td = $('<td></td>');
                $td.html('?');
                $td.attr('id', `${y}-${x}`);
                $tr.append($td);
                $($td).on('click', function (e) {
                
                    // for (let i = 0; i < HEIGHT; i++) {
                        for (let y = 0; y < HEIGHT; y++) {
                            for (let x = 0; x < WIDTH; x++) {
                                let bla = getCats[x];
                        
                                if (e.target.id === `${y}-${x}`) {
                                    if ($(e.target).html() !== '?') {
                                        console.log($(e.target));
                                        $(e.target).html(`${bla[y].clues.answer}`)
                                            .toggleClass("flipped-second");
                                    } else {
                                        console.log($(e.target))
                                        $(e.target).html(`${bla[y].clues.question}`)
                                            .toggleClass("flipped-first");
                                    }
                                }
                            }
                        }
                    // }
                });
            }
        
            ($board).append($tr).eq(0);
        }
    // }
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
     cates = await categories();

    catsArr = [];
    
    for (let i = 0; i < 6; i++) {
        catsArr.push(await getCategory(cates[i]));
    }
    console.log(catsArr);
    fillTable(catsArr)

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
    cates = await categories();

    catsArr = [];
    
    for (let i = 0; i < 6; i++) {
        catsArr.push(await getCategory(cates[i]));
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