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
      duration: '3:24', 
      yt_id: 'TBXv37PFcAQ'
    }
  }).done(function(data){
    console.log(data);
    $('#user_url').val("");
  });
});


$('#add_comment').on('click', function(){

  console.log("Comment... ");

  var comment = $('#user_comment').val();

  $.ajax({
    type: "POST", 
    dataType: "json", 
    url: "/comment", 
    data: {
      timecode: "01:15", 
      video_obj_id: 'ObjectId("57eadcc43f9cf71a32e8610e")', 
      comment: "This comment is with 1:15"
    }
  }).done(function(data){
    console.log(data);
    $('#comment_area').prepend('<p>' + data.comment + '</p>' + '</br>'); 
  });
});

