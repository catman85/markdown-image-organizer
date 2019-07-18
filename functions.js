// binding DOM
let codeText = document.querySelector('.code');
let copyBtn = document.querySelector('#copy');
let imageCont = document.querySelector('#imgCont');
let gap = document.querySelector('.g1p5');

// Vars
// var itemCount = 5;
var start = 0;
var update = 0;
var array = [];
var item = {};
var i;

var handleTextChange = function () { // reads markdown (runs once)
    console.debug("Detected Text Change...")

    this.cleanDOM(); // refreshes array too...


    let lines = $('textarea').val().split('\n');

    for (var i = 0; i < lines.length; i++) {
        let s = lines[i].trim();

        if (s.length == 0) {
            continue; // skip empty lines
        }
        if (!this.isMarkdownImage(s)) {
            continue;
        }
        let alt = s.substring(
            s.indexOf("[") + 1,
            s.lastIndexOf("]")
        );
        let second = s.substring(
            s.indexOf("(") + 1,
            s.lastIndexOf(")")
        );
        let url;
        if (second.indexOf(" ") != -1) {
            url = second.substring(
                0,
                second.indexOf(" ")
            )
        } else {
            url = second;
        }

        let title = second.substring(
            second.indexOf('"') + 1,
            second.lastIndexOf('"')
        )

        console.debug("ALT: " + alt);

        console.debug("URL: " + url)

        console.debug("TITLE: " + title);

        console.debug("-----------------")

        let img = {
            alt,
            url,
            title
        };
        this.array.push(img);
    }

    this.addImages();
}

var isMarkdownImage = function (s) {
    if (s.charAt(0) != "!" || s.charAt(1) != "[") {
        return false;
    }
    if (s.indexOf("]") <= 1) {
        return false;
    }
    if (s[s.indexOf("]") + 1] != "(") {
        return false;
    }
    if (s[s.length - 1] != ")") {
        return false;
    }

    return true;
}

var addImages = function (data) {
    for (i = 0; i < array.length; i++) {
        this.addImage(array[i].url);
    }
}

var addImage = function (imageSrc) {

    let col = document.createElement("div");
    col.classList.add("column", "is-one-fifth");
    col.setAttribute("id", i);

        let fig = document.createElement("figure");
        fig.classList.add("image", "is128x128")

            let img = document.createElement("img");
            img.src = imageSrc;

        fig.appendChild(img);

    col.appendChild(fig);

    imageCont.appendChild(col);
}

var handleSwap = function (s, u) {
    this.start = s;
    this.update = u;
    if (s === undefined || u === undefined) {
        return;
    }
    console.debug("start: " + s + " to: " + u);

    this.rearangeArray();

    this.reloadText();
}

var rearangeArray = function () {
    console.debug("Rearanging Array...")
    this.item = this.array.splice(this.start, 1)[0];
    this.array.splice(this.update, 0, this.item);
}

var reloadText = function () {
    console.debug("Reloading Text....");
    codeText.value = "";

    for (el in this.array) {
        el = this.array[el];
        let entry = "![" + el.alt + "](" + el.url + " " + el.title + ")\n\n";
        codeText.value += entry;
    }
}

var cleanDOM = function () {
    console.debug("Cleaning Dom...");
    this.array = [];
    while (imageCont.firstChild) {
        imageCont.removeChild(imageCont.firstChild);
    }
}