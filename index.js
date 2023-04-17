// 'use strict';

// const Words = [
//     ["Шибениця", "Назва цієї гри" ],
//     ["Персик", "Фрукт"],
//     ["Малина", "Ягода"],
//     ["Клен", "Дерево"], 
//     ["Будинок", "Житло"],
//     ["Круасан", "Французька випічка"],
//     ["Паркан", "Огорожа"],
//     ["Гойдалка", "Буває в луна-парках"],
//     ["Дрова", "Дерево для печі"],
//     ["Барабан", "Перкусійний інструмент"],
//     ["Криниця", "З неї набирають воду в селі"],
//     ["Суниця", "Ягода"],
//     ["Ліщина", "Лісовий горіх"],
//     ["Паляниця", "Кодове слово"],
//     ["Оливка", "Грецькі плоди"],
//     ["Пряник", "Солодощі"],
//     ["Автомобіль", "Транспорт"],
//     ["Волосся", "Прикриває голову"],
//     ["Яблуко", "Фрукт"],
//     ["Пахлава", "Турецькі солодощі"],
//     ["Драбина", "Портативні сходи"],
//     ["Полуниця", "Ягода"],
// ];

const Length = Words.length;

const getNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


let n = getNumber(0, Words.length-1);
const Word = Words[n][0];
const hint = Words[n][1];

const getImageSrc = (num) => 'res/Hangman-' + num + '.png';
// const { Word, Hint } = getWord();
const Screen = document.querySelector('.container .control__case .screen .label')

const Tries = 5;
let mistakes = 0;

console.log(Word);
const len = Word.length;

let word = Word[0];

for (let i = 0; i < len - 2; i++) {
    word = word + '_';
}

word = word + Word[len-1];
console.log("Word: ", word);

Screen.innerHTML = word;

let game = Tries;
let letter_pos = 0;
let letter_count = 0;
let inValue = '';

const Input = document.querySelector('.container .control__case .control .input__letter');
const Enter = document.querySelector('.container .control__case .control .input__enter');
const LetterList = document.querySelector('.container .control__case .log .letters');
const HintButton = document.querySelector('.container .control__case .screen .hint__case .hint__btn')
const Hint = document.querySelector('.container .control__case .screen .hint__case .hint');

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const logLetter = (letter) => {
    LetterList.innerHTML = LetterList.innerHTML + letter + ' ';
}

const Game = () => {
    inValue = String(Input.value).toLowerCase();
    letter_count = 0;
    if (inValue.length === 1) {
        if (Word.indexOf(inValue) == -1) {
            mistakes++;
            logLetter(inValue);
            document.querySelector('.container .image__case .image').src = getImageSrc( mistakes+ 1);
            if (mistakes == 5) {
                alert('Гру закінчено!')
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                if (Word[i] == inValue) {
                    // letter_pos = Word.indexOf(Input.value);
                    word = word.replaceAt(i, inValue);
                }
            }
            
            
            Screen.innerHTML = word;
            if (word === Word) {
                alert('Ви виграли!')
            }
        }
        Input.value = '';
    }
}

Enter.addEventListener('click', () => {
    Game();
})

Input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        Game();
    }
})

HintButton.addEventListener('click', () => {
    Hint.innerHTML = hint;
})