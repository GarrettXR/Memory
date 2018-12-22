//have the deck shuffled, then deal them out into the display
function deal() {
	var deck = shuffle(cardList)
	var dealTemplate = ``
	deck.forEach(function(card) {
		dealTemplate += 
		`<div class="card">
			<div class="front">${card.source}</div>
			<div class="back">${card.source}</div>
		</div>`
	})
	displayCards(dealTemplate)
}

//display the dealt cards
function displayCards(cards) {
	$('#gamespace').html(cards)
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

function compare(html1, html2) {
	if(html1 === html2) {
		return true
	} else {
		return false
	}
}

deal()

$(document).ready(function() {
	//to store the values of the cards
	var storage = []
	//when card is clicked, flip it
	$('.card').flip({
		trigger: 'manual'
	})
	//after it flips
	$('.card').on('click', function(){
		if(!$(this).hasClass('showing') && !$(this).hasClass('shown')) {
			$(this).addClass('shown')
			$(this).flip(true)
			storage.push($(this).html())
			$(this).addClass('showing')
			//if they've clicked exactly two cards
			if (storage.length === 2) {
				//if the two htmls match
				if(compare(storage[0], storage[1])) {
					console.log(storage)
					//pop twice (to clear out the array)
					storage.pop()
					storage.pop()
					console.log('popped storage')
					//then remove showing, because we flip showing
					$('.showing').removeClass('showing')
				} else {
					storage.pop()
					storage.pop()
					setTimeout(function() {
						$('.showing').flip(false)
						console.log('tried to flip')
						$('.showing').removeClass('showing')
						$('.shown').removeClass('shown')
					}, 1000)
				}
			}
		} else {
			console.log('it has it')
		}
	})
	
})