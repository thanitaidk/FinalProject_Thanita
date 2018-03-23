var timer;
var pause = false;
var isCarLocked = true; // the car is locked from the beginning
var tapCounter = 0;
var longPause = 800; // pause after first tap
var longTap = 2000; // time margin for second tap
var shortTap = 800; // time margins for quick taps
var errorMessagePause = 1500; // for how long error message is up


function onDocumentReady() {
  var tapArea = document.getElementById("tapArea");
  var errorMessage = document.getElementById("errorMessage");
  // errorMessage.style.display = "none"; 
  tapArea.addEventListener('pointerup', onPointerUp);
  tapArea.addEventListener('pointerdown', onPointerDown);
}
function resetValues() {
  clearTimeout(timer);
  pause = false;
  tapCounter = 0;
  errorMessage.style.display = "none";
}
function hideErrorMessage(){
  tapArea.style.backgroundColor = "lightgray"; 
  tapArea.style.display = "block";
  //console.log("tapArea")
  errorMessage.style.display = "none";
  }
  function showErrorMessage(){
  //console.log(pause);
  resetValues();
  tapArea.style.display = "none";
  errorMessage.style.display = "block";
  //clearTimeout(timer);
  timer = setTimeout(hideErrorMessage, errorMessagePause);
}
function setTimer() {
  console.log("pause ended");
  //clearTimeout(timer);
  timer = setTimeout(showErrorMessage, longTap);
  pause = false;
}


document.body.style.backgroundColor = "red";

function onPointerUp() {
  console.log("up");
  tapArea.style.backgroundColor = "lightgray";
}

function onPointerDown() {
  //tapCounter++; //??
  console.log(tapCounter);
  tapArea.style.backgroundColor = "white";

  if (pause == true && tapCounter++){
    clearTimeout(timer);
    resetValues();
    console.log("reset");
    showErrorMessage();
}
  if (pause == false && isCarLocked == true) {
    console.log("locked");

    if (tapCounter == 0) {
    console.log("1st tap");
    timer = setTimeout(setTimer, longPause);
    pause = true;
    tapCounter++;
    } 
    else if (tapCounter < 3) {
    console.log(tapCounter);
    clearTimeout(timer);
    timer = setTimeout(showErrorMessage, shortTap);
    tapCounter++;
    }    
    else if (tapCounter == 3) {
      clearTimeout(timer);
      resetValues();
      //alert("You unlocked the car.");
      checkCar();
    }        
  }

  if (pause == false && isCarLocked == false) {
    console.log("not locked");

    if (tapCounter == 0) {
      timer = setTimeout(setTimer, longPause);
      pause = true;
      tapCounter++;
      } 
      else if (tapCounter < 1) {
      console.log(tapCounter);
      clearTimeout(timer);
      timer = setTimeout(showErrorMessage, shortTap);
      console.log("short tap");
      tapCounter++;
      }    
      else if (tapCounter == 1) {
        clearTimeout(timer);
        resetValues();
        //alert("You locked the car.");
        checkCar();
      }      
  }  
}


function checkCar() {  
  console.log("checkin car");

  if (isCarLocked == true) {
    document.body.style.backgroundColor = "green";
    console.log("car is unlocked");
    isCarLocked = false;
  }
  else if (isCarLocked == false) {
    document.body.style.backgroundColor = "red";
    console.log("car is locked");
    isCarLocked = true;
  }
  
}








if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);