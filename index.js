$( document ).ready(function() {
  console.log( "ready!" );

  var appendContent = $('<div/>', {
    className: 'foobar',
    html: "review 1"
  });

  // threadhold: -0.1
  appendReview('0', "review 0", 0, 5);

  //pop up window when click on the plus button
  popUpWindow();

  console.log( "end!" );
});

function appendReview(id, content, score, stars) {
  const htmlContent = $('<div/>', {
    className: "review" + id,
    html: content
  });

  $("#latest-reviews").append(htmlContent);
}

function popUpWindow() {
  // Get the modal
  var modal = document.getElementById('plusModal');
  // Get the button that opens the modal
  var btn = document.getElementById("addbtn");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}
