function displayWin() {
	var winTemplate = `
	<h1 class="win">You Win!</h1>

	<button type="button" class="tryAgain">Try Again</button>
	`

	$('#wintext').html(winTemplate)
}

displayWin()

$('.tryAgain').on('click', function(e){
	e.preventDefault()
	window.open("index.html", "_self")
})