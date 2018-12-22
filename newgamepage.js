function newGame() {
	var newTemplate = `
	<div id="newGameTitle"><h1>Memory</h1></div>
	<button type="button" id="newGameButton">New Game</button>
	`
	$('#gamespace').html(newTemplate)
}

newGame()

$('#newGameButton').on('click', function(e){
	e.preventDefault()
	window.open("gamepage.html", "_self")
})