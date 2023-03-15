const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
function shuffle() {
    card.forEach(item => {
        const array = [...Array(card.length).keys()];
        const num = Math.floor(Math.random() * card.length)

        item.style.order = array[num];
    });

}

function pick() {
    for (let i = 0; i < card.length; i++) {

        setInterval(() => {
                front[i].classList.remove('show');
        }, 2000);

        card[i].addEventListener('click', () => {
            front[i].classList.add('flip');
            const filppedCard = document.querySelectorAll('.flip');
            if (filppedCard.length == 2) {
                container.style.pointerEvents = 'none';
                setInterval(() => {
                    container.style.pointerEvents = 'auto';
                }, 1000);
                match(filppedCard[0], filppedCard[1])
            }
        });
    }
}

function match(card1, card2) {
   if (card1.dataset.index === card2.dataset.index) {
    card1.classList.remove('flip')
    card2.classList.remove('flip')

    card1.classList.add('match')
    card2.classList.add('match')

   } else {
    setTimeout(() => {
        card1.classList.remove('flip')
        card2.classList.remove('flip')
    
    }, 600);
   }
}
pick();
shuffle();
