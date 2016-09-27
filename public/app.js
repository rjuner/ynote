// // when you click the addurl button
// $(document).on('click', '#addurl', function(){

//   console.log("I'm working!");

//   $.ajax({
//     method: "POST", 
//     url: "/submit/", 
//     data: {
//       url: $('#usercomment').val(), 
//       duration: '8:50',
//       comment: 'testcomment'
//     }
//   }).done(function(data){
//     console.log(data);
//     $('#usercomment').empty();
//   });

// });