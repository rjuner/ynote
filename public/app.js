// when you click the addurl button
$(document).on('click', '#addurl', function(){

  console.log("I'm working!");

  var mainurl = $('#usercomment').val()

  var thisistheid = linkifyYouTubeURLs(mainurl);
  makePlayer(thisistheid);

  $.ajax({
    type: "POST",
    dataType: "json", 
    url: '/submit', 
    data: {
      yt_url: $('#usercomment').val(),
      duration: '3:24', 
      yt_id: 'TBXv37PFcAQ'
    }
  }).done(function(data){
    console.log(data);
    $('#usercomment').val("");
  });
});



function linkifyYouTubeURLs(text) {
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    return re.exec(text)[1];
}

 // 'https://www.youtube.com/watch?v=BcsfftwLUf0'

// $('#loadthisurl').on("click", function(event) {
//   // debugger;
//   var mainurl = $('#mainurl').val()

//   var thisistheid = linkifyYouTubeURLs(mainurl);
//   makePlayer(thisistheid);
// });