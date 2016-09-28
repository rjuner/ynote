//	This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  global youtube player instance
var player;

// load actualy player with id
function makePlayer(id){
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: id,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// convert youtube time to minutes:seconds
function converttoseconds(youtubetime){
	var videoTime = Math.round(youtubetime);

	var minutes = Math.floor(videoTime / 60); 
	var seconds = videoTime - minutes * 60;

	seconds = seconds < 10 ? '0' + seconds : seconds;

	return (minutes + ":" + seconds);

}

// get current time in minutes:seconds format
function getvideoseconds(){
	var rawtime = player.getCurrentTime();
	return converttoseconds(rawtime);
}

// function getduration(){
// 	var duration = player.getDuration();
// 	console.log(converttoseconds(duration)); 
// }


function onYouTubeIframeAPIReady(){
	$('#loadthisurl').prop('disabled', false);
}

//	The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

//	This anonymous function makes the seconds nice
$(document).on('click', '#consoletime', function () {
	var prettyTime = getvideoseconds() 
	console.log(prettyTime);
});

var done = false;


//	The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		var videoTime = event.target.getCurrentTime();
	}
}

function stopVideo() {
	player.stopVideo();
}

