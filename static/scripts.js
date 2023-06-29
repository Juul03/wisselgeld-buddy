const form = document.querySelector('main form');
const wisselgeldWaarde = document.querySelector('main > h2 span');
const main = document.querySelector('main');
const inputFields = document.querySelectorAll('input');
let ul = null;

inputFields.forEach(input => {
    input.addEventListener('click', ()=> {
        clearUL();
        wisselgeldWaarde.innerHTML ="";
    })
})


form.addEventListener('submit', event => {
    event.preventDefault();

    clearUL();

    // Get user input
    let prijs = document.getElementById('prijs').value;
    let inname = document.getElementById('inname').value;

    // Calculate change
    let wisselgeld = (inname - prijs).toFixed(2);
    wisselgeldWaarde.innerHTML = wisselgeld;

    // Call the function to calculate wisselgeld breakdown
    calculateWisselgeldBreakdown(wisselgeld);

    // Reset form after submission
    event.target.reset();
});

const clearUL = () => {
    const ulElements = main.querySelectorAll('ul');
    ulElements.forEach(ul => ul.remove());
};

const calculateWisselgeldBreakdown = (amount) => {
    const moneyTypes = [2000, 1000, 500, 200, 100, 50, 20, 10, 5];
    const welkGeldHebIkNodig = [];

    let remainingAmount = Math.round(amount * 100);
    moneyTypes.sort((a, b) => b - a);

    moneyTypes.forEach(moneyType => {
        if (remainingAmount >= moneyType) {
            const count = Math.floor(remainingAmount / moneyType);
            welkGeldHebIkNodig.push({
                denomination: moneyType / 100,
                count: count
            });
            remainingAmount -= count * moneyType;
        }
    });

    if (remainingAmount > 0) {
        welkGeldHebIkNodig.push({
            denomination: 0.05,
            count: remainingAmount
        });
    }

    console.log(welkGeldHebIkNodig);
    wisselgeldPresenterenText(welkGeldHebIkNodig);
    wisselgeldPresenterenImg(welkGeldHebIkNodig);
    return welkGeldHebIkNodig;
};

const wisselgeldPresenterenText = (welkGeldHebIkNodig) => {
    ul = document.createElement('ul');

    welkGeldHebIkNodig.forEach(geldType => {
        const aantal = geldType.count;
        const denomination = geldType.denomination;

        const formattedDenomination = [0.5, 0.2, 0.1].includes(denomination)
            ? denomination.toFixed(2)
            : denomination;

        const li = document.createElement('li');
        li.textContent = `${aantal} x € ${formattedDenomination}`;

        ul.appendChild(li);
    });

    main.appendChild(ul);
};

const wisselgeldPresenterenImg = (welkGeldHebIkNodig) => {
    ul = document.createElement('ul');

    welkGeldHebIkNodig.forEach(geldType => {
        const aantal = geldType.count;
        const denomination = geldType.denomination;

        const formattedDenomination = [0.5, 0.2, 0.1].includes(denomination)
            ? denomination.toFixed(2)
            : denomination;

        const li = document.createElement('li');
        for (let i = 0; i < aantal; i++) {
            const img = document.createElement('img');
            img.src = getImagePathForDenomination(formattedDenomination);
            img.alt = `Image for € ${formattedDenomination}`;

            li.appendChild(img);
        }

        ul.appendChild(li);
    });

    main.appendChild(ul);
};


const getImagePathForDenomination = (denomination) => {
    // Define the image file extensions based on the denomination
    const imageExtensions = {
        0.05: 'png',
        0.10: 'png',
        0.20: 'png',
        0.50: 'png',
        1: 'png',
        2: 'png',
        5: 'png',
        10: 'jfif',
        20: 'jfif'
    };

    // Get the file extension based on the denomination
    const extension = imageExtensions[denomination] || 'png';

    // Generate the image path based on the denomination and extension
    return `./static/img/${denomination}euro.${extension}`;
};
