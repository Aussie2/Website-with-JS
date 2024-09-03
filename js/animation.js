// Austin Tobin FRH7486
// 635 Austin Tobin FRH7486 website1 JS
let yoke = document.getElementById('yoke');
document.getElementById('animation-start-btn').addEventListener('click', function(){
    let player = new Audio('audio/beep.mp3');
    player.play();
    yoke.style.animationPlayState = 'running';
});

document.getElementById('animation-end-btn').addEventListener('click', function(){
    let player = new Audio('audio/beep.mp3');
    player.play();
    yoke.style.animationPlayState = 'paused';
});

document.getElementById('animation-duration').addEventListener('change', function(e){
    let speed = e.currentTarget.value;
    // console.log(speed);
    document.getElementById('animation-speed').innerText = speed
    
    yoke.style.animationDuration = speed +'s';

    // test playing sounds
    let player = new Audio('audio/blop.wav');
    player.play();
});

// play a sound on the ned of each animation iteration
yoke.addEventListener('animationiteration', function(){// silenced to prevent insanity fro the developer!
    // console.log('end of animation');
    let player = new Audio('audio/beep.mp3');
    player.play();
});
