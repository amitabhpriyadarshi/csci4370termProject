/**
 * Application javascript file
 */

$(function(){
	$('#myButton').on('click', function(){
		alert('IT WORKS');
	});
	$('button').on('click', function(){
		alert($(this).text() + " clicked.");
	})
	
	$('#startDate').datepicker();
	$('#endDate').datepicker();
})