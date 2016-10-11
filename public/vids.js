$(document).ready(function(){

	function getResults(){
		// empty any results currently on the page
		$('#results').empty();
		// grab all of the current notes
		$.getJSON('/all', function(data) {
		// for each note...
		for (var i = 0; i<data.length; i++){
		// ...populate #results with a p-tag that includes the note's title
		// and object id.
		$('#results').prepend('<p class="dataentry" data-id=' +data[i]._id+ '><span class="dataTitle" data-id=' +data[i]._id+ '>' + data[i].title + '</span><span class=deleter>X</span></p>');
		}
		});
	}

});