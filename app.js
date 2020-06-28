//Bugs :-
// Why teh jQuery() is not activating when reminder is enterted using the enter key ?
// How to nest select-lists ??



const addExtnBttn = document.getElementById("addExtensions");
const addRemBttn = document.getElementById("addReminder");
const inputReminder = document.getElementById("input-reminder");
const reminderList = document.getElementById("reminderList");
const Extensions = document.getElementById("extensions");

var new_ionItem;
var deleteIcon;
var completeIcon;
var modifyIcon;
var burgerIcon;
var new_ionCard; 


//Showing the extensions 
addExtnBttn.addEventListener("click" ,function(){
    $(Extensions).slideToggle(500)
    // alert("Extensions will be shown !!")
})

addRemBttn.addEventListener("click" ,addReminder)
addRemBttn.addEventListener("click" ,jQuery)

inputReminder.addEventListener("keypress", function(e){
    if(e.which == 13)
    {   // Carry out the following functions
        addReminder() ; jQuery() ;
    }
})

function addReminder ()
{
    //checking for a valid input
    if(!(inputReminder.value))
    {
        alert("You cannot add an empty reminder !!")
        return;
    }

    //creating the new ion-item
    new_ionItem = document.createElement("ion-item");
    new_ionCard = document.createElement("ion-card")
    new_ionItem.textContent = inputReminder.value
    new_ionItem.classList.add("newItem")
    new_ionItem.setAttribute("lines", "none")
    //appending delete icon, modify icon, complete icon and the burger
    $(new_ionItem).append('<ion-button slot="end"><ion-icon name="trash-outline" id="delete"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end"><ion-icon name="pencil-sharp" id="modify"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end"><ion-icon name="checkmark-done" id="complete"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end"><ion-icon name="logo-buffer" id="burger"></ion-icon></ion-button>')

    //Creating the extension div
    extn_item = document.createElement("ion-item")
    extn_item.textContent = "This is where the details will be !!"
    $(extn_item).css({"display" : "none"})

    //Appending the name/title(new_ionItem) and the describtion(extm_item) to the card
    new_ionCard.appendChild(new_ionItem)
    new_ionCard.appendChild(extn_item)

    //Appending the final card to the list
    reminderList.appendChild(new_ionCard)

    //Resetting the text values
    inputReminder.value = "";
}

function jQuery()
{
    $($(new_ionItem).children()[3]).click(function(){
        for (let i = 0; i < 3; i++) {
            $($(this).parent().children()[i]).fadeToggle(500)
        }
        $($(new_ionCard).children()[1]).fadeToggle(500)
    })
}