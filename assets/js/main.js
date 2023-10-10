var sentences = [
    "dodge covid.",
    "reboot computers.",
    "take photos to walls.",
    "fight printers.",
    "refactor my vinyls order."
]

$(document).ready(async function () {
    sentences = shuffle(sentences);
    carousel(sentences, "#sentence");
});

(() => {
    // Blur the content when the menu is open
    const cbox = document.getElementById("menu-trigger");

    cbox.addEventListener("change", function () {
        const area = document.querySelector(".wrapper");
        this.checked
            ? area.classList.add("blurry")
            : area.classList.remove("blurry");
    });
})();

async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
        await typeSentence(carouselList[i], eleRef);
        await waitForMs(6000);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++
        if (i >= carouselList.length) i = 0;
    }
}

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
