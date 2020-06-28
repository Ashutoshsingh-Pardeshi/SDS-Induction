const addExtnBttn = document.getElementById("addExtensions");
const addRemBttn = document.getElementById("addReminder");
const inputReminder = document.getElementById("input-reminder");
const reminderList = document.getElementById("reminderList");

var new_ionItem;
var deleteIcon;
var completeIcon;
var modifyIcon;
var burgerIcon;

addExtnBttn.addEventListener("click" ,function(){
    alert("Extensions will be shown !!")
})

addRemBttn.addEventListener("click" ,addReminder)

inputReminder.addEventListener("keypress", function(e){
    if(e.which == 13)
    {
        // Carry out the following functions
        addReminder() ; 
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
    new_ionItem.textContent = inputReminder.value
    new_ionItem.classList.add("newItem")
    //appending delete icon, modify icon, complete icon and the burger
   $(new_ionItem).append('<ion-button slot="end"><ion-icon name="trash-outline" id="delete"></ion-icon></ion-button>')
   $(new_ionItem).append('<ion-button slot="end"><ion-icon name="pencil-sharp" id="modify"></ion-icon></ion-button>')
   $(new_ionItem).append('<ion-button slot="end"><ion-icon name="checkmark-done" id="complete"></ion-icon></ion-button>')
   $(new_ionItem).append('<ion-button slot="end"><ion-icon name="logo-buffer" id="burger"></ion-icon></ion-button>')
    reminderList.appendChild(new_ionItem)

    //Resetting the text values
    inputReminder.value = "";
}

function jQuery()
{
    $(new_ionItem).children()[3].click(function(){
        for (let i = 0; i < 3; i++) {
            $(this).parent().children()[i].fadeToggle()
        }
    })
}