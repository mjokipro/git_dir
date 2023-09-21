const BASE_URL = 'http://jservice.io';

// const categories = [
//           209,
// 			1892,
// 			4483,
// 			88,
// 			218,
// 			1072,
// 			881,
// 			7355,
// 			574,
// 			16,
// 			3336,
// 			6224,
// 			14701,
// 			388,
// 			7347,
// 			380,
// 			411,
// 			1147,
// 			1686,
// 			2760,
// 			1808,
// 			651,
// 			726,
// 			1404,
// 			3333,
// 			1150,
// 			1140,
// 			2350,
// 			538,
// 			863,
// 			530,
// 			50,
// 			809,
// 			7740,
// 			286,
// 			1559,
// 			9238,
// 			255,
// 			12876,
// 			6436,
// 			3968,
// 			1896,
// 			14508,
// 			11948,
// 			10646,
// 			16250,
// 			311,
// 			7312,
// 			49,
// 			770,
// 			17982,
// 			1445,
// 			131
//         ];

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]




/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

const getCategoryIds = async function () {
 console.debug('getCategoryIds');
    const res = await axios.get(BASE_URL + '/api/clues/',
    );
 
    return res.data.map(v => {
        return {
            title: v.category.title,
            clues: {
                question: v.question,
                answer: v.answer,
            }
        }
    })
}

function checkDupes(arr) {
     console.debug('checkDupes');
    return arr.every(function(v) {
        return arr.indexOf(v) !== arr.lastIndexOf(v)
    });
}

const randomFuncTr = () => {

    const categories = [
        209,
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
			286,
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
			131
    ];

     console.debug('randomFuncTr');
    let newArr = [];
    let count = 0;

    while(newArr.length < 6) {
        
        let random = Math.floor(Math.random() * newArr.length + count);
        let result = categories[random];
        newArr.push(result);
      count++;
    }
    console.log(newArr);
    
    return newArr;
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

async function getCategory(catId) {
    console.debug('getCategory(catId)');
    
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
        


        return arr;
    }

    newArr = [];    

    const res = await axios.get(`https://jservice.io/api/category?id=${catId}`);
	let questions = res.data.clues;
    let fiveQs = shuffle(questions).slice(0, 5);

    console.log(fiveQs);
	let clue = fiveQs.map((v) => {
		return { question: v.question, answer: v.answer };
	});
	let catDat = { title: res.data.title, clues: clue };
	return catDat;
}
    const WIDTH = 6;
    const HEIGHT = 5;
    let board = [];


function makeBoard() {
    console.debug('makeBoard');
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
    }  
}

async function makeHtmlBoard() {  
    console.debug('makeHtmlBoard()');
       $("#jeopardy").eq(0)
            .remove();
    let $board = $('<table id="jeopardy"></table>');
    $('body').append($board);
    let $tHead = $('<tr id="categories"></tr>');
    $($board).append($tHead);
    let catDat = [];    
    let categories = [];

    fillTable($board, $tHead, catDat, categories);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
const chosen = [];
async function fillTable($board, $tHead, catDat, categories) {
     console.debug('fillTable($board, $tHead, catDat, categories)');
    // if(!checkDupes(categories))

    categories = randomFuncTr();

    for (let category of categories) {
        if (chosen.indexOf(category) !== -1) {
           
        } 
        
        catDat.push(await getCategory(category));
    }

     

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
							$(e.target).html(`${catDat[x].clues[y].answer}`);
						} else {
							$(e.target).html(`${catDat[x].clues[y].question}`);
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

function restart() {
    console.debug('restart()');
    setupAndStart();
        $('body').css("background-image", "none");
        // $("i").toggleClass("fa fa-spin fa-spinner");
    makeHtmlBoard();
}

function handleClick(evt) {
    console.log('handleClick(evt)');
    evt.preventDefault();
    // let target = evt.target.id;
        $("#jeopardy").eq(0)
            .remove();
    $("#restart").eq(0)
            .remove();
     $('#start')
         .after('<button id="restart">Restart</button>');
    $('#restart').on('click', restart);
            $("i").toggleClass("fa fa-spin fa-spinner");

        makeHtmlBoard();
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    console.debug('showLoadingView()');
    $("i").toggleClass("fa fa-spin fa-spinner");
    $('body').css("background-image", "url(../jeopardy.gif)");
    // hideLoadingView();
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    console.debug('hideLoadingView()')
    $("i").toggleClass("fa fa-spin fa-spinner", off);
    $('body').css("background-image", "none");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */


function setupAndStart() {
    console.debug('setupAndStart');
    showLoadingView();
     $("i").toggleClass("fa fa-spin fa-spinner");
}

/** On click of start / restart button, set up game. */
$('#start').on('click', handleClick)
    
// TODO

/** On page load, add event handler for clicking clues */
$(window).on("load", setupAndStart);
 
// TODO