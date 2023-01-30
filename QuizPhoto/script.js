const quizData = [
    {
        question: 'https://images.unsplash.com/photo-1615485925822-77040a19d84b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        answer1: 'Миндаль',
        answer2: "Фисташки",
        answer3: 'Фундук',
        answer4: 'Пряник',
        correct: '3'
    },
    {
        question: 'https://images.unsplash.com/photo-1615485925873-7ecbbe90a866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        answer1: 'Сахар',
        answer2: "Корм",
        answer3: 'Паста',
        answer4: 'Кешью',
        correct: '4'
    },
    {
        question: 'https://images.unsplash.com/photo-1615485737457-f07082c77813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        answer1: 'Фундук',
        answer2: "Миндаль",
        answer3: 'Хлеб',
        answer4: 'Финик',
        correct: '2'
    },
    {
        question: 'https://images.unsplash.com/photo-1617176756162-447320192d98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        answer1: 'Розы',
        answer2: "Ромашки",
        answer3: 'Тюльпаны',
        answer4: 'Трава',
        correct: '3'
    },
    {
        question: 'https://cdn.pixabay.com/photo/2020/05/21/07/40/poppy-5199556_960_720.jpg',
        answer1: 'Пион',
        answer2: "Мак",
        answer3: 'Ромашка',
        answer4: 'Роза',
        correct: '2'
    },
    {
        question: 'https://images.unsplash.com/photo-1615484477201-9f4953340fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        answer1: 'Фрукт',
        answer2: "Овощ",
        answer3: 'Ягода',
        answer4: 'Орех',
        correct: '2'
    },
    {
        question: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        answer1: 'Орех',
        answer2: "Овощ",
        answer3: 'Ягода',
        answer4: 'Фрукт',
        correct: '4'
    },
    {
        question: 'https://images.prom.ua/772251686_w640_h640_lisichka-grib-sushenyj.jpg',
        answer1: 'Мухомор',
        answer2: "Груздь",
        answer3: 'Лисички',
        answer4: 'Белый',
        correct: '3'
    },
    {
        question: 'https://images.unsplash.com/photo-1615485499978-1279c3d6302f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        answer1: 'Перец',
        answer2: "Баклажан",
        answer3: 'Цуккини',
        answer4: 'Тыква',
        correct: '3'
    },
    {
        question: 'https://cdn.pixabay.com/photo/2017/12/27/18/02/cape-gooseberry-3043259_960_720.jpg',
        answer1: 'Алыча',
        answer2: "Крыжовник",
        answer3: 'Физалис',
        answer4: 'Апельсин',
        correct: '3'
    },

];
let numQuiz = 0;
let correct = 0;

const quiz = document.querySelector('#quiz');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');
const button = document.querySelector('#submit');
const buttonStart = document.querySelector('#start');
const inputAnswer = document.querySelectorAll('.answer');
const container = document.querySelector('.container');
const container_start = document.querySelector('.container_start');
const quizLength = document.querySelector('.quiz_length');
const timer = document.querySelector('.timer');

const deadline = 1000 * 1800;
timer.textContent = '60';

startPage();
function startPage() {
    container_start.classList.add('show');
    container.classList.add('hidden');
    container_start.classList.remove('hidden');
    container.classList.remove('show');
}

function createQuiz() {
    container.classList.add('show');
    container.classList.remove('hidden');
    container_start.classList.add('hidden');
    container_start.classList.remove('show');
    deSelected();
    let listOfQuiz = quizData[numQuiz];
    quiz.src = listOfQuiz.question;

    answer1.textContent = listOfQuiz.answer1;
    answer2.textContent = listOfQuiz.answer2;
    answer3.textContent = listOfQuiz.answer3;
    answer4.textContent = listOfQuiz.answer4;
    quizLength.textContent = `Question ${numQuiz + 1}/${quizData.length}`;
}

function getSelected() {
    let result;
    inputAnswer.forEach(value => {
        if (value.checked) result = value.id;
    });
    return result;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function deSelected() {
    inputAnswer.forEach(value => {
        value.checked = false;
    });
}

button.addEventListener('click', () => {
    const result = getSelected();

    if (result) {
        if (quizData[numQuiz].correct === result) {
            correct++;
        }
        numQuiz++;
        if (numQuiz < quizData.length) {
            createQuiz();
        } else {
            container.innerHTML = `
            <h2>You answered correctly at ${correct}/${quizData.length} answeres</h3>
            <button id='submit' onclick='location.reload()'>Try one more time</button>
            `;
        }
    }
}
);

function showResults() {
    container.innerHTML = `
            <h2 style="font-size: 1.30rem">Time is out</h4>
            <h2>You answered correctly at ${correct}/${quizData.length} answeres</h3>
            <button id='submit' onclick='location.reload()'>Try one more time</button>
            `;
}

buttonStart.addEventListener('click', () => {
    
    createQuiz();
    const startTime = Date.now();
    const interval = setInterval(() => {
        const timeLeft = Math.round((deadline - (Date.now() - startTime)) / 1000);
        
        // timer.textContent = formatTime(timeLeft);

        console.log(timeLeft);
        if (numQuiz === quizData.length) {
            clearInterval(interval);
        }
        if (timeLeft === 0) {
            clearInterval(interval);
            showResults();
        }
    }, 1000);
    
});