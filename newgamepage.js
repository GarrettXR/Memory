function newGame() {
	var newTemplate = `
	<div class="mem">
		<img src="https://vignette.wikia.nocookie.net/dragonball/images/8/8a/Dragon_Ball_manga_chapter_2_USA_debut_logo.png/revision/latest/scale-to-width-down/640?cb=20121028171921" class="title">
		<div id="newGameTitle"><h1>Memory</h1></div>
		<button type="button" id="newGameButton">New Game</button>
	</div>
	`
	$('#gamespace').html(newTemplate)
}

newGame()

$('#newGameButton').on('click', function(e){
	e.preventDefault()
	window.open("gamepage.html", "_self")
})