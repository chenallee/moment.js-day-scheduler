var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
console.log(currentHour);
currentHour = 13;

$currentDay.text(currentDate); 

$timeBlocks.each(function(){
  var $thisBlock = $(this);
  console.log($thisBlock.attr("data-hour"));
  console.log(currentHour);
  
  if( $thisBlock.attr("data-hour") == currentHour){
    $thisBlock.addClass("present").removeClass("past future");
  }
  if ($thisBlock.attr("data-hour") < currentHour){
    $thisBlock.addClass("past").removeClass("present future");
  }
  if ($thisBlock.attr("data-hour") > currentHour){
    
    $thisBlock.addClass("future").removeClass("past present");
  }
});

// var thisMoment = moment().format();
// console.log(moment());
// console.log(thisMoment);