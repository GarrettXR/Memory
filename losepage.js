function displayLoss() {
	var lossTemplate = `
	<h1>You Lose!</h1>
	<button type="button" class="tryAgain">Try Again</button>
	`

	$('#losetext').html(lossTemplate)
}

displayLoss()

$('.tryAgain').on('click', function(e){
	e.preventDefault()
	window.open("index.html", "_self")
})