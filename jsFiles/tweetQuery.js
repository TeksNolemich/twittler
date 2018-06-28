$(document).ready(function(){

  var $body = $('body');

  var length = streams.home.length - 1;
  //simply prints the first 10 'tweets' randomly
  var initiator = 0;

  var tweeterItself = function (tweetObj) {
    var $tweet = $('<div class="user" id='+tweetObj.user+'></div>');
    $tweet.html('@' + '<span class=handle id=' + tweetObj.user +'>'+tweetObj.user+'</span>' + ': ' + tweetObj.message +' '+  tweetObj.created_at );
    $tweet.appendTo($body);
  };

  while(initiator <= length){
    var tweet = streams.home[initiator];
    tweeterItself(tweet);
    initiator += 1;
  }


  var randomTweetCall = function() {
    if (initiator !== undefined && runner) {
      var allTweets = streams.home[initiator];
      // console.log(allTweets, streams.home,initiator,  '<= supposed inititiaof');
      if (streams.home.length >= 100) {
        return;
      } else {
        if (allTweets.user === undefined) { return; }
        tweeterItself(allTweets);
      }
    }
  }


  //reveal the function below in order to run the random generation of tweets;
  setInterval(function() {
    initiator += 1;
    randomTweetCall();
  }, 4000)

  

  // setInterval(randomTweetCall(start), 2000 );
  //allows the client to see the next random tweet by clicking the button 
  // $("#newTweet").click(function() {
  //   var $body = $('body');
  //   generateRandomTweet();
  //   var tweet = streams.home[streams.home.length - 1];
  //   var $tweet = $('<div class="user" id='+tweet.user+'></div>');
  //   $tweet.html('@' + '<span class=handle id='+ tweet.user +'>'+tweet.user+'</span>' + ': ' + tweet.message + ' '+ tweet.created_at);
  //   $tweet.appendTo('div.container');

  // });

  var runner = true;
  //allows the user to click on the user handle
  //only displays tweets written by the user handle that has been clicked
  $(document.body).on('click', 'span', function(e) {
    var allTweets = streams.home
    var clickedUser = e.target.id;
    runner = !runner;
    $('div.user:not(#'+clickedUser+')').toggle('slow');
    $('.inputs').toggle('slow');
    $('header > h2').text('@' +clickedUser).toggle('slow');
  });
  $('div.user').wrapAll('<div class="container"></div>');
  
  $("#submitTweet").click(function() {
    var visitorTweet = $(".textbox").val();
    if (visitorTweet !== '') {
      writeTweet(visitorTweet);
      $(".textbox").val('').blur();
    } else { return; }
    var theTweet = streams.users.visitor[(streams.users.visitor.length - 1)];
    tweeterItself(theTweet);
  });

});
