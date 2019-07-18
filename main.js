if (codeText.addEventListener) {
    codeText.addEventListener('input', function () {
        handleTextChange();
    }, false);
} else if (codeText.attachEvent) {
    codeText.attachEvent('onpropertychange', function () {
        handleTextChange();
    });
}

$("#imgCont").sortable({
    start: function (event, ui) {
        this.start = ui.item.index()
    },
    update: function (event, ui) {
        this.update = ui.item.index()
    },
    stop: function (event, ui) {
        handleSwap(this.start,this.update);
    }
});

copyBtn.onclick = function () {
    codeText.select();
    document.execCommand('copy');
    console.log("Copied Text");
}