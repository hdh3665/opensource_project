class User_Info {
    constructor(domain, ID, PW) {
        this.domain = domain;
        this.ID = ID;
        this.PW = PW;
    }
}
// Program_User_Info 객체 정의
class Program_User_Info {
    constructor(ID, PW) {
        this.ID = ID;
        this.PW = PW;
    }
}
function change_num(char){
    let changed_num  = '';
    switch (char) {
        case '0':
            changed_num = '9';
            break;
        case '1' :
            changed_num = '8';
            break;
        case '2':
            changed_num = '7';
            break;
        case '3':
            changed_num = '6';
            break;
        case '4' :
            changed_num = '5';
            break;
        case '5':
            changed_num = '4';
            break;
        case '6' :
            changed_num = '3';
            break;
        case '7':
            changed_num = '2';
            break;
        case '8':
            changed_num = '1';
            break;
        case '9' :
            changed_num = '0';
            break;
        default:
            break;
    }
    return changed_num;
}
/*특수문자 예외case 추가요망*/
function capital_lower(msg) {
    let result = ""; // 새로운 문자열을 만들어 결과를 저장

    for (let i = 0; i < 25 && msg[i] !== undefined; i++) {
        if(msg[i] == '~'){
            result += '~';
        }
        else if ('A' <= msg[i] && msg[i] <= 'Z') {
            // 대문자인 경우 소문자로
            result += String.fromCharCode(msg[i].charCodeAt(0) + 32);
        } else if ('a' <= msg[i] && msg[i] <= 'z') {
            // 소문자인 경우 대문자로
            result += String.fromCharCode(msg[i].charCodeAt(0) - 32);
        }
        else {
            result +=msg[i];
        }
    }

    return result; // 수정: 결과 반환
}

/*특수문자 case 추가요망*/
function encryption2(ch) {
    const Grobal_k = -3; // 전역 변수 Grobal_k에 해당하는 값 설정
    let result = ""; // 수정: 새로운 문자열을 만들어 결과를 저장
    for (let i = 0; i < 25 && ch[i] !== undefined; i++) {
        if(ch[i] == '~'){
            result+='~';
        }
        else if(ch[i] >= '0' && ch[i]<='9'){
            let changenum = change_num(ch[i]);
            result += changenum;
        }
        else if ('A' <= ch[i] && ch[i] <= 'Z') { // 대문자인 경우
            if (ch[i] === 'A')
                result += 'X';
            else if (ch[i] === 'B')
                result += 'Y';
            else if (ch[i] === 'C')
                result += 'Z';
            else
                result += String.fromCharCode(ch[i].charCodeAt(0) + Grobal_k);
        } else if ('a' <= ch[i] && ch[i] <= 'z') { // 소문자인 경우
            if (ch[i] === 'a')
                result += 'x';
            else if (ch[i] === 'b')
                result += 'y';
            else if (ch[i] === 'c')
                result += 'z';
            else
                result += String.fromCharCode(ch[i].charCodeAt(0) + Grobal_k);
        }
    }

    return result; // 수정: 결과 반환
}

function decryption2(enc) {
    const Grobal_k = -3; // 전역 변수 Grobal_k에 해당하는 값 설정
    let result = "";

    for (let i = 0; i < 25 && enc[i] !== undefined; i++) {
        if(enc[i] == '~'){
            result+='~';
        }
        else if ('A' <= enc[i] && enc[i] <= 'Z') { // 대문자인 경우
            if (enc[i] === 'X')
                result += 'A';
            else if (enc[i] === 'Y')
                result += 'B';
            else if (enc[i] === 'Z')
                result += 'C';
            else
                result += String.fromCharCode(enc[i].charCodeAt(0) - Grobal_k);
        } else if ('a' <= enc[i] && enc[i] <= 'z') { // 소문자인 경우
            if (enc[i] === 'x')
                result += 'a';
            else if (enc[i] === 'y')
                result += 'b';
            else if (enc[i] === 'z')
                result += 'c';
            else
                result += String.fromCharCode(enc[i].charCodeAt(0) - Grobal_k);
        }
        else if (enc[i] >= '0' && enc[i]<='9'){
            let changenum = change_num(enc[i]);
            result += changenum;
        }
    }
    return result;
}

function encryption4(msg) {
    let m_size = msg.length;
    let cl_msg = capital_lower(msg);
    const arr1 = Array.from({ length: 5 }, () => Array(5).fill(0));
    const arr2 = Array.from({ length: 5 }, () => Array(5).fill(0));
    let result = Array(25).fill(''); // Initialize result as an array of empty strings
    let en2_result = "";

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(5*i+j > m_size-1){
                arr1[i][j] = '~'; // 공백을 채워줄 문자
            }
            else{
                arr1[i][j] = cl_msg[5 * i + j];
            }
            // arr1을 전치
            arr2[j][i] = arr1[i][j];
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            result[5 * i + j] = arr2[i][j];
        }
    }
    en2_result = encryption2(result.join('')); // Join the array into a string before passing to encryption2
    return en2_result;
}

function decryption4(msg){
    let m_size = msg.length;
    const arr1 = Array.from({ length: 5 }, () => Array(5).fill(0));
    const arr2 = Array.from({ length: 5 }, () => Array(5).fill(0));
    let result = ""; // Initialize result as an array of empty strings
    let dn2_result = decryption2(msg);
    let cl_msg = capital_lower(dn2_result);
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(cl_msg[5 * i + j] == '~'){
                arr1[i][j] = '~'; // 공백을 채워줄 문자
            }
            else{
                arr1[i][j] = cl_msg[5 * i + j];
            }
            // arr1을 전치
            arr2[j][i] = arr1[i][j];
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(arr2[i][j] == '~'){
                continue;
            }
            else{
                result += arr2[i][j];
            }
        }
    }
    return result;


}

let message = "iifal845fsdaasf";
let cl_message = capital_lower(message);
let en2_message = encryption2(message);
let de2_message = decryption2(en2_message);
let en4_message = encryption4(message);
let de4_message = decryption4(en4_message);
console.log(cl_message);
console.log(en2_message);
console.log(de2_message);
console.log(en4_message);
console.log(de4_message);
console.log(message);