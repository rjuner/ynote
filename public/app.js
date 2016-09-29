//  This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

var current_video;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  global youtube player instance
var player;

// load actual player with id
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

//  The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  durationGetter();
}

function durationGetter(){

  var yt_duration = player.getDuration();
  console.log("Video duration : ");
  console.log(converttoseconds(yt_duration)); 

  return yt_duration;
}

$('#seekto').on('click', function(){
  console.log("I'm working!");
  player.seekTo(817.917613, true);
});

//  This anonymous function makes the seconds nice
$(document).on('click', '#consoletime', function () {
  var prettyTime = getvideoseconds();
  // console.log(prettyTime);
  $('#currenttime').append(prettyTime);
});




var done = false;


//  The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    var videoTime = event.target.getCurrentTime();
  }
}

function stopVideo() {
  player.stopVideo();
}

//+++++++++++++++++++++++++++++++++++++++++++

//  takes YT url and gets ID
function linkifyYouTubeURLs(text) {
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    return re.exec(text)[1];
}

// when you click the addurl button
// add to database

$(document).on('click', '#addurl', function(){

  console.log("I'm working!");

  var mainurl = $('#user_url').val()

  var thisistheid = linkifyYouTubeURLs(mainurl);
  makePlayer(thisistheid);

  $.ajax({
    type: "POST",
    dataType: "json", 
    url: '/submit', 
    data: {
      yt_url: $('#user_url').val(),
      duration: 'duration', 
      yt_id: thisistheid
    }
  }).done(function(data){
    console.log("I'm the video: ",data);
    current_video = data._id;
    $('#user_url').val("");
  });
});

// var current_video;



//  Click on "make comment" to grab video info from DB
// ????? Show associated comments

// $('#make_comment').on('click', function(){




// });



$('#add_comment').on('click', function(){

  console.log("Comment... ");

  var comment = $('#user_comment').val();

  $.ajax({
    type: "POST", 
    dataType: "json", 
    url: "/comment", 
    data: {
      timecode: "01:15", 
      comment: $('#user_comment').val(),
      video_id:  current_video
    }
  }).done(function(data){
    console.log("comment?",data);
    $('#comment_area').html("");
    data.comments.forEach(function(comments){
        $('#comment_area').prepend('<p>' + comments.comment + '</p>' + '</br>'); 

    });
  });
});

