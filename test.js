
function Dog(name, age){
    this.name= name;
    this.age= age;
}

class Cat{
    // auto called when creating objects
    constructor(name, age, color){
        this.name= name;
        this.age= age;
        this.color= color;
    }
}

function objects(){

    // object literal
    let d1= {
        name: "fido",
        age: 3
    };
    let d2= {
        Name: "Lola",
        Age: 5,
    };
    console.log(d1);
    console.log(d2);

    // object constructor
    let d3= new Dog("Chess", 4);
    let d4= new Dog("Aero", 6);
    console.log(d3, d4);

    // classes
    let c1= new Cat("Smucker", 3, "black");
    let c2= new Cat("Purp", 4, "purple");
    console.log(c1, c2);

}

// objects();

function testRequest(){
    $.ajax({
        type:"GET",
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says: ", response)
        },
        error: function(error){
            console.log("Req failed", error)
        },
    });
}

// testRequest()