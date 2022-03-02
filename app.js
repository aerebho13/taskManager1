
var nonImportantClass= "fas fa-fire";
var importantClass= "fas fa-sticky-note"; 
var isFire= false;
var isFormVisible= true;

function togglefire(){
    console.log("Icon Clicked");

    if(isFire){
        // non important
        isFire= false;
        $("#fire").removeClass(importantClass);
        $("#fire").addClass(nonImportantClass);
    }
    else{
        // important
    $("#fire").removeClass(nonImportantClass);
    $("#fire").addClass(importantClass);
        isFire= true;
    }
};

function toggleForm(){
    if(isFormVisible){
        isFormVisible= false;
        $("#form").hide();
    }
    else{
        isFormVisible= true;
        $("#form").show();
    }
    
}

function saveTask(){
    console.log("Save Task");

    let title= $("#txtTitle").val();
    let date= $("#dueDate").val();
    let contact= $("#txtContact").val();
    let location= $("#txtLocation").val();
    let descript= $("#txtDescript").val();
    let color= $("#txtColor").val();

    // validate
    if(title.length < 5){
        alert("Title should be at least 5 chars long");
        return;
    }
    if(!date){
        alert("DueDate is required");
        return;
    }
    if(!contact){
        alert("Contact information is required");
        return;
    }
    if(!location){
        alert("Location required");
        return;
    }
    if(!descript){
        alert("Needs a description");
        return;
    }
    if(!color){
        alert("Attach a color to the task");
        return;
    }

    let task= new Task(isFire, title, date, contact, location, descript, color);
    console.log(task);

    displayTask(task);

}

function displayTask(task){
    // create syntax(html)
    let syntax= `<div class= "task">
    
        <div class= "info">
            <h5>${task.title}</h5>
            <p>${task.descript}</p>
        </div>
        
        <label class= "date">${task.dueDate}</label>

        <div class= "extra">
            <label class= "location">${task.location}</label>
        </div>

        <button onclick="deleteTask()" class= "btn btn-sm btn-danger">Remove</button>
        </div>`;
    

    // append syntax to an element on the screen
    $("#task-list").append(syntax)
}

function deleteTask(){
    console.log("deleting task");
}


function init(){
    console.log("Task manager");

    // events
    $("#fire").click(togglefire);
    $("#btn-form").click(toggleForm)
    $("#btnSave").click(saveTask);

    // load data


}

window.onload=init;