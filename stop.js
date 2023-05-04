let hour=0,min=0,sec=0,mil=0;
let intv;

const stopswatch = document.querySelector('.togg');
const reset = document.querySelector('.reset');

let lTime = JSON.parse(localStorage.getItem('Time')) || {
    'HOUR': 0,
    'MINUTE': 0,
    'SECOND': 0,
    'MILLISECOND': 0
};
hour = lTime.HOUR;
min = lTime.MINUTE;
sec = lTime.SECOND;
mil = lTime.MILLISECOND;
display();

stopswatch.addEventListener('click',() => {
    stopswatch.classList.toggle('on');
    if(stopswatch.classList.contains('on')) {
        stopswatch.innerHTML = 'Pause';
        intv = setInterval(() => {
            mil++;
            if(mil == 100) {
                sec++;
                mil = 0;
            }
            if(sec == 60) {
                min++;
                sec = 0;
            }
            if(min == 60) {
                hour++;
                min = 0;
            }
            display();
        },10);
    }else {
        if(hour+min+sec+mil) {
            stopswatch.innerHTML = 'Continue';
        }else {
            stopswatch.innerHTML = 'Start';
        }
        clearInterval(intv);
     }
});

reset.addEventListener('click', () => {
    if(hour+min+sec) {
     reset.innerHTML = 'Reseted';
     setTimeout(() => {
        reset.innerHTML = 'Reset';
     },500);
    }
    hour = 0;
    min = 0;
    sec = 0;
    mil = 0;
    stopswatch.classList.toggle('on');
    stopswatch.innerHTML = 'Start';
    clearInterval(intv);
    display();
});

function display() {
    
    const hr = document.querySelector('.hor');
    const mt = document.querySelector('.min');
    const st = document.querySelector('.sec');
    const mills = document.querySelector('.mil');
    
    const tem = hour<10 ? '0'+hour : hour;
    const tem1 = min<10 ? '0'+min : min;
    const tem2 = sec<10 ? '0'+sec : sec;
    const tem3 = mil<10 ? '0'+mil : mil;
    
    let time = {
        'HOUR': hour,
        'MINUTE': min,
        'SECOND': sec,
        'MILLISECOND': mil
    };
    
    localStorage.setItem('Time', JSON.stringify(time));
    
    hr.innerHTML = tem;
    mt.innerHTML = tem1;
    st.innerHTML = tem2;
    mills.innerHTML = tem3;
}
