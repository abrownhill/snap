// Stop browser scrolling
document.body.addEventListener("touchmove", function(event) {
  event.preventDefault();
});

// This is how to add a comment in JavaScript
// alert("Hello World");

// Define images to use
var imgArray = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f3/PeterRabbit7.jpg",  
  "https://pixabay.com/static/uploads/photo/2015/01/30/10/49/raisins-617416_960_720.jpg", 
  "https://pixabay.com/static/uploads/photo/2015/08/04/18/40/baby-875085_960_720.jpg", 
  "http://clipartion.com/wp-content/uploads/2015/11/banana-clipart-free-clip-art-images.jpg",
  "http://9417-presscdn-0-52.pagely.netdna-cdn.com/wp-content/uploads/2013/07/how-to-clean-bath-toys-rubber-duck.jpg"
];

// Create variables for random numbers
var num1;
var num2;

// Create object for Player 1
var player1 = {
  score: 0,
  id: 1,
};

// Create object for Player 2
var player2 = {
  score: 0,
  id: 2,
};

// Create snapMade variable
var snapMade = "NO";

// Use jQuery 'click' function so h1 starts play
$("h1").click(function() {
  // Run play function
  play();
  // Use jQuery 'hide' function to hide h1 when it has been pressed
  $("h1").hide();
  // Use jQuery 'show' function to show p's when play is started
  $("p").show();
});

// Create variables for canvas 1 & 2
var canvas1 = document.getElementById("1");
var canvas2 = document.getElementById("2");

// Create event listeners for canvas 1 & 2
canvas1.addEventListener("touchstart", playTouch1);
canvas2.addEventListener("touchstart", playTouch2);

// User taps canvas1
function playTouch1() {
  // Test touch is registered
  //alert("Player 1 Touch!");
  // Run snapCheck to see if there is a snap!
  if (snapMade == "NO") {
    snapCheck(player1);}
};

// User taps canvas2
function playTouch2() {
  // Test touch is registered
  //alert("Player 2 Touch!");
  // Run snapCheck to see if there is a snap!
  if (snapMade == "NO") {
    snapCheck(player2);
  }
};

// Create play function - mine
function play() {
   // Check is there is a winner??
  if (isTheWinner(player1) || isTheWinner(player2)) {
    return
  } else {
    
  // Reset snapMade
  snapMade = "NO";
  
  // Randomly change number
  num1 = Math.floor( Math.random() * imgArray.length );
  num2 = Math.floor( Math.random() * imgArray.length );

  // Test random numbers
  // console.log("First random number is " +num1);
  // console.log("Second random number is "+num2);

  // Create image variables
  var img1 = imgArray[ num1 ];
  var img2 = imgArray[ num2 ];

  // Create css value for background image
	//  var url1 = "url("+ path + img1 +")";
	//  var url2 = "url("+ path + img2 +")";
  var url1 = "url("+ img1 +")";
  var url2 = "url("+ img2 +")";
  
  // Use jQuery to change css background image of canvas 1 & 2
  $("canvas#1").css("background-image", url1);
  $("canvas#2").css("background-image", url2);

  // Repeat loop every 2000 milliseconds
	setTimeout(play, 2000);
  
  // Reset player p backgrounds
  $("p").css("background", "yellow");
  } // isTheWinner logic ends here

} // play function ends here

// Find out if there was a snap
function snapCheck(player) {
  if (num1 == num2) {
    // Images Match! Snap!
    alert("SNAP!" + player.id);
    // player gets a point
    player.score++;
    $("span#score"+player.id).html(player.score);
    // Highlight player won!
    $("p#player"+player.id).css("background", "LightGreen");
    // Snap Made! - This prevents more than one player claiming SNAP for a pair of pictures
    snapMade = "YES";
  } else {
    // Images do not match!
    alert("NO SNAP!" + player.id);
    // player loses a point
    player.score--;
    $("span#score"+player.id).html(player.score);
    // Highlight player lost a point
    $("p#player"+player.id).css("background", "DeepPink");
  }
}

// Has a player won?
function isTheWinner(player) {
  // If player reaches a score of 3 points they win!!
  if(player.score == 3) {
    $("p").hide();
    $("h1").html("PLAYER " + player.id + " WINS!");
    $("h1").show();
    // Tell play function there is a winner!
    return true
  }
  // Tell play function there is no winner
  return false
}