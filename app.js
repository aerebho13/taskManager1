
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
    let dataStr = JSON.stringify(task);
    console.log(task);
    console.log(dataStr);

    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        data: dataStr,
        contentType: "application/json",

        success: function(data){
            console.log("Save result", data);
            let savedTask = JSON.parse(data);
            displayTask(savedTask);
        },
        error: function(error){
            console.log("Save failed", error);
        }
    });



    clearForm();

}

function clearForm(){
    console.log("Clear Form");
    $("#txtTitle").val("");
    $("#dueDate").val("");
    $("#txtLocation").val("");
    $("#txtContact").val("");
    $("#txtColor").val("#000000");
    $("#txtDescript").val("");
}

function displayTask(task){
    // create syntax(html)
    let syntax= `<div id="${task._id}" class= "task">
    
        <div class= "info">
            <h5>${task.title}</h5>
            <p>${task.descript}</p>
        </div>
        
        <label class= "date">${task.dueDate}</label>

        <div class= "extra">
            <label class= "location">${task.location}</label>
        </div>

        <button onclick="deleteTask('${task._id}')" class= "btn btn-sm btn-danger">Remove</button>
        </div>`;

        
    

    // append syntax to an element on the screen
    $("#task-list").append(syntax)
}


function deleteTask(id){
    console.log("deleting task", id);
    $("#" + id).remove();
    // http delete request with the id
}

function clearData() {
    $.ajax({
        type: 'DELETE',
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/RebTwentyFo",
        success: () => {
            console.log("Data cleared");
            $("#task-list").html("");
        },
        error: (details) => {
            console.log("Clear failed", details);
        }
    });
}

function retrieveTasks(){
    // https://fsdiapi.azurewebsites.net/api/tasks

    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",

        success: function(data){
            console.log("All Data", data)
            let list= JSON.parse(data);

            for(let i=0; i< list.length; i++){
                let task= list[i];
                if(task.name === "RebTwentyFo"){
                    displayTask(task);
                };
            }
        },
        error: function(error){
            console.log("Retrieve failed", error)
        }
    });
}

function init(){
    console.log("Task manager");

    // events
    $("#fire").click(togglefire);
    $("#btn-form").click(toggleForm)
    $("#btnSave").click(saveTask);
    $("#deleteAll").click(clearData);

    // load data
    retrieveTasks();
}

window.onload=init;