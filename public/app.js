var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var myTimer; 


//  This code loads the IFrame Player API code asynchronously.
$(document).ready(function(){
		var userId;

		$.ajax({
				type: "GET",
				dataType: "json", 
				url: '/user', 
		}).then(function(response){
					 userId = response._id
				console.log("USER ID",userId);
				var tag = document.createElement('script');

				var current_video;

				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				//  global youtube player instance
				var player;

				// load actual player with id
				function makePlayer(id, url){
						if(player){
								player.stopVideo();
								console.log("i be player",player.a.src);
							 var newSrc = player.a.src.replace(linkifyYouTubeURLs(player.a.src), id);
							 player.a.src = newSrc;
							 console.log("new id: ",player.a.src, id)
							 $(document).trigger("src-change", [id]);
						} else {
								player = new YT.Player('player', {
										height: '360',
										width: '640',
										videoId: id,
										events: {
											'onReady': onPlayerReady,
											'onStateChange': onPlayerStateChange
										}
								});
						}
					 
				}

				function convertSecondsToReadableTime(time) {
					time = parseFloat(time);
					var mins = time/60;
					if(mins < 0) {
						mins = 0; 
					}
					var seconds = (mins - Math.floor(mins))*60;
					return mins + ":" + Math.floor(seconds);
				}

				// convert youtube time to minutes:seconds
				function converttoseconds(youtubetime){
					var videoTime = Math.round(youtubetime);

					var minutes = Math.floor(youtubetime / 60); 
					var seconds = videoTime - minutes * 60;

					seconds = seconds < 10 ? '0' + seconds : seconds;

					return (minutes + ":" + seconds);

				}

				$(document).on("src-change", function(event, videoID){
						// console.log("trigger?")
						$.ajax({
							type: "GET", 
							dataType: "json", 
							url: "/comments/getcomments/"+ videoID, 
						}).then(function(data){
								console.log(data);
								$('#comment_area').html("");
								if(data.comments){
									$('#comment_area').prepend(
										'<p class="comments_id" data-id="' + comments._id +'">' +'<span class="glyphicon glyphicon-ban-circle deleter" aria-hidden="true"></span>' + " " + comments.user.google.name + ': '+ 
										comments.comment + '   ' + 
										"<a class='jump' data-id='" + comments.timecode + "'>" + 
										getvideoseconds(comments.timecode) + "</a>" + "</p>"); 
								}
						});
				});

				// get current time in minutes:seconds format
				function getvideoseconds(timecode){
					return converttoseconds(parseFloat(timecode));
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



				// This creates the clickable links in the comment area
				$(document).on('click', 'a.jump', function(event){

					var linktojump = $(this).data("id");

					console.log;
					// console.log("I'm working!!!!");
					// console.log(event.target); 
					player.seekTo(linktojump, true);
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

						if(event.data==1) { // playing
								myTimer = setInterval(function(){ 
										var time;
										time = player.getCurrentTime();
										$("#timeHolder").text(getvideoseconds(time));
								}, 1050);
						} else { // not playing
								clearInterval(myTimer);

						}
				}

				function stopVideo() {
					player.stopVideo();
				}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

				//  takes YT url and gets ID
				function linkifyYouTubeURLs(text) {
						var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
						return re.exec(text)[1];
				}

				// when you click the addurl button
				// add to database
				
				$(document).on('click', '#addurl', function(){

					// console.log("I'm working!");

					var mainurl = $('#user_url').val()

					var thisistheid = linkifyYouTubeURLs(mainurl);
					makePlayer(thisistheid, mainurl);

						$.ajax({
								type: "POST",
								dataType: "json", 
								url: '/videos', 
								data: {
									yt_url: $('#user_url').val(),
									duration: 'duration', 
									yt_id: thisistheid 
								}
						}).done(function(data){
								// console.log("I'm the video: ",data);
								current_video = data._id;
								// $('#get_id').val(user._id);
								$('#user_url').val("");
								data.comments.forEach(function(comments){
									$('#comment_area').prepend(
										'<p class="comments_id" data-id="' + comments._id +'">' +'<span class="glyphicon glyphicon-ban-circle deleter" aria-hidden="true"></span>' + " " + comments.user.google.name + ': '+ 
										comments.comment + '   ' + 
										"<a class='jump' data-id='" + comments.timecode + "'>" + 
										getvideoseconds(comments.timecode) + "</a>" + "</p>"); 
								});
						});
				});

				// Adds the actual comments on screen & to database
				$('#add_comment').on('click', function(){

						// console.log("App.js adding a comment... ");
						
						var comment = $('#user_comment').val();
						$.ajax({
							type: "POST", 
							dataType: "json", 
							url: "/comments", 
							data: {
								timecode: player.getCurrentTime(), 
								comment: $('#user_comment').val(),
								video_id:  current_video,
								user: userId
							}
						}).then(function(data){
								$('#comment_area').html("");
								data.comments.forEach(function(comments){
									$('#comment_area').prepend(
										'<p class="comments_id" data-id="' + comments._id +'">' +'<span class="glyphicon glyphicon-ban-circle deleter" aria-hidden="true"></span>' + " " + comments.user.google.name + ': '+ 
										comments.comment + '   ' + 
										"<a class='jump' data-id='" + comments.timecode + "'>" + 
										getvideoseconds(comments.timecode) + "</a>" + "</p>"); 
								});
						});
				});





				//	Shows comment of object you click on
				$(document).on('click', '.comments_id', function(){
					// console.log("You're clicking on: ");
					// console.log($(this).data('id'));

					var selected = $(this);

					$.ajax({
						type: "GET",
						url: 'comments/find/' + selected.data('id'),
						success: function(data){
							// fill the inputs with the data that the ajax call collected
							$('#user_comment').val(data.comment);
							$('#actionbutton').html('<button class="updater" data-id="'+ data._id +'">Update</button>');
						}
					});
				});

				// Should delete the comment
				$(document).on('click', '.deleter', function(){

					var selected = $(this).parent(); 

					$.ajax({
						type: "GET", 
						url: '/comments/delete/' + selected.data('id'), 

						success: function(response){
							selected.remove(); 
						}
					})
				});

				$(document).on('click', '.updater', function(){
					var selected = $(this); 
					var updated_comment = $('#user_comment').val();


					// console.log("this is from THIS: ");
					// console.log(selected.data('id'));
					// console.log(selected);


					$.ajax({
						type: "POST", 
						url: '/comments/update/' + selected.data('id'), 
						dataType: "json", 
						data: {
							comment: $('#user_comment').val()
						}, 
						success: function(data){


							// console.log("this is from data omg: ");
							// console.log(data);
							// console.log($('p[data-id="' + selected.data('id') + '"'));
							// console.log("This is from the .attr: "); 

							$('p[data-id="' + selected.data('id') + '"').html('<span class="glyphicon glyphicon-ban-circle deleter" aria-hidden="true"></span>' + " " + data.user.google.name  + ': '+
										data.comment + '   ' + 
										"<a class='jump' data-id='" + data.timecode + "'>" + 
										getvideoseconds(data.timecode) + "</a>");
	

							// $(selected.data('id')).replaceWith('<p>'+ updated_comment + '</p>');


							// console.log(data.comments.find({_id:selected.data('id')}));

							// selected.remove();


						}
					});
				});

		});
}); // big document ready at the top ends
