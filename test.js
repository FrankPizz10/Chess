console.log("Hello World");

var name = "Frank";

document.getElementById("Name").innerHTML  = name;

function changeName() {
    name = "Kyle"
    document.getElementById("Name").innerHTML  = name;
}