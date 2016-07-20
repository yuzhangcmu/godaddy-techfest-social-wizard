$( document ).ready(function() {
  console.log( 'ready!' );

  $.ajax( {
    type:'Get',
    dataType: 'json',

    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/reviews',
    success:function(data) {
      console.log(data);
      parseData(data);
      $('#review-loader').hide();
    }
  });

  $.ajax( {
    type:'Get',
    dataType: 'json',

    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/info',
    success:function(data) {
      document.getElementById('yelp-num-value').innerText = data.data.review_count;
    }
  });

  //pop up window when click on the plus button
  //popUpWindow('plusModal', 'addbtn', 0);
  //popUpWindow('add_social_media_modal', 'to-add', 1);
  //closeWindow('plusModal', 'add_social_media_modal');

  showTime();
  attachWidgetPicture();
  attachSocialMediaPicture();

  setInterval(loadNewReview, 5000);
});

function loadNewReview() {
  //var d = new Date();
  //document.getElementById("demo").innerHTML = d.toLocaleTimeString();
  $.ajax( {
    type:'Get',
    dataType: 'json',

    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/lastreview',
    success:function(data) {
      console.log(data);
      parseData(data);
      //$('#review-loader').hide();
      console.log('Get new review:');
      console.log(data);
    }
  });


}

function showTime(){
  var date = new Date;
  var minute = date.getMinutes();
  var hour = date.getHours();
  if(hour < 10){
    hour = '0' + hour;
  }
  if(minute < 10){
    minute = '0' + minute;
  }
  timestr = hour + ':' + minute;
  document.getElementById('herotime').innerHTML = timestr;
}

function parseData(jsonData) {
  const data = jsonData.data;

  if (!data) {
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var review = data[i];
    appendReview(review);
  }
}

function appendReview(review) {
  console.log('appendReview:');
  console.log(review);

  
  if(review.avatarLink.indexOf('default_avatars/user_60_square.png') > -1){
    var nameInitial = review.author.charAt(0).toUpperCase();
    var color = '#' + intToRGB(hashCode(review.author))
    var avatarDiv = document.createElement('span');
    avatarDiv.innerHTML = nameInitial;
    avatarDiv.setAttribute('class', 'review-avatar');
    avatarDiv.setAttribute('style', 'background-color:' + color);
  }
  else{
    var pic = document.createElement("IMG");
    pic.setAttribute("src", 'http://' + review.avatarLink);
    pic.setAttribute("height", "22");
    pic.setAttribute("width", "22");
    pic.setAttribute("class", "profile-pic");
  } 

  var content = $('<div/>', {
    //id: review.commentId,
    html: avatarDiv || pic
  });

  var reviewContent = document.createElement("span");
  var className = 'review-content';

  if (isNegtiveReview(review)) {
    className += ' review-highlight';
    console.log('get a bad review');
  }

  reviewContent.setAttribute("class", className);

  var reviewAuthor = document.createElement("span");
  reviewAuthor.innerHTML = review.author;
  reviewAuthor.setAttribute("class", 'review-author');

  var reviewComment = document.createElement("div");
  reviewComment.innerHTML = review.comment;
  reviewComment.setAttribute("class", 'review-comment');

  reviewContent.appendChild(reviewAuthor);
  reviewContent.appendChild(reviewComment);

  content.append(reviewContent);

  const htmlContent = $('<div/>', {
    class: 'reviews-list',
    //id: review.commentId,
    html: content
  });

  $("#latest-reviews-content").append(htmlContent);
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function isNegtiveReview(review) {
  return review.rating <= 2 || review.score <= -0.1;
}

function popUpWindow(modalId, buttonId, index) {
  // Get the modal
  var modal = document.getElementById(modalId);
  // Get the button that opens the modal
  var btn = document.getElementById(buttonId);
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[index];
  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
function closeWindow(modalId, modalId2) {
  var modal = document.getElementById(modalId);
  var modal2 = document.getElementById(modalId2);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    } else if (event.target == modal2) {
      modal2.style.display = "none";
    }
  }
}


function attachWidgetPicture() {
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
    };
    $("#addbtn").css('background-image', 'url(3-az.jpg)');
  }
}

function attachSocialMediaPicture() {
  var googleBtn = document.getElementById('addGooglePlusBtn');
  var btn = document.getElementById("to-add");

  googleBtn.onclick = function() {

    //disable the addBtn
    btn.onclick = function() {
      return false;
    };

    $("#to-add").css('background-image', 'url(2-az.jpg)');
  }
}
