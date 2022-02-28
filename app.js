
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

function init(){
    console.log("Task manager");

    // events
    $("#fire").click(togglefire);
    $("#btn-form").click(toggleForm)

    // load data


}

window.onload=init;