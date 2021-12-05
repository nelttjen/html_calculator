let a = '';
let b = '';
let sign = '';
let finish = false;
let clear = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', 'X', '/'];
const things_to_do = ['=', '+/-', '.'];

// экран
const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
    console.log('cleared');
}

function screen_update() {
    if (!finish) {
        if (a) {
            out.textContent = a;
        }
        else {
            out.textContent = '0';
        }
        
    }
    else {
        if (b) {
            out.textContent = b;
        }
        else {
            out.textContent = '0';
        }
    }
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {

    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;
    
    if (digit.includes(key)) {
        if (!finish) {
            if (a.startsWith('0') && !a.startsWith('0.')) {
                if (key != '0' && a != '0.0') {
                    a = key;
                }
            } else {
                if (!a.endsWith('.0')){
                    a += key;
                } else {
                    a = a.replace('.0', '.');
                    a += key;
                }
            }
        }
        else {
            if (!clear) {
                if (b.startsWith('0') && !b.startsWith('0.')) {
                    if (key != '0') {
                        b = key
                    }
                } else {
                    if (!b.endsWith('.0')){
                        b += key;
                    } else {
                        b = b.replace('.0', '.');
                        b += key;
                    }
                }
            } else {
                b = key;
                clear = false;
            }
        }
        screen_update();
    }
    if (action.includes(key)) {
        finish = true;
        clear = true;
        b = a;
        sign = key;
    }
    if (things_to_do.includes(key)){
        if (key == '='){
            console.log(a, b, sign, a + ' ' + sign.replace('X', '*') + ' ' + b);
            answer = eval(a + ' ' + sign.replace('X', '*') + ' ' + b);
            clearAll();
            console.log(answer);
            if (answer) {
                out.textContent = answer;
            } else {
                out.textContent = '0';
            }
        } else if (key == '+/-') {
            if (!finish) {
                if (a != '' && a != '0') {
                    if (a.includes('-')) {
                        a = a.replace('-', '');
                    } else {
                        a = '-' + a;
                    }
                }
            } else {
                if (b != '' && b != '0') {
                    if (b.includes('-') && b && b != '0') {
                        b = b.replace('-', '');
                    } else {
                        b = '-' + b;
                    }
                }
                clear = false
            }
            screen_update();
        } else if (key == '.') {
            if (!finish) {
                if (!a.includes('.') && a) {
                    a += '.0';
                } else if (!a) {
                    a = '0.0';
                }
            } else {
                if (!b.includes('.') && a) {
                    b += '.0';
                } else if (!b) {
                    b = '0.0';
                }
            }
            screen_update();
        }
    }
}