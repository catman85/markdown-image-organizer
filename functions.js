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
var i;

var handleTextChange = function () { // reads markdown (runs once)
    let lines = $('textarea').val().split('\n');
    this.array = [];
    // this.itemCount = lines.length;

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

        // console.debug(second.indexOf(" "));

        let title = second.substring(
            second.indexOf('"') + 1,
            second.lastIndexOf('"')
        )

        // console.debug("SECOND: " + second);
        console.debug("ALT: " + alt);

        console.debug("URL: " + url)

        console.debug("TITLE: " + title);

        // console.debug(lines[i].trim().length);
        console.debug("-----------------")

        let img = { alt , url , title};
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
    col.classList.add("column", "is-2");
    col.setAttribute("id", i);

    let fig = document.createElement("figure");
    fig.classList.add("image", "is128x128")

    let img = document.createElement("img");
    img.src = imageSrc;

    fig.appendChild(img);

    col.appendChild(fig);


    // let lastRow = imageCont.lastChild;
    // lastRow.appendChild(gap);
    // lastRow.appendChild(col);
    imageCont.appendChild(col);
}

var handleSwap = function (s, u) {
    this.start = s;
    this.update = u;
    if (s === undefined || u === undefined) {
        return;
    }
    console.debug("start: " + s + " to: " + u);
    console.debug(this.array);
    // TODO: swap and shift
    this.reloadText();
}

var reloadText = function () {

}