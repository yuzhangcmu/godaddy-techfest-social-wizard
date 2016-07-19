$( document ).ready(function() {
  console.log( "ready!" );

  var appendContent = $('<div/>', {
    className: 'foobar',
    html: "review 1"
  });

  // threadhold: -0.1
  appendReview('0', "review 0", 0, 5);

  console.log( "end!" );
});

function appendReview(id, content, score, stars) {
  const htmlContent = $('<div/>', {
    className: "review" + id,
    html: content
  });

  $("#latest-reviews").append(htmlContent);
}