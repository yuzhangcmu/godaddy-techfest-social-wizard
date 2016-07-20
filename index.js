$( document ).ready(function() {
  console.log( 'ready!' );

  var appendContent = $('<div/>', {
    className: 'foobar',
    html: 'review 1'
  });

  //$.ajax( {
  //  type:'Get',
  //  dataType: 'json',
  //  url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/reviews',
  //  success:function(data) {
  //    alert(data);
  //  }
  //});

  //pop up window when click on the plus button
  popUpWindow();

  attachPicture();

  console.log( "end!" );
  //$.ajax({
  //  type: 'Get',
  //  dataType: 'jsonp',
  //  url: 'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/reviews',
  //  success: function(data) { console.log(data); },
  //  error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown); console.log(textStatus); }
  //});

  const data = '{\"data\":[{\"id\":\"techfests-diner-phoenix\",\"commentId\":\"pW6FLeLXHxjVQEeKiu_D5A\",\"rating\":3,\"date\":\"2016-07-19\",\"comment\":\"Food was great but very small plates, not recommended for groups.\",\"avatarLink\":\"\/\/s3-media3.fl.yelpcdn.com\/assets\/srv0\/yelp_styleguide\/20983a63ea50\/assets\/img\/default_avatars\/user_60_square.png\",\"author\":\"Chelsea Q.\"}]}';

  parseData(data);
});

function parseData(data) {
  var jsonobj = JSON.parse(data);

  const jsonData = jsonobj.data;

  console.log( 'len!'  + jsonData.length);

  for (var i = 0; i < jsonData.length; i++) {
    console.log(jsonData[i].id);
    console.log(jsonData[i].commentId);
    console.log(jsonData[i].rating);
    console.log(jsonData[i].date);
    console.log(jsonData[i].avatarLink);
    console.log(jsonData[i].author);

    var review = jsonData[i];
    appendReview(review);
  }

  console.log( 'end!' );
}

function appendReview(review) {
  console.log( 'appendReview!' );

  var pic = document.createElement("IMG");
  pic.setAttribute("src", 'http://' + review.avatarLink);
  pic.setAttribute("width", "30");
  pic.setAttribute("width", "22");
  pic.setAttribute("class", "profile-pic");

  var content = $('<div/>', {
    id: review.commentId,
    html: pic
  });

  var reviewContent = document.createElement("span");
  reviewContent.setAttribute("id", "review-content");

  content.append("<span id='review-content'/>" + review.comment + "</span>");

  const htmlContent = $('<div/>', {
    class: 'reviews-list',
    id: review.commentId,
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
  };
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

function attachPicture() {
  var flareBtn = document.getElementById('addFlareBtn');
  var btn = document.getElementById("addbtn");

  flareBtn.onclick = function() {

    //disable the addBtn
    btn.onclick = function() {
        return false;
    };
    $("#addbtn").css('background-image', 'url(2-az.jpg)');
  };

  var weiboBtn = document.getElementById('addWeiboBtn');
  weiboBtn.onclick = function() {
    btn.onclick = function() {
        return false;
    }
    $("#addbtn").css('background-image', 'url(3-az.jpg)');
  }
}