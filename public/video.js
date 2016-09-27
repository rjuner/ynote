// 2. This code loads the IFrame Player API code asynchronously.
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


function onYouTubeIframeAPIReady(){
	$('#loadthisurl').prop('disabled', false);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

//This anonymous function jumps to 13:37 when you click the button
$(document).on('click', '#jumpTo', function () {
	var prettyTime = getvideoseconds() 
	console.log(prettyTime);
});


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

//var ytTime;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		var videoTime = event.target.getCurrentTime();

		// console.log(videoTime);

		//Below shows the time you're at at the video. 
		
		// var currentTime = $("#currentTime").text(minutes + ":" + seconds);

		// $("#addedTime").append(minutes + ":" + seconds);

		//setTimeout(stopVideo, 6000);
		//done = true;
	}
}

function stopVideo() {
	player.stopVideo();
}

