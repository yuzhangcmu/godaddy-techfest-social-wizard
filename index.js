var numTodo = 0;
var porkManUrl;
$( document ).ready(function() {
  console.log( 'ready!' );
  //localStorage.clear();
  $("#scriptBox").keypress(myFunction);
  $.ajax( {
    type:'Get',
    dataType: 'json',
    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/reviews',
    success:function(data) {
      //console.log(data);
      parseData(data, false);
      $('#review-loader').hide();
    }
  });
  $.ajax( {
    type:'Get',
    dataType: 'json',
    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/info',
    success:function(data) {
      document.getElementById('yelp-num-value').innerText = data.data.review_count;
      //console.log("business info");
      //console.log(data.data);
      //console.log('latitde:');
      var latitude = data.data.location.coordinate.latitude;
      var longitude = data.data.location.coordinate.longitude;
      //console.log(data.data.location.coordinate.latitude);
      //console.log(data.data.location.coordinate.longitude);
      //console.log('longti:');
      porkManUrl = "https://pokevision.com/#/@";
      porkManUrl += latitude + ",";
      porkManUrl += longitude;
      //console.log(porkManUrl);
      $('#pokemen-link').attr("href", porkManUrl);
    }
  });
  //pop up window when click on the plus button
  //popUpWindow('plusModal', 'addbtn', 0);
  //popUpWindow('add_social_media_modal', 'to-add', 1);
  //closeWindow('plusModal', 'add_social_media_modal');
  showTime();
  //attachWidgetPicture();
  attachSocialMediaPicture();
  todoStatusSwitch();
  setInterval(loadNewReview, 5000);
  setInterval(showTime, 60000);
  //load to-dos
  if(localStorage["numTodo"]) {
    numTodo = localStorage["numTodo"];
  }
  deep_loop();
});
function loadNewReview() {
  //var d = new Date();
  //document.getElementById("demo").innerHTML = d.toLocaleTimeString();
  $.ajax( {
    type:'Get',
    dataType: 'json',
    url:'http://52.41.200.245:3000/api/yelp/techfests-diner-phoenix/lastreview',
    success:function(data) {
      //console.log(data);
      parseData(data, true);
      //$('#review-loader').hide();
      
      if(data.data) {
        console.log(data.data);
        console.log('Get new review:');
      }
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
function parseData(jsonData, inverse) {
  const data = jsonData.data;
  if (!data) {
    return;
  }
  for (var i = 0; i < data.length; i++) {
    var review = data[i];
    appendReview(review, inverse);
  }
}
function appendReview(review, inverse) {
  //console.log('appendReview:');
  //console.log(review);
  if(review.avatarLink.indexOf('default_avatars/user_60_square.png') > -1){
    var nameInitial = review.author.charAt(0).toUpperCase();
    var color = '#' + intToRGB(hashCode(review.author))
    var avatarDiv = document.createElement('span');
    avatarDiv.innerHTML = nameInitial;
    avatarDiv.setAttribute('class', 'review-avatar');
    avatarDiv.setAttribute('style', 'background-color:' + color);
  } else {
    var pic = document.createElement("IMG");
    pic.setAttribute("src", 'http://' + review.avatarLink);
    pic.setAttribute("class", "profile-pic");
  }
  var className = 'review-content';
  if (isNegtiveReview(review)) {
    className += ' review-highlight';
    //console.log('get a bad review');
    var badReviewNum = parseInt(document.getElementById('review-tile-badge').innerText);
    //console.log('bad reviews number');
    //console.log(badReviewNum);
    document.getElementById('review-tile-badge').innerText = badReviewNum + 1;
  }
  var content = $('<div/>', {
    class: className,
    html: null
  });
  var line1 = $('<div/>', {
    class: 'review-line1',
    html: avatarDiv || pic
  });
  var reviewAuthor = document.createElement("span");
  reviewAuthor.innerHTML = review.author;
  reviewAuthor.setAttribute("class", 'review-author');
  var reviewComment = document.createElement("div");
  reviewComment.innerHTML = review.comment;
  reviewComment.setAttribute("class", 'review-comment');
  reviewComment.setAttribute("id", review.commentId);
  line1.append(avatarDiv || pic);
  line1.append(reviewAuthor);
  if (isNegtiveReview(review)) {
    var replyButton = document.createElement("button");
    replyButton.innerHTML = 'respond';
    replyButton.style.float = 'right';
    replyButton.setAttribute("class", 'reply-btn');
    replyButton.setAttribute('target', '_blank');
    replyButton.onclick = function() {
      window.open(
        'https://www.yelp.com/biz/techfests-diner-phoenix',
        '_blank' // <- This is what makes it open in a new window.
      );
    };
    reviewComment.appendChild(replyButton);
  }
  content.append(line1);
  content.append(reviewComment);
  const htmlContent = $('<div/>', {
    class: 'reviews-list',
    html: content
  });
  //reviewComment.addEventListener('click', function(event) {
  //  alert( "Handler for .click() called." + event.target.id );
  //  console.log(event.target);
  //});
  if(inverse) {
    $("#latest-reviews-content").prepend(htmlContent);
  } else {
    $("#latest-reviews-content").append(htmlContent);
  }

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
function deep_loop()
{
  var ul = document.getElementById("myList");
  ul.innerHTML = '';
  for (var key in localStorage)
  {
    if(key*1 != key) continue;
    //var flag = key.search("-");
    var node = document.createElement("LI");
    var spannode = document.createElement("span");
    spannode.innerHTML = JSON.parse(localStorage[key]).value;
    //if(flag >= 0)
    //{node.appendChild("<h1>"+textnode+"</h1>");}
    //else
    //{
      var checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'todo-checkbox');
      checkbox.setAttribute('tab', key);
      if(JSON.parse(localStorage[key]).completed) {
        checkbox.setAttribute('checked', 'checked');
        spannode.classList.add("completed");
      }
      node.appendChild(checkbox);
      node.appendChild(spannode);
    //}
    node.id = 'li' + key;
    var btn = document.createElement("BUTTON");
    btn.setAttribute('tab', key);
    btn.setAttribute('class', 'button cycle-button');
    btn.innerHTML = "x";
    node.appendChild(btn);
    document.getElementById("myList").appendChild(node);
  }
}
function todoStatusSwitch(){
  $(document).on('click', '.todo-checkbox', function(event){
    var spannode = $(this).next('span');
    var index = $(this).attr('tab');
    var todoTmp = JSON.parse(localStorage[index]);
    if(spannode.hasClass('completed')){
      spannode.removeClass('completed');
      todoTmp['completed'] = false;
    }
    else{
      spannode.addClass('completed');
      todoTmp['completed'] = true;
    }
    localStorage.setItem(index, JSON.stringify(todoTmp));
  });
  $(document).on('click', '.cycle-button', function(event){
    var index = $(this).attr('tab');
    localStorage.removeItem(index);
    deep_loop();
  });
}
function myFunction(e)
{
  if (e.keyCode == 13)
  {
    var tb = document.getElementById("scriptBox");
    localStorage.setItem(numTodo.toString(), JSON.stringify({
      value: tb.value,
      completed: false
    }));
    numTodo++;
    localStorage.setItem("numTodo", numTodo);
    document.getElementById("scriptBox").value = '';
    deep_loop();
  }
}
