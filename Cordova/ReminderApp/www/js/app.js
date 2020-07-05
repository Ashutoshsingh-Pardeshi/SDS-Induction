//Bugs :-
// Why the jQuery() is not activating when reminder is enterted using the enter key ?
// How to nest select-lists ??
//should I count deletd reminders also in completedCount ?
//
//The function is ready, but how to deploy it ?
// userRepeat.addEventListener("mouseup", repeatClicked)
// function repeatClicked(){
//     selectedRepeat = document.getElementsByClassName("aux-input")[2].value   
//     if(selectedRepeat == "Daily" || selectedRepeat == "Weekly"){
//         dateButton.setAttribute("disabled : true")
//         //alert("Daily/Weekly selected !!")
//     } else if(selectedRepeat == "Once" || selectedRepeat == "Yearly"){
//         dayButton.setAttribute("disabled : true")
//         //alert("Once/Yearly selected !!")
//     }
// }
// 
// IF YOU ADD AN EMPTY REMINDER, THEN COUNT SHOWS SOME ERRORS
//Description not showing
//Add a fab button !!!

var addExtnBttn = document.getElementById("addExtensions")
    addRemBttn = document.getElementById("addReminder"),
    inputReminder = document.getElementById("input-reminder"),
    reminderList = document.getElementById("reminderList"),
    Extensions = document.getElementById("extensions"),
    extnDescription = document.getElementById("description"),
    dateButton = document.getElementById("dateButton"),
    timeButton = document.getElementById("timeButton"),
    dayButton = document.getElementById("dayButton");

var new_ionItem,
    new_ionLabel, // This conatins the text
    new_ionCard, // The card inside the ion-item
    smallbttns, // This is a span containing all the mini-buttons
    extn_body,  // The ion-list containing all the categories and description
    extn_bttns, // The ion-list containing the ion-items which inturn contains the big-buttons
    buttonItem // The big buttons

var deleteIcon, 
    completeIcon,
    modifyIcon,
    burgerIcon

var priorityItem, 
    categoryItem,
    repetitionItem,
    typeItem,
    timeItem,
    dateItem,
    dayItem,
    descriptionItem

// The following vars are generated to reset their values. We can reset the values by setting their 'value' attribute to either something or null
var ionSelectCategory = document.getElementById("ionSelectCategory"), 
    ionToggleFlag = document.getElementById("ionToggleFlag"),
    ionSelectRepeat = document.getElementById("ionSelectRepeat"),
    ionSelectType = document.getElementById("ionSelectType"),
    ionDatetime_Date = document.getElementById("ionDate"),
    ionDatetime_Day = document.getElementById("ionDay");


var selectedRepeat, // The selected value of repeat
     Category,   // The dictionary
     selectedCategory,   // The selected value 
     Type,   // The dictionary
     selectedType;   // The selected value 

var selectedDay,
    selectedTime,
    displayTime;

var displayScheduled = document.getElementById("displayScheduled"),
    displayCompleted = document.getElementById("displayCompleted"),
    displayAll = document.getElementById("displayAll"),
    displayFlagged = document.getElementById("displayFlagged"),
    countAll = 0,
    countCompleted = 0,
    countFlagged = 0,
    countScheduled = 0 // This ones a pretty tricky one !!

var bigModify;
var smallModify;

// The audio clip
var alarmSound = new Audio()
alarmSound.src = "alarm.mp3"
alarmSound.loop = "true"
var alarmTitle;
var alarmDescription;
var listIndex = 0;

//Initializing all the counts
displayScheduled.textContent = countScheduled ;
displayCompleted.textContent = countCompleted ;
displayAll.textContent = countAll ;
displayFlagged.textContent = countFlagged ;

//Showing the extensions 
addExtnBttn.addEventListener("click" ,function(){
    $(Extensions).slideToggle(500);
})

// If date is empty
async function emptyDateError(){
    const alert = await alertController.create({
    header : "You cannot leave the Date and Time feild empty !!",
    buttons : [
        {
            text : "Okay",
            role : "cancel"
        }
    ]
    })
    await alert.present()
}

// If input field is empty
async function emptyInputError(){
    const alert = await alertController.create({
    header : "You cannot leave the input feild empty !!",
    buttons : [
        {
            text : "Okay",
            role : "cancel"
        }
    ]
    })
    await alert.present()
}

//If input time belongs to past
async function invalidTimeError(){
    const alert = await alertController.create({
    header : "Invalid time and date entered !!",
    subHeader : "Please re-enter the date and time correctly. The reminder has been deleted.",
    buttons : [
        {
            text : "Okay",
            role : "cancel"
        }
    ]
    })
    await alert.present()
}

// Adding the events to the addRemBttn
addRemBttn.addEventListener("click" ,addReminder);
addRemBttn.addEventListener("click" ,jQuery)
addRemBttn.addEventListener("click" ,addPriority)
addRemBttn.addEventListener("click" ,addCategory)
addRemBttn.addEventListener("click" ,addRepeat)
addRemBttn.addEventListener("click" ,addType)
addRemBttn.addEventListener("click" ,addTime)
addRemBttn.addEventListener("click" ,addDay)
addRemBttn.addEventListener("click" ,setAlarm)
addRemBttn.addEventListener("click" ,addDescribtion)
addRemBttn.addEventListener("click" ,modification)
addRemBttn.addEventListener("click" ,modPriority)
addRemBttn.addEventListener("click" ,modCategory)
addRemBttn.addEventListener("click" ,modRepeat)
addRemBttn.addEventListener("click" ,modType)
addRemBttn.addEventListener("click" ,modTime)
addRemBttn.addEventListener("click" ,modDescription)

//This to hide the extension div, so that it does not remain open
addRemBttn.addEventListener("click" ,function(){
    $(Extensions).slideUp(500)
})

inputReminder.addEventListener("keypress", function(e){
    if(e.which == 13)
    {   // Carry out the following functions
        jQuery() && addReminder() && addPriority() && addCategory() && addRepeat() && addDescribtion() ;
    }
})

function addReminder ()
{
    //checking for a valid input
    if(!(inputReminder.value) || !(document.getElementsByClassName("aux-input")[4].value))
    // if(!(inputReminder.value) )
    {
        emptyInputError();
        emptyDateError();
        return;
    }

    //Assigning the title to the alarm
    alarmTitle = inputReminder.value

    //creating the new ion-item
    new_ionItem = document.createElement("ion-item");
    new_ionLabel = document.createElement("ion-label")
    new_ionCard = document.createElement("ion-card");
    new_ionLabel.textContent = inputReminder.value
    new_ionItem.appendChild(new_ionLabel)
    new_ionItem.classList.add("newItem")
    new_ionItem.setAttribute("lines", "none")

    smallbttns = document.createElement("span");
    
    //appending delete icon, modify icon,undo icon, complete icon and the burger i.e. minibar
    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="delete"><ion-icon name="trash-outline" size="large" style="height:28px;color:red"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="modify"><ion-icon name="pencil-sharp" size="large" style="height:28px;color:darkorange"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="complete"><ion-icon name="checkmark-done" size="large" style="height:28px;color:green"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0, width:32px" fill="clear" class="undo"><ion-icon name="sync-outline" size="large" style="height:28px;color:blue;"></ion-icon></ion-button>')
    $($(smallbttns).children()[3]).css({"display" : "none"}) // To hide the undo button
    $(smallbttns).css({"display" : "none"}) // To hide the button-span

    new_ionItem.appendChild(smallbttns);

    // Fab button
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="fab"><ion-icon name="caret-back-circle-outline" size="large" style="height:28px"></ion-icon></ion-button>')

    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="menu" size="large" style="height:28px"></ion-icon></ion-button>')

    //Creating the extension list
    extn_list = document.createElement("ion-list")
    $(extn_list).css({"display" : "none"})
    extn_body = document.createElement("ion-list") //This will contain all the details
    extn_bttns = document.createElement("ion-list") //This will contai all the buttons

    // Creating the big buttons    
    buttonItem = document.createElement("ion-item");
    buttonItem.setAttribute("lines", "none")
    $(buttonItem).append('<ion-button class="delete" fill="outline" color="danger" slot="start" style="margin:0 3px; height: 35px; width: 95px;"> <h6 style="margin:0;color:red;">Delete</h6></ion-button>')

    $(buttonItem).append('<ion-button class="modify" fill="outline" color="warning" slot="start" style="margin:0 3px; height: 35px; width: 95px;"> <h6 style="margin:0;color:darkorange;">Modify</h6></ion-button>')

    $(buttonItem).append('<ion-button class="complete" fill="outline" color="success" slot="start" style="margin:0 3px; height: 35px; width: 105px;"> <h6 style="margin:0;color:green">Complete</h6></ion-button>')

    $(buttonItem).append('<ion-button class="undo" fill="outline" color="primary" slot="start" style="margin:0 3px; height: 35px; width: 105px;"> <h6 style="margin:0;color:lightseagreen">Undo</h6></ion-button>')
    $($(buttonItem).children()[3]).css({"display" : "none"})

    extn_bttns.appendChild(buttonItem)

    // First adding the extn_body, then adding the extn_bttns
    extn_list.appendChild(extn_body)
    extn_list.appendChild(extn_bttns)


    //Appending the name/title(new_ionItem) and the describtion(extm_item) to the card
    new_ionCard.appendChild(new_ionItem)
    new_ionCard.appendChild(extn_list)
    $(new_ionCard).append('<p>' + listIndex + '</p>')
    $($(new_ionCard).children()[2]).css({display : "none"})
    listIndex++;

    //Appending the final card to the list
    reminderList.appendChild(new_ionCard)

    //Adding alarm message
    alarmDescription = extnDescription.value

    //Resetting the text values
    inputReminder.value = "";
    ionSelectCategory.value = "General";
    ionToggleFlag.setAttribute("checked","false")
    ionSelectRepeat.value = "Once";
    ionSelectType.value = "Alarm";
    ionDatetime_Date.value = "";
    ionDatetime_Day.value = "";

    //Updating the countAll
    countAll += 1;

    // Updating countFlagged
    if(document.getElementsByClassName("aux-input")[1].value == "on"){
        countFlagged += 1;
        displayFlagged.textContent = countFlagged;
    }

    if(countFlagged < 0)
    {
        countFlagged = 0 ;
        displayFlagged.textContent = countFlagged ;
    }

    //Updating all the counts
    displayAll.textContent = countAll ;
}

function addPriority(){
    priorityItem = document.createElement("ion-item")
    priorityItem.setAttribute("lines", "none")
    $(priorityItem).append('<ion-icon slot="start" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon><h4 style="margin: 0 auto; color:red ">IMPORTANT</h4> <ion-icon slot="end" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')

    extn_body.appendChild(priorityItem);

    if(!(document.getElementsByClassName("aux-input")[1].value)){
        $(priorityItem).css({"display" : "none"})
    }
    else if (document.getElementsByClassName("aux-input")[1].value == "on"){
        //The flag icon- if choosen by the user
        $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="flag-sharp" size="large" style="height:28px;color:red"></ion-icon></ion-button>')
    }
}

function addCategory(){
    categoryItem = document.createElement("ion-item")
    categoryItem.setAttribute("lines", "inset")

    selectedCategory = document.getElementsByClassName("aux-input")[0].value
    Category = {
        "General" : '<ion-icon slot="start" size="large" style="margin:0" name="apps-outline"></ion-icon><h6 style="margin-left:20px">General</h6>',

        "Home" : '<ion-icon slot="start" size="large" style="margin:0" name="home-outline"></ion-icon><h6 style="margin-left:20px">Home</h6>',

        "Work" : '<ion-icon slot="start" size="large" style="margin:0" name="folder-outline"></ion-icon><h6 style="margin-left:20px">Work</h6>',

        "Personal" : '<ion-icon slot="start" size="large" style="margin:0" name="person-outline"></ion-icon><h6 style="margin-left:20px">Personal</h6>',

        "Birthday" : '<i class="fas fa-birthday-cake" style="font-size:29px;color: #585555c7;margin-left:5px"></i><h6 style="margin-left:20px">Birthday</h6>',

        "Fest" : '<ion-icon slot="start" size="large" style="margin:0" name="calendar-outline"></ion-icon><h6 style="margin-left:20px">Festival / Holiday</h6>'
    }

    $(categoryItem).append(Category[selectedCategory])
    extn_body.appendChild(categoryItem)
    selectedCategory = "";
}

function addRepeat(){
    repetitionItem = document.createElement("ion-item")
    repetitionItem.setAttribute("lines", "inset")
    selectedRepeat = document.getElementsByClassName("aux-input")[2].value
    $(repetitionItem).append('<ion-icon slot="start" size="large" name="repeat" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedRepeat + '</h6>' )
            
    extn_body.appendChild(repetitionItem)
}

function addType(){
    typeItem = document.createElement("ion-item")
    typeItem.setAttribute("lines", "inset")
    selectedType = document.getElementsByClassName("aux-input")[3].value;
    Type = {
        "Alarm" : '<ion-icon slot="start" size="large" name="alarm-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Alarm ',

        "Notification" : '<ion-icon slot="start" size="large" name="notifications-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Notification '
    }

    $(typeItem).append(Type[selectedType])
    extn_body.appendChild(typeItem)
}

function addTime(){
    timeItem = document.createElement("ion-item");
    timeItem.setAttribute("lines", "inset")

    //Getting the time from the user
    selectedTime = new Date(document.getElementsByClassName("aux-input")[4].value);
    selectedTime.setSeconds(0)
    hours = selectedTime.getHours()
    minutes = selectedTime.getMinutes()
    year = selectedTime.getFullYear();
    month = selectedTime.toLocaleString('default', { month: 'long' })
    date = selectedTime.getDate();
    if(minutes < 10){
        minutes = ('0' + minutes)
    }
    if(hours == 0 ){
        displayTime = (hours+12) + ':' + minutes  + ' AM'
    }
    else if(hours < 12){
        displayTime = hours + ':' + minutes  + ' AM'
    }
    else if(hours > 12){
        displayTime = (hours-12) + ':' + minutes + ' PM'
    }
    else if( hours == 12 && minutes == 00 ){
        displayTime = hours + ':' + minutes  + ' Noon'
    }
    else if( hours == 12 && minutes > 0 ){
        displayTime = hours + ':' + minutes  + ' PM'
    }

    $(timeItem).append('<ion-icon slot="start" size="large" name="today-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + month + " " + date + ", " + year + " | " +displayTime + '</h6>');
    $(timeItem).append('<p id="timeChoosen">' + selectedTime + '</p>')
    $($(timeItem).children()[2]).css({display : "none"})
    displayTime = ""

    var Newdate = new Date()
    if (Newdate.getDate() == date && Newdate.getMonth() == selectedTime.getMonth() && Newdate.getFullYear() == year)
    { countScheduled ++; displayScheduled.textContent = countScheduled ; }
    extn_body.appendChild(timeItem)

}

function addDay(){
    dayItem = document.createElement("ion-item");
    dayItem.setAttribute("lines", "inset");
        
    //Getting the day from the user
    selectedDay = document.getElementsByClassName("aux-input")[5].value

    $(dayItem).append('<ion-icon slot="start" size="large" name="today-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">')
    $(dayItem).append( selectedDay + '</h6');

    extn_body.appendChild(dayItem)
    
    if(!(selectedDay)){ 
        $(dayItem).css({"display" : "none"})
    }
}

var allAlarms = []
var alertNum = 0 ;
var allTimers = [];
var timer = 0 ;
var temp = 0 ;

function setAlarm(){
    var Now = new Date();
    totalDiff = selectedTime.getTime() - Now.getTime();
    console.log("Time difference = ", totalDiff)
    console.log("selectTime = ", selectedTime)
    console.log("nowTime = ", Now)

    //   If selecte time has passed away
    if(isNaN(totalDiff) || totalDiff < 0 ){ 
        invalidTimeError();
        reminderList.lastChild.remove();
        return;
    }

    console.log(alarmDescription)
   // create an Alarm 
    var alert = document.createElement("ion-alert");
    alert.header = alarmTitle ,
    alert.message = alarmDescription ,
    alert.buttons = [
        {
            text : "Dismiss",
            role : "cancel",
            handler : () => {
                console.log("Stopped !!")
                alertNum ++ ;
                alarmSound.pause(); // This pauses the alarm
                alarmSound.currentTime = 0 // This sets the track to 0
            }
        },
        {
            text : "Snooze",
            handler : () => {
                console.log("Snoozed for 5 mins.")
                alarmSound.pause(); // This pauses the alarm
                alarmSound.currentTime = 0 // This sets the track to 0
                temp = alertNum
                setTimeout( function(){
                    document.body.append($(allAlarms)[temp]);
                    alarmSound.play();
                    setTimeout( function(){
                        $($(document.body).children()[3]).remove()
                        alarmSound.pause();
                        alarmSound.currentTime = 0
                    } , 5000)
                    return ($(allAlarms)[temp]).present()
                } , 300000)
                alertNum ++ ;
            }
        }
    ]
    allAlarms.push(alert);
    allTimers[timer] =  setTimeout( function(){
        document.body.append($(allAlarms)[alertNum]);
        alarmSound.play();
        return ($(allAlarms)[alertNum]).present()
    } , totalDiff)
    timer ++ ;
}


function addDescribtion(){ // DONE !!
    descriptionItem = document.createElement("ion-item")
    descriptionItem.setAttribute("lines", "inset")
    $(descriptionItem).append('<ion-icon slot="start" size="large" name="clipboard-outline" style="margin:0"></ion-icon>')
    // Importing the description text
    if(!(extnDescription.value)) { $(descriptionItem).append('<h6 style="margin: 0 20px"> --- </h6>') }
    else { $(descriptionItem).append( '<h6 style="margin: 0 20px">' + extnDescription.value + '</h6>') }

    extn_body.appendChild(descriptionItem)
    extnDescription.value = "";
}

function jQuery()
{
    // The burger button
    $($(new_ionItem).children()[3]).click(function(){
        // Fading out the mini-buttons
        $($(this).parent().children()[1]).fadeOut(100)
        // Fading out the fab button
        $($(this).parent().children()[2]).fadeToggle(500)

        // FadeToggling the extensionDescription ion-list
        $($(this).parent().parent().children()[1]).slideToggle(800)
    })

    // The fab button
    $($(new_ionItem).children()[2]).click(function(){
        // Sliding out the mini-buttons
        $($(this).parent().children()[1]).animate({width: 'toggle', height : "28.05px"})
        // Fading out the flag button for some space
        $($(this).parent().children()[4]).animate({width: 'toggle'})
    })

    // Mini-delete button
    $($($(new_ionItem).children()[1]).children()[0]).click(function(){
        $(this).parent().parent().parent().remove()
        //Removing the alarm
        var num = $($(this).parent().parent().parent().children()[2]).text()
        clearTimeout(allTimers[num]);
        // Count All
        countAll -- ;
        displayAll.textContent = countAll
        // Managing the schedule button
        var Newdate = new Date()
        var selectTime = $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[4]).children()[2].text()
        var date = selectTime.getDate();
        var year = selectTime.getFullYear();
        if (Newdate.getDate() == date && Newdate.getMonth() == selectedTime.getMonth() && Newdate.getFullYear() == year)
        { countScheduled --; displayScheduled.textContent = countScheduled ; }
    })

    // Mini-complete button
    $($($(new_ionItem).children()[1]).children()[2]).click(function(){
        $(this).parent().children(".modify, .complete").fadeOut(500, function(){
            $($(this).parent().children()[3]).fadeIn(800)
        })
        //Removing the alarm
        var num = $($(this).parent().parent().parent().children()[2]).text()
        clearTimeout(allTimers[num]);

        // Line through the title of the reminder
        $($($(this).parent().parent().parent().children()[0]).children()[0]).css({
            textDecoration : "line-through"
        })
        // Fading out and in the big buttons
        $($($(this).parent().parent().parent().children()[1]).children()[1]).children().children(".modify,.complete").fadeOut(500)
        $($($(this).parent().parent().parent().children()[1]).children()[1]).children().children(".undo").fadeIn(500)
        countCompleted += 1;
        displayCompleted.textContent = countCompleted ;
    })

    //Mini-undo button
    $($($(new_ionItem).children()[1]).children()[3]).click(function(){
        $(this).fadeOut(500, function(){
            $(this).parent().children(".modify, .complete").fadeIn(500)
        })
        $($($(this).parent().parent().parent().children()[0]).children()[0]).css({
            textDecoration : "none"
        })
        // Fading in and out the big-buttons
        $($($(this).parent().parent().parent().children()[1]).children()[1]).children().children(".modify,.complete").fadeIn(500)
        $($($(this).parent().parent().parent().children()[1]).children()[1]).children().children(".undo").fadeOut(500)
        countCompleted -= 1;
        displayCompleted.textContent = countCompleted ;
    })

    // Big-delete button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[0]).click(function(){
        $(this).parent().parent().parent().parent().remove()
        //Removing the alarm
        var num = $($(this).parent().parent().parent().parent().children()[2]).text()
        clearTimeout(allTimers[num]);
        // Count All
        countAll -- ;
        displayAll.textContent = countAll
        // Managing the schedule button
        var Newdate = new Date()
        var selectTime = $($($(this).parent().parent().parent().children()[0]).children()[4]).children()[2].text()
        var date = selectTime.getDate();
        var year = selectTime.getFullYear();
        if (Newdate.getDate() == date && Newdate.getMonth() == selectedTime.getMonth() && Newdate.getFullYear() == year)
        { countScheduled --; displayScheduled.textContent = countScheduled ; }
    })

    // Big-complete button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[2]).click(function(){
        // Line through the title of the reminder
        $($(this).parent().parent().parent().parent().children().children()[0]).css({
            textDecoration : "line-through"
        })
        //Removing the alarm
        var num = $($(this).parent().parent().parent().parent().children()[2]).text()
        clearTimeout(allTimers[num]);
        // Fading in Big nuttons
        $(this).parent().children(".modify, .complete").fadeOut(500, function(){
            // Fading in the Big-undo button
            $($(this).parent().children()[3]).fadeIn(800)
        })
        // Fading out and in the mini-buttons
        $($(this).parent().parent().parent().parent().children().children()[1]).children(".modify, .complete").fadeOut(500, function(){
            $(this).parent().children(".undo").fadeIn(500)
        })
        countCompleted += 1;
        displayCompleted.textContent = countCompleted ;
    })

    // Big-undo button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[3]).click(function(){
        // Fading out itself, fading in the Big-complete and -modify buttons 
        $(this).fadeOut(500, function(){
            $(this).parent().children(".modify, .complete").fadeIn(500)
        })
        // Removing line-through the title of the reminder
        $($(this).parent().parent().parent().parent().children().children()[0]).css({
            textDecoration : "none"
        })
        // Fading out and in the mini-buttons
        $($(this).parent().parent().parent().parent().children().children()[1]).children(".undo").fadeOut(500, function(){
            $(this).parent().children(".modify, .complete").fadeIn(500)
        })
        countCompleted -= 1; 
        displayCompleted.textContent = countCompleted ;
    })
}

// A helper function - to set attributes
function setAttributes(element, attribute) {
    for(var key in attribute) {
      element.setAttribute(key, attribute[key]);
    }
}

// All variables that are being used to carry out the modification process

// Name of the ion-items
var modifyRep,  
    modifyCat, 
    modifyDes, 
    modifyPri,
    modifyType,
    modifyTime,
    modifyDay

// Label of the input-text/select
var modifyIonLabelCat,  
    modifyIonLabelRep,  
    modifyIonLabelDes,  
    modifyIonLabelPri,
    modifyIonLabelType,
    modifyIonLabelTime,
    modifyIonLabelDay

// The respective okay buttons
var modifyBttnCat,  
    modifyBttnRep,  
    modifyBttnDes,  
    modifyBttnPri, 
    modifyBttnType,
    modifyBttnTime, 
    modifyBttnDay

// Calling psuedo-selectors from app.html
var modifySelectCategory = document.getElementById("modifySelectCategory"); 
var modifyTogglePri = document.getElementById("modifyToggleFlag");
var modifySelectRepeat = document.getElementById("modifySelectRepeat");
var modifySelectType = document.getElementById("modifySelectType");
var modifySelectTime = document.getElementById("modifyTime");
var modifySelectDay = document.getElementById("modifyDay");

// The input-object of the options
var modifyInputDes, 
    selectedCatValue,
    selectedRepValue,
    selectedTypeValue,
    selectedTimeValue,
    selectedDesValue,
    ipnut_1 = document.createElement("ion-input")
    
var modCount = 0;


function modification(){    
    //Big-modify button
    
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        // Fading out the big buttons
        $(this).parent().fadeOut(500)
        //Fading out the burger button
        $($($(this).parent().parent().parent().parent().children()[0]).children()[3]).fadeOut(500)
    })
    
    //Small-modify button
    
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){  
        // Fading in the ion-list that contains description list        
        $($(this).parent().parent().parent().children()[1]).fadeIn(500)
        
        //Fadding out the small_bttns span
        $(this).parent().fadeOut(500)
        //Fading out the fab-button
        $($(this).parent().parent().children()[2]).fadeOut(500)
        //Fading out the burger-button
        $($(this).parent().parent().children()[3]).fadeOut(500)

        //Fading out the big buttons
        $($($(this).parent().parent().parent().children()[1]).children()[1]).children().fadeOut(500)

    })

}

function modCategory(){
    var categoryVar = ""; // The temporary variable to store value of category selected 
    // Label
    modifyIonLabelCat = document.createElement("ion-label")
    labelAttr = {
        "position" : "floating",
        "aoutocapitalize" : "on"
    }
    setAttributes(modifyIonLabelCat, labelAttr)
    modifyIonLabelCat.textContent = "Enter modified text"; 

    // Okay button
    modifyBttnCat = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnCat, okayAttr)
    modifyBttnCat.textContent = "Okay"
    $(modifyBttnCat).css({"margin-top" : "13px"})
    
    // Creating the ion-item
    modifyCat = document.createElement("ion-item");
    
    // Calling the ion-select from app.html and appending it to the ion-item key-modifyCat.
    modifyCat.append(modifyIonLabelCat , modifySelectCategory, modifyBttnCat)

    // Big-modify-button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        //Getting the default value
        categoryVar = $($($($(this).parent().parent().parent().children()[0]).children()[1]).children()[1]).text()

        // Setting default value
        modifySelectCategory.setAttribute("value", categoryVar);

        //Removing the previous value the user had selected.
        $($($($(this).parent().parent().parent().children()[0]).children()[1]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[1]).append(modifyCat)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnCat).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedCatValue = modifySelectCategory.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append(Category[selectedCatValue])
            $($(this).parent().parent().children()[0]).remove()
            categoryVar = modifySelectCategory.value ; 
        })
    })

    //Small-modify-button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){  
        // Getting the default value
        categoryVar = $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[1]).children()[1]).text()

        //Setting the default-value
        modifySelectCategory.setAttribute("value", categoryVar)

        //Removing the previous value that the user had selected
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[1]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[1]).append(modifyCat)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnCat).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedCatValue = modifySelectCategory.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append(Category[selectedCatValue])
            $($(this).parent().parent().children()[0]).remove()
            categoryVar = modifySelectCategory.value ;
        })

    })
}

function modRepeat(){
    var repeatVar = ""; // The temporary variable to store value of repeat selected
    // Label
    modifyIonLabelRep = document.createElement("ion-label")
    labelAttr = {
        "position" : "floating",
        "aoutocapitalize" : "on"
    }
    setAttributes(modifyIonLabelRep, labelAttr)
    modifyIonLabelRep.textContent = "Enter modified text"; 

    // Okay button
    modifyBttnRep = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnRep, okayAttr)
    modifyBttnRep.textContent = "Okay"
    $(modifyBttnRep).css({"margin-top" : "13px"})

    // Creating the ion-item
    modifyRep = document.createElement("ion-item");    

    // Calling the ion-select from app.html and appending it to the ion-item key-modifyRep.
    modifyRep.append(modifyIonLabelRep, modifySelectRepeat, modifyBttnRep)

    //Big-modify-button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        // Getting the default value i.e. previous value
        repeatVar = $($($($(this).parent().parent().parent().children()[0]).children()[2]).children()[1]).text()

        //Setting the default value
        modifySelectRepeat.setAttribute("value", repeatVar);

        //Removing the previous value the user had selected.
        $($($($(this).parent().parent().parent().children()[0]).children()[2]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[2]).append(modifyRep)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnRep).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                //Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedRepValue = modifySelectRepeat.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="repeat" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedRepValue + '</h6>')
            $($(this).parent().parent().children()[0]).remove()
            repeatVar = modifySelectRepeat.value;
        })
    })

    //Small-modify-button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){ 
        //Getting the default, i.e. previous value
        repeatVar = $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[2]).children()[1]).text()

        //Setting the default value
        modifySelectRepeat.setAttribute("value", repeatVar);

        //Removing the previous value that the user had selected
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[2]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[2]).append(modifyRep)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnRep).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                //Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedRepValue = modifySelectRepeat.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="repeat" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedRepValue + '</h6>')
            $($(this).parent().parent().children()[0]).remove()
            repeatVar = modifySelectRepeat.value;
        })
    })
}

function modDescription(){
    var descriptionVar = ""; // The temporary variable to store the description given

    // Label
    modifyIonLabelDes = document.createElement("ion-label")
    labelAttr = {
        "position" : "floating",
        "aoutocapitalize" : "on"
    }
    setAttributes(modifyIonLabelDes, labelAttr)
    modifyIonLabelDes.textContent = "Enter modified text"; 

    // Okay button
    modifyBttnDes = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnDes, okayAttr)
    modifyBttnDes.textContent = "Okay"
    $(modifyBttnDes).css({"margin-top" : "13px"})

    // Input
    modifyInputDes = document.createElement("ion-input")

    // Creating the ion-item
    modifyDes = document.createElement("ion-item");    

    // Appending ... 
    modifyDes.append(modifyIonLabelDes, modifyInputDes, modifyBttnDes)

    //Big-modify-button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        //Getting the deault value
        descriptionVar = $($($($(this).parent().parent().parent().children()[0]).children()[6]).children()[1]).text()
        console.log(descriptionVar)
        //Setting the default value
        modifyInputDes.value = descriptionVar

        //Removing the previous value the user had selected.
        $($($($(this).parent().parent().parent().children()[0]).children()[6]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[6]).append(modifyDes)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnDes).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedDesValue = modifyInputDes.value
            if(!(selectedDesValue)) { 
                $(this).parent().parent().append('<h6 style="margin: 0 20px"> --- </h6>') 
            }
            else { 
                $(this).parent().parent().append( '<h6 style="margin: 0 20px">' + selectedDesValue + '</h6>')
            } 
            descriptionVar = selectedDesValue;
            $(this).parent().parent().append()
            $($(this).parent().parent().children()[1]).remove()
        })
    })

    //Small-modify-button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){  
        // Getting the default value
        descriptionVar = $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[6]).children()[1]).text()

        //Setting the default value
        modifyInputDes.value = descriptionVar

        //Removing the previous value that the user had selected
        // $($($(this).parent().parent().parent().children()[1]).children()[0]) = Ion-list-green
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[6]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[6]).append(modifyDes)
    
        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnDes).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedDesValue = modifyInputDes.value
            if(!(selectedDesValue)) { 
                $(this).parent().parent().append('<h6 style="margin: 0 20px"> --- </h6>') 
            }
            else { 
                $(this).parent().parent().append( '<h6 style="margin: 0 20px">' + selectedDesValue + '</h6>')
            } 
            descriptionVar = selectedDesValue;
            $(this).parent().parent().append()
            $($(this).parent().parent().children()[1]).remove()
        })
    })
}

function modType(){
    var typeVar = ""; // The temporary variable to store value of type selected
    //Label
    modifyIonLabelType = document.createElement("ion-label")
    labelAttr = {
        "position" : "floating",
        "aoutocapitalize" : "on"
    }
    setAttributes(modifyIonLabelType, labelAttr)
    modifyIonLabelType.textContent = "Enter modified text"; 

    //Okay button
    modifyBttnType = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnType, okayAttr)
    modifyBttnType.textContent = "Okay"
    $(modifyBttnType).css({"margin-top" : "13px"})

    // Creating the ion-item
    modifyType = document.createElement("ion-item")

    // Calling the ion-select from app.html and appending it to the ion-item modifyType
    modifyType.append(modifyIonLabelType, modifySelectType, modifyBttnType)

    //Big-modify button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        // Getting the default value i.e. previous value
        typeVar = $($($($(this).parent().parent().parent().children()[0]).children()[3]).children()[1]).text()
        //Setting the default value
        modifySelectType.setAttribute("value", typeVar)

        //Removing the previous Value the user had selected
        $($($($(this).parent().parent().parent().children()[0]).children()[3]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[3]).append(modifyType)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnType).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedTypeValue = modifySelectType.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="alarm-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedTypeValue + '</h6>')
            $($(this).parent().parent().children()[0]).remove()
            typeVar = modifySelectType.value;        
        })
    })

    //Small-modify button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){  
        //Getting the default, i.e. previous value
        typeVar = $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[3]).children()[1]).text()

        //Setting the default value
        modifySelectType.setAttribute("value", typeVar)

        //Removing the previous value that the user had selected
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[3]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[3]).append(modifyType)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnType).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                //Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedTypeValue = modifySelectType.value
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="alarm-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedTypeValue + '</h6>')
            $($(this).parent().parent().children()[0]).remove()
            typeVar = modifySelectType.value;
        })
    })

}

function modPriority(){
    var priorityVar = ""; // The temporary variable to store value of priority selected
    var temp;

    //Creating the ion-item
    modifyPri = document.createElement("ion-item")

    //Label
    modifyIonLabelPri = document.createElement("ion-label");
    modifyIonLabelPri.textContent = "Flag it"

    // Okay button
    modifyBttnPri = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnPri, okayAttr)
    modifyBttnPri.textContent = "Okay"
    $(modifyBttnPri).css({"margin-top" : "13px"})

    // Calling the ion-toggle from app.html and appending it to the ion-item-modifyPri.
    modifyPri.append(modifyIonLabelPri, modifyTogglePri, modifyBttnPri);

    //Big-modify-button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        // Getting the previous value
        temp = $($(this).parent().parent().parent().children()[0]).children()[0].getAttribute("style")
        if(temp == "display: none;"){ priorityVar = false ;}
        else { priorityVar = true}

        // Setting the previous value
        if(priorityVar){ 
            console.log("It is true")
            modifyTogglePri.setAttribute("checked" , "true")
        }
        else if(!(priorityVar)){
            console.log("It is false")
            modifyTogglePri.setAttribute("checked" , "false")
        }

        //Making the priority-item display to be visible
        $($($(this).parent().parent().parent().children()[0]).children()[0]).css({"display" : "block"})
        
        //Removing the previous value the user had selected.
        $($($($(this).parent().parent().parent().children()[0]).children()[0]).children()[0]).remove()
        $($($($(this).parent().parent().parent().children()[0]).children()[0]).children()[0]).remove()
        $($($($(this).parent().parent().parent().children()[0]).children()[0]).children()[0]).remove()

        // Removing the mini-flad icon
        $($($(this).parent().parent().parent().parent().children()[0]).children()[4]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[0]).append(modifyPri)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnPri).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger bttn
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            //Create the priority-item text
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon> <h4 style="margin: 0 auto; color:red ">IMPORTANT</h4><ion-icon slot="end" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')

            if($(this).parent().children()[1].getAttribute("aria-checked") == "true"){
                $(this).parent().parent().css({"display" : "block"})
                countFlagged += 1
                displayFlagged.textContent = countFlagged ;
                // Creating and appending the mini-flag icon to the mini-bar
                $($(this).parent().parent().parent().parent().parent().children()[0]).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="flag-sharp" size="large" style="height:28px;color:red"></ion-icon></ion-button>')
            }
            else if($(this).parent().children()[1].getAttribute("aria-checked") == "false") {
                $(this).parent().parent().css({"display" : "none"})
                countFlagged -= 1
                displayFlagged.textContent = countFlagged ;
                //Removing the mini-flag icon if the task is not flagged
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[4]).remove()
            }
            $(this).parent().remove();
            if(countFlagged < 0)
            {
                countFlagged = 0 ;
                displayFlagged.textContent = countFlagged ;
            }
        })
    })

    //Small-modify-button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){  
        // Getting the previous value
        temp = $($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0].getAttribute("style")
        if(temp == "display: none;"){ priorityVar = false ;}
        else { priorityVar = true}

        // Setting the previous value
        if(priorityVar){ 
            console.log("It is true")
            modifyTogglePri.setAttribute("checked" , "true")
        }
        else if(!(priorityVar)){
            console.log("It is false")
            modifyTogglePri.setAttribute("checked" , "false")
        }

        //Making the priority-item display to be visible
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0]).css({"display" : "block"})

        //Removing the previous value that the user had selected
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0]).children()[0]).remove()
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0]).children()[0]).remove()
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0]).children()[0]).remove()

        // Removing the mini-flad icon
        $($(this).parent().parent().children()[4]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[0]).append(modifyPri)
    
         //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnPri).click(function(){
            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttn
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                // Fading in the burger bttn
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            //Create the priority-item text
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon> <h4 style="margin: 0 auto; color:red ">IMPORTANT</h4><ion-icon slot="end" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')

            if($(this).parent().children()[1].getAttribute("aria-checked") == "true"){
                $(this).parent().parent().css({"display" : "block"})
                countFlagged += 1
                displayFlagged.textContent = countFlagged ;
                // Creating and appending the mini-flag icon to the mini-bar
                $($(this).parent().parent().parent().parent().parent().children()[0]).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="flag-sharp" size="large" style="height:28px;color:red"></ion-icon></ion-button>')
            }
            else if($(this).parent().children()[1].getAttribute("aria-checked") == "false") {
                $(this).parent().parent().css({"display" : "none"})
                countFlagged -= 1
                displayFlagged.textContent = countFlagged ;
                //Removing the mini-flag icon if the task is not flagged
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[4]).remove()
            }
            $(this).parent().remove();
        })
    })
}

function modTime(){
    var timeVar = "" // The temporary variable to store value of repeat selected
    
    // // Label       
    // modifyIonLabelTime = document.createElement("ion-label")
    // modifyIonLabelTime.textContent = "Select Date and Time"

    // Okay button
    modifyBttnTime = document.createElement("ion-button")
    okayAttr = {
        "size" : "small",
        "slot" : "end",
        "shape" : "round",
        "color" : "medium",
        "type" : "submit"
    }
    setAttributes(modifyBttnTime, okayAttr)
    modifyBttnTime.textContent = "Okay"
    $(modifyBttnTime).css({"margin" : "13px 0px 13px 20px"})


    // Making the ion-item
    modifyTime = document.createElement("ion-item")

    // Adding button attribute
    modifyTime.setAttribute("button" , "true")
    
    //Calling ion-date_time picker from app.html and appending it
    modifyTime.append(modifySelectTime , modifyBttnTime)
    $(modifySelectTime).css({ "padding" : "0"})

    //Big-modify button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
        // Getting the default value i.e. previous value
        timeVar = $($($($(this).parent().parent().parent().children()[0]).children()[4]).children()[2]).text()

        //Setting the previous value
        modifySelectTime.setAttribute("value", timeVar)

        //Removing the previous value the user had selected.
        $($($($(this).parent().parent().parent().children()[0]).children()[4]).children()[1]).remove()
        $($($($(this).parent().parent().parent().children()[0]).children()[4]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($(this).parent().parent().parent().children()[0]).children()[4]).append(modifyTime)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnTime).click(function(){
            //Removing the previous alarm
            var num = $($(this).parent().parent().parent().parent().parent().children()[2]).text()
            clearTimeout(allTimers[num]);

            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                //Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedTimeValue = new Date(modifySelectTime.value);
            selectedTimeValue.setSeconds(0)
            var hours = selectedTimeValue.getHours(),
                minutes = selectedTimeValue.getMinutes(),
                year = selectedTimeValue.getFullYear(),
                month = selectedTimeValue.toLocaleString('default', { month: 'long' }),
                date = selectedTimeValue.getDate(),
                displayTime;

            if(minutes < 10){
                minutes = '0' + minutes
            }
            if(hours == 0 ){
                displayTime = (hours+12) + ':' + minutes  + ' AM'
            }
            else if(hours < 12){
                displayTime = hours + ':' + minutes  + ' AM'
            }
            else if(hours > 12){
                displayTime = (hours-12) + ':' + minutes + ' PM'
            }
            else if( hours == 12 && minutes == 00 ){
                displayTime = hours + ':' + minutes  + ' Noon'
            }
            else if( hours == 12 && minutes > 0 ){
                displayTime = hours + ':' + minutes  + ' PM'
            }
            var header = $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[0]).text()
            var description = $($(this).parent().parent().parent().children()[6]).text()
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="today-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + month + " " + date + ", " + year + " | " +displayTime + '</h6>')
            $(this).parent().parent().append('<p>' + selectedTimeValue + '</p>')
            $($(this).parent().parent().children()[3]).css({"display" : 'none'})
            $($(this).parent().parent().children()[0]).remove()
            timeVar = selectedTimeValue ;

            //Creating the alarm

            var now = new Date()
            console.log( "now time inside modifybttn = " + now.getTime())
            selectedTimeValue.setSeconds(0)
            console.log( "selected time inside modifybttn = " + selectedTimeValue.getTime())
            if (now.getDate() == selectedTimeValue.getDate() && now.getMonth() == selectedTimeValue.getMonth() && now.getFullYear() == selectedTimeValue.getFullYear())
            { countScheduled ++; displayScheduled.textContent = countScheduled ; }
            else { countScheduled -- ; displayScheduled.textContent = countScheduled ; }

            console.log("header inside the mofify bttn = ", header)
            console.log("description inside the mofify bttn = ", description)
            setTimeout( function(){
            var alert = document.createElement("ion-alert");
            alert.header =  header ,
            alert.message = description ,
            alert.buttons = [
                {
                    text : "Dismiss",
                    role : "cancel",
                    handler : () => {
                        console.log("Stopped !!")
                        alertNum ++ ;
                        alarmSound.pause(); // This pauses the alarm
                        alarmSound.currentTime = 0 // This sets the track to 0
                    }
                },
                {
                    text : "Snooze",
                    handler : () => {
                        console.log("Snoozed for 2 min.")
                        alarmSound.pause(); // This pauses the alarm
                        alarmSound.currentTime = 0 // This sets the track to 0
                        temp = alertNum
                        setTimeout( function(){
                            document.body.append(alert);
                            alarmSound.play();
                            setTimeout( function(){
                                $($(document.body).children()[3]).remove()
                                alarmSound.pause();
                                alarmSound.currentTime = 0
                            } , 5000)
                            return (alert).present()
                        } , 120000)
                        alertNum ++ ;
                    }
                }
            ]
            document.body.append(alert)
            alarmSound.play()
            return alert.present()
            }, (selectedTimeValue.getTime() - now.getTime()))

        })
    })
    //Small-modify button
    $($($(new_ionItem).children()[1]).children()[1]).click(function(){ 
        //Getting the default, i.e. previous value
        timeVar = $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[4]).children()[2]).text()

        //Setting the default value
        modifySelectTime.setAttribute("value", timeVar);

        //Removing the previous value that the user had selected
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[4]).children()[1]).remove()
        $($($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[4]).children()[1]).remove()

        // Now appending the modify-ion-item to the place where the previous value was being displayed 
        $($($($(this).parent().parent().parent().children()[1]).children()[0]).children()[4]).append(modifyTime)

        //After the user has selected the new value, he/she will click okay-button. 
        //Thus, the following event will be triggerred and the display will be restored back to normal.
        $(modifyBttnRep).click(function(){
            
            //Removing the previous alarm
            var num = $($(this).parent().parent().parent().parent().parent().children()[2]).text()
            clearTimeout(allTimers[num]);

            modCount += 1;
            if(modCount == 6){
                // Fading in the big bttns
                $($(this).parent().parent().parent().parent().children()[1]).children().fadeIn(500);
                //Fading in the burger icon
                $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[3]).fadeIn(500);
                modCount = 0 ;
            }
            selectedTimeValue = new Date(modifySelectTime.value);
            selectedTimeValue.setSeconds(0)
            var hours = selectedTimeValue.getHours(),
                minutes = selectedTimeValue.getMinutes(),
                year = selectedTimeValue.getFullYear(),
                month = selectedTimeValue.toLocaleString('default', { month: 'long' }),
                date = selectedTimeValue.getDate(),
                displayTime;

            if(minutes < 10){
                minutes = '0' + minutes
            }
            if(hours == 0 ){
                displayTime = (hours+12) + ':' + minutes  + ' AM'
            }
            else if(hours < 12){
                displayTime = hours + ':' + minutes  + ' AM'
            }
            else if(hours > 12){
                displayTime = (hours-12) + ':' + minutes + ' PM'
            }
            else if( hours == 12 && minutes == 00 ){
                displayTime = hours + ':' + minutes  + ' Noon'
            }
            else if( hours == 12 && minutes > 0 ){
                displayTime = hours + ':' + minutes  + ' PM'
            }
            var header = $($($(this).parent().parent().parent().parent().parent().children()[0]).children()[0]).text()
            var description = $($(this).parent().parent().parent().children()[6]).text()
            $($(this).parent().parent().children()[0]).remove()
            $(this).parent().parent().append('<ion-icon slot="start" size="large" name="today-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + month + " " + date + ", " + year + " | " +displayTime + '</h6>')
            $(this).parent().parent().append('<p>' + selectedTimeValue + '</p>')
            $($(this).parent().parent().children()[3]).css({"display" : 'none'})
            $($(this).parent().parent().children()[0]).remove()
            timeVar = selectedTimeValue ;
            console.log("description inside the mofify bttn = ", description)

            var now = new Date()
            if (now.getDate() == selectedTimeValue.getDate() && now.getMonth() == selectedTimeValue.getMonth() && now.getFullYear() == selectedTimeValue.getFullYear())
            { countScheduled ++; displayScheduled.textContent = countScheduled ; }
            else { countScheduled -- ; displayScheduled.textContent = countScheduled ; }
            setTimeout( function(){
            var alert = document.createElement("ion-alert");
            alert.header =  header,
            alert.message = description,
            alert.buttons = [
                {
                    text : "Dismiss",
                    role : "cancel",
                    handler : () => {
                        console.log("Stopped !!")
                        alertNum ++ ;
                        alarmSound.pause(); // This pauses the alarm
                        alarmSound.currentTime = 0 // This sets the track to 0
                    }
                },
                {
                    text : "Snooze",
                    handler : () => {
                        console.log("Snoozed for 2 min.")
                        alarmSound.pause(); // This pauses the alarm
                        alarmSound.currentTime = 0 // This sets the track to 0
                        temp = alertNum
                        setTimeout( function(){
                            document.body.append(alert);
                            alarmSound.play();
                            setTimeout( function(){
                                $($(document.body).children()[3]).remove()
                                alarmSound.pause();
                                alarmSound.currentTime = 0
                            } , 5000)
                            return (alert).present()
                        } , 120000)
                        alertNum ++ ;
                    }
                }
            ]
            document.body.append(alert)
            alarmSound.play()
            return alert.present()
            }, (selectedTimeValue.getTime() - now.getTime()))
        })
    })
}