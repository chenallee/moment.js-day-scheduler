var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//display current date
$currentDay.text(currentDate); 

//add style to time blocks to show where we are in the day
$timeBlocks.each(function(){
  var $thisBlock = $(this);
  var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

  if( thisBlockHr == currentHour){
    $thisBlock.addClass("present").removeClass("past future");
  }
  if (thisBlockHr < currentHour){
    $thisBlock.addClass("past").removeClass("present future");
  }
  if (thisBlockHr > currentHour){
    $thisBlock.addClass("future").removeClass("past present");
  }
});

/*var todos = localStorage.getItem("todos");
var parsedTodos = JSON.parse(todos);
console.log(parsedTodos);*/
function initializeTodos(){
  //just in case we want to update with more timeblock, i will not hardcode timeblocks num here
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var toDoObject = {};
    toDoObject.hour = parseInt($thisBlock.attr("data-hour"));
    toDoItems.push(toDoObject);
  }); //this might not be the best bc this is will be set if theres nothing in local storage... but if there IS something in local storage.

  localStorage.setItem("todos", JSON.stringify(toDoItems));
  //console.log(toDoItems);
}

function renderSchedule(){
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //loop thru array then assign the text to the timeBlock with data-hour equal to hour. 
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
    console.log(itemHour + "|" + itemText);
  }

}

function saveHandler(){
//event.preventDefault();
if (event.target.matches("button")){

  var hourToUpdate = event.target.parentElement.getAttribute("data-hour");
  var itemToAdd = (($(event.target).parent()).children("textarea")).val();
  //i was having issues bc i was mixing javascript selectors with jquery functions... lets fix his

  //see which item we need to update based on the hour of the button clicked matching
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}
  
  //console.log(toDoItems);
}

//add event listener to buttons
$().ready(function(){
  //initializeTodos();
  renderSchedule();
  $scheduleArea.click(saveHandler);
  
});
