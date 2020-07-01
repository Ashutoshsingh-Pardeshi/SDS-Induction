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



var addExtnBttn = document.getElementById("addExtensions");
var addRemBttn = document.getElementById("addReminder");
var inputReminder = document.getElementById("input-reminder");
var reminderList = document.getElementById("reminderList");
var Extensions = document.getElementById("extensions");
var extnDescription = document.getElementById("description");
var dateButton = document.getElementById("dateButton");
var timeButton = document.getElementById("timeButton");
var dayButton = document.getElementById("dayButton");

var new_ionItem;
var new_ionLabel; // This conatins the text
var new_ionCard; // The card inside the ion-item
var smallbttns; // This is a span containing all the mini-buttons
var extn_body;  // The ion-list containing all the categories and description
var extn_bttns; // The ion-list containing the ion-items which inturn contains the big-buttons
var buttonItem; // The big buttons

var deleteIcon; 
var completeIcon;
var modifyIcon;
var burgerIcon;

var priorityItem; 
var categoryItem;
var repetitionItem;
var typeItem;
var descriptionItem;

// The following vars are generated to reset their values. We can reset the values by setting their 'value' attribute to either something or null
var ionSelectCategory = document.getElementById("ionSelectCategory"); 
var ionToggleFlag = document.getElementById("ionToggleFlag");
var ionSelectRepeat = document.getElementById("ionSelectRepeat");
var ionSelectType = document.getElementById("ionSelectType");
var ionDatetime_Date = document.getElementById("ionDate");
var ionDatetime_Time = document.getElementById("ionTime");
var ionDatetime_Day = document.getElementById("ionDay");


var selectedRepeat; // The selected value of repeat
var Category;   // The dictionary
var selectedCategory;   // The selected value 
var Type;   // The dictionary
var selectedType;   // The selected value 

var selectedDate;
var selectedDay;
var selectedTime;
var displayTime;

var displayScheduled = document.getElementById("displayScheduled");
var displayCompleted = document.getElementById("displayCompleted");
var displayAll = document.getElementById("displayAll");
var displayFlagged = document.getElementById("displayFlagged");
var countAll = 0;
var countCompleted = 0;
var countFlagged = 0;
var countScheduled = 0; // This ones a pretty tricky one !!

var bigModify;
var smallModify;

var categoryList = document.createElement("ion-list");
var repeatList = document.createElement("ion-list");
var typeList = document.createElement("ion-list"); // VERY VERY COMPLICATED
var descriptionList = document.createElement("ion-list");

//Initializing all the counts
displayScheduled.textContent = countScheduled ;
displayCompleted.textContent = countCompleted ;
displayAll.textContent = countAll ;
displayFlagged.textContent = countFlagged ;

//Showing the extensions 
addExtnBttn.addEventListener("click" ,function(){
    $(Extensions).slideToggle(500);
})

// Adding the events to the addRemBttn
addRemBttn.addEventListener("click" ,addReminder)
addRemBttn.addEventListener("click" ,jQuery)
addRemBttn.addEventListener("click" ,addPriority)
addRemBttn.addEventListener("click" ,addCategory)
addRemBttn.addEventListener("click" ,addRepeat)
addRemBttn.addEventListener("click" ,addType)
addRemBttn.addEventListener("click" ,addDescribtion)
addRemBttn.addEventListener("click" ,modification)

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
    // if(!(inputReminder.value) || !(document.getElementsByClassName("aux-input")[5].value))
    if(!(inputReminder.value) )
    {
        alert("You cannot leave the title and/or the time empty !!")
        return;
    }

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
    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="delete"><ion-icon key="trash-outline" size="large" style="height:28px;color:red"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="modify"><ion-icon name="pencil-sharp" size="large" style="height:28px;color:darkorange"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0" fill="clear" class="complete"><ion-icon name="checkmark-done" size="large" style="height:28px;color:green"></ion-icon></ion-button>')

    $(smallbttns).append('<ion-button slot="end" style="margin:0, width:32px" fill="clear" class="undo"><ion-icon name="sync-outline" size="large" style="height:28px;color:blue;"></ion-icon></ion-button>')
    $($(smallbttns).children()[3]).css({"display" : "none"}) // To hide the undo button
    $(smallbttns).css({"display" : "none"}) // To hide the button-span

    new_ionItem.appendChild(smallbttns);

    // Fab button
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="fab"><ion-icon name="caret-back-circle-outline" size="large" style="height:28px"></ion-icon></ion-button>')

    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="menu" size="large" style="height:28px"></ion-icon></ion-button>')

    //The flag icon- if choosen by the user
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear" id="burger"><ion-icon name="flag-sharp" size="large" style="height:28px;color:red"></ion-icon></ion-button>')
    $($(new_ionItem).children()[4]).css({"display" : "none"})

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

    //Appending the final card to the list
    reminderList.appendChild(new_ionCard)

    //Resetting the text values
    inputReminder.value = "";
    ionSelectCategory.value = "General";
    ionToggleFlag.setAttribute("checked","false")
    ionSelectRepeat.value = "Once";
    ionSelectType.value = "Alarm";
    ionDatetime_Date.value = "";
    ionDatetime_Time.value = "";
    ionDatetime_Day.value = "";

    //Updating the countAll
    countAll += 1;

    // Updating countFlagged
    if(document.getElementsByClassName("aux-input")[1].value == "on"){
        countFlagged += 1;
        displayFlagged.textContent = countFlagged;
    }

    //Updating all the counts
    displayScheduled.textContent = countScheduled ;
    displayAll.textContent = countAll ;
}

function addPriority(){
    priorityItem = document.createElement("ion-item")
    priorityItem.setAttribute("lines", "none")
    $(priorityItem).append('<ion-icon slot="start" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')
    $(priorityItem).append(' <h4 style="margin: 0 auto; color:red ">IMPORTANT</h4> ')
    $(priorityItem).append('<ion-icon slot="end" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')

    if(document.getElementsByClassName("aux-input")[1].value == "on"){
        extn_body.appendChild(priorityItem);
        $($(new_ionItem).children()[4]).css({"display" : "block"})
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

        "Birthday" : '',

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
    $(repetitionItem).append('<ion-icon slot="start" size="large" name="repeat" style="margin:0">         </ion-icon><h6 style="margin-left:20px">' + selectedRepeat + '</h6>' )
            
    extn_body.appendChild(repetitionItem)
}

function addType(){
    typeItem = document.createElement("ion-item")
    selectedType = document.getElementsByClassName("aux-input")[3].value;
    Type = {
        "Alarm" : '<ion-icon slot="start" size="large" name="alarm-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Alarm ',

        "Notification" : '<ion-icon slot="start" size="large" name="notifications-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Notification '
    }
    // Getting the date from the user
    selectedDate = new Date(document.getElementsByClassName("aux-input")[4].value);
    year = selectedDate.getFullYear();
    month = selectedDate.toLocaleString('default', { month: 'short' })
    date = selectedDate.getDate();

    //Getting the day from the user
    selectedDay = document.getElementsByClassName("aux-input")[6].value

    //Getting the time from the user
    selectedTime = new Date(document.getElementsByClassName("aux-input")[5].value);
    hours = selectedTime.getHours()
    mins = selectedTime.getMinutes()
    if(mins < 10){
        minutes = '0' + mins
    }
    else{
        minutes = mins
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
    // If date is missing, then displaying onlt the time
    if ( !(document.getElementsByClassName("aux-input")[4].value) && !(selectedDay) ){ 
        // Display only time
        $(typeItem).append(Type[selectedType] + '  ( ' + displayTime + ' )</h6>')
    }else if(!(document.getElementsByClassName("aux-input")[4].value) && selectedDay != ""){ 
        // Display day and time
        $(typeItem).append(Type[selectedType] + '  ( ' + selectedDay + ' | ' + displayTime + ' )</h6>')
    }else{ // Display month and time
        $(typeItem).append(Type[selectedType] + '  ( ' + date + ' ' + month + ', ' + year + ' | ' + displayTime + ' )</h6>')
    }
    extn_body.appendChild(typeItem)
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
        // Fading out the flag button
        if(document.getElementsByClassName("aux-input")[1].value == "on"){
            $($(this).parent().children()[4]).fadeToggle(500)
        }
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
    })

    // Mini-complete button
    $($($(new_ionItem).children()[1]).children()[2]).click(function(){
        $(this).parent().children(".modify, .complete").fadeOut(500, function(){
            $($(this).parent().children()[3]).fadeIn(800)
        })
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
    })

    // Big-complete button
    $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[2]).click(function(){
        // Line through the title of the reminder
        $($(this).parent().parent().parent().parent().children().children()[0]).css({
            textDecoration : "line-through"
        })
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
var modifyRep ; // Name of the ion-items
var modifyCat ; // Name of the ion-items
var modifyDes ; // Name of the ion-items
var modifyPri ; // Name of the ion-items
var modifyIonLabelCat ; // Label of the input-text/select
var modifyIonLabelRep ; // Label of the input-text/select
var modifyIonLabelDes ; // Label of the input-text/select
var modifyIonLabelPri ; // Label of the input-text/select
var modifyBttnCat ; // The respective okay buttons
var modifyBttnRep ; // The respective okay buttons
var modifyBttnDes ; // The respective okay buttons
var modifyBttnPri ; // The respective okay buttons
var modifySelectCategory = document.getElementById("modifySelectCategory"); 
var modifyTogglePri = document.getElementById("modifyToggleFlag");
var modifySelectRepeat = document.getElementById("modifySelectRepeat");
var modifySelectType = document.getElementById("modifySelectType");
var modifyDate = document.getElementById("modifyDate");
var modifyTime = document.getElementById("modifyTime");
var modifyDay = document.getElementById("modifyDay");
var modifyInputDes ; 
var selectedCatValue;
var selectedRepValue;
var selectedDesValue;


function modification(){
    var modCount = 0;

    //Big-modify button
    
        $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
            $(this).fadeOut(500)
        })

        //Category
        $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
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

            //Removing the previous value the user had selected.
            $($($($(this).parent().parent().parent().children()[0]).children()[0]).children()[1]).remove()

            // Now appending the modify-ion-item to the place where the previous value was being displayed 
            $($($(this).parent().parent().parent().children()[0]).children()[0]).append(modifyCat)

            //After the user has selected the new value, he/she will click okay-button. 
            //Thus, the following event will be triggerred and the display will be restored back to normal.
            $(modifyBttnCat).click(function(){
                modCount += 1;
                console.log("modCount = ", modCount);
                if(modCount == 3){
                    $($($(this).parent().parent().parent().parent().children()[1]).children().children()[1]).fadeIn(500);
                    modCount = 0 ;
                }
                selectedCatValue = modifySelectCategory.value
                $($(this).parent().parent().children()[0]).remove()
                $(this).parent().parent().append(Category[selectedCatValue])
                $($(this).parent().parent().children()[0]).remove()
                modifySelectCategory.value="General"
            })
        })

        //Repeatition
        $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
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

            //Removing the previous value the user had selected.
            $($($($(this).parent().parent().parent().children()[0]).children()[1]).children()[1]).remove()


            // Now appending the modify-ion-item to the place where the previous value was being displayed 
            $($($(this).parent().parent().parent().children()[0]).children()[1]).append(modifyRep)

            //After the user has selected the new value, he/she will click okay-button. 
            //Thus, the following event will be triggerred and the display will be restored back to normal.
            $(modifyBttnRep).click(function(){
                modCount += 1;
                console.log("modCount = ", modCount);
                if(modCount == 3){
                    $($($(this).parent().parent().parent().parent().children()[1]).children().children()[1]).fadeIn(500);
                    modCount = 0 ;
                }
                selectedRepValue = modifySelectRepeat.value
                $($(this).parent().parent().children()[0]).remove()
                $(this).parent().parent().append('<ion-icon slot="start" size="large" name="repeat" style="margin:0"></ion-icon><h6 style="margin-left:20px">' + selectedRepValue + '</h6>')
                $($(this).parent().parent().children()[0]).remove()
                modifySelectRepeat.value = "Once"
            })
        })

        // Description
        $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
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
            modifyInputDes.value = $($($($(this).parent().parent().parent().children()[0]).children()[3]).children()[1]).text()

            // Creating the ion-item
            modifyDes = document.createElement("ion-item");    

            // Calling the ion-select from app.html and appending it to the ion-item key-modifyDes.
            modifyDes.append(modifyIonLabelDes, modifyInputDes, modifyBttnDes)

            //Removing the previous value the user had selected.
            $($($($(this).parent().parent().parent().children()[0]).children()[3]).children()[1]).remove()

            // Now appending the modify-ion-item to the place where the previous value was being displayed 
            $($($(this).parent().parent().parent().children()[0]).children()[3]).append(modifyDes)

            //After the user has selected the new value, he/she will click okay-button. 
            //Thus, the following event will be triggerred and the display will be restored back to normal.
            $(modifyBttnDes).click(function(){
                modCount += 1;
                console.log("modCount = ", modCount);
                if(modCount == 3){
                    $($($(this).parent().parent().parent().parent().children()[1]).children().children()[1]).fadeIn(500)
                    modCount = 0 ;
                }
                selectedDesValue = modifyInputDes.value
                if(!(selectedDesValue)) { 
                    $(this).parent().parent().append('<h6 style="margin: 0 20px"> --- </h6>') 
                }
                else { 
                    $(this).parent().parent().append( '<h6 style="margin: 0 20px">' + selectedDesValue + '</h6>')
                } 
                selectedDesValue = ""
                $(this).parent().parent().append()
                $($(this).parent().parent().children()[1]).remove()
            })
        })

        if(document.getElementsByClassName("aux-input")[1].value == "on"){
            $($($($(new_ionItem).parent().children()[1]).children()[1]).children().children()[1]).click(function(){
                //Creating the ion-item
                modifyPri = document.createElement("ion-item")

                //Label
                modifyIonLabelPri = document.createElement("ion-label")

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
                
                //Removing the previous value the user had selected.
                $($($($(this).parent().parent().parent().children()[0]).children()[1]).children()[1]).remove()

            })
        }

    //Small-modify button

}

