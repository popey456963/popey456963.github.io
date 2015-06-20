var q = document.getElementById("q");
q.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        validate(e);
    }
});

function validate(e) {
    var text = q.value;
    console.log(q + " | " + text)
    window.location.href = "https://www.google.co.uk?q=" + text;
}