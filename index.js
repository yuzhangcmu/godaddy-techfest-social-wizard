$( document ).ready(function() {
  console.log( "ready!" );

  var appendContent = $('<div/>', {
    className: 'foobar',
    html: "review 1"
  });

  $("#latest-reviews").append(appendContent);

  console.log( "end!" );
});