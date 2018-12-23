//have the deck shuffled, then deal them out into the display
function deal() {
	var deck = shuffle(cardList)
	var dealTemplate = ``
	deck.forEach(function(card) {
		dealTemplate += 
		`<div class="card">
			<div class="front"><img src="https://res.cloudinary.com/teepublic/image/private/s--3ginvffv--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1520132504/production/designs/2421215_0.jpg" height:50 width:50></div>
			<div class="back">${card.source}</div>
		</div>`
	})
	displayCards(dealTemplate)
}

//display the dealt cards
function displayCards(cards) {
	$('#gamespace').html(cards)
	$('#gamespace').after(`<div id="scoreLives">
		<div id="score">
		</div>
		<div id="lives">
		</div>
		</div>`
	)
	updateInfo()
}

//shuffle the deck
function shuffle(arr) {
	//Fisher-Yates (aka Knuth) Shuffle
	var currentIndex = arr.length
	var temporaryValue
	var randomIndex

	//while there remain elements to shuffle
	while (0 !== currentIndex) {

		//pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		//and swap it with the current element
		temporaryValue = arr[currentIndex]
		arr[currentIndex] = arr[randomIndex]
		arr[randomIndex] = temporaryValue
	}

	return arr
}

//if they're the same card, their html will be exactly identical
function compare(html1, html2) {
	if(html1 === html2) {
		return true
	} else {
		return false
	}
}

//if they've made nine matches
function didTheyWin(score) {
	if(score >= 9) {
		window.open("memory-win.html", "_self")
	}
}

//if they've run out of lives
function didTheyLose(lives) {
	if(lives <= 0) {
		window.open("memory-lose.html", "_self")
	}
}

//updates info into #score and #lives
function updateInfo(health = 9, points = 0) {
	$('#score').html(`Score: ${points}`)
	$('#lives').html(`Lives: ${health}`)
}

deal()

$(document).ready(function() {
	//lives and score
	var lives = 9
	var score = 0
	//to store the values of the cards
	var storage = []
	//when card is clicked, flip it
	$('.card').flip({
		trigger: 'manual'
	})
	//after it flips
	$('.card').on('click', function(){
		//if the card clicked is not showing and is not stayUp
		if(!$(this).hasClass('showing') && !$(this).hasClass('stayUp')) {
			//flip the card (face-down in terms of .flip() but face-up for our purposes)
			$(this).flip(true)
			//store the html of the card
			storage.push($(this).html())
			//set the cards flipped to be showing
			$(this).addClass('showing')
			//if they've clicked exactly two cards
			if (storage.length === 2) {
				//if the two htmls match
				if(compare(storage[0], storage[1])) {
					//pop twice (to clear out the array)
					storage.pop()
					storage.pop()
					//add a stayUp class to currently showing cards
					$('.showing').addClass('stayUp')
					//remove showing from everything as a safety valve to prevent all the cards from being showing
					$('.showing').removeClass('showing')
					//turn off the ability to even flip things that are already stayUp
					$('.stayUp').off('.flip')
					//increment score and check to see if they won
					score++
					didTheyWin(score)
					updateInfo(lives, score)
				} else {
					//pop twice (to clear out the array)
					storage.pop()
					storage.pop()
					//take a second, letting the player see the card flipped, before flipping them both back over
					setTimeout(function() {
						$('.showing').flip(false)
						$('.showing').removeClass('showing')
						//decrement score then check to see if they lost 
						//still in delay so they're not confused by the card not being revealed
						lives--
						didTheyLose(lives)
						updateInfo(lives, score)
					}, 1000)
				}
			}
		} else {
			//do nothing
		}
	})
})