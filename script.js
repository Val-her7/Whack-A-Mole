function write() {
    let word = "Hit the moles, +10 points if you success, -5 if you fail. You have 2 minutes to make the highest score possible. Good luck!";
    let i = 0;

    const id = setInterval(() => {
        document.getElementsByClassName("write")[0].textContent += word[i];
        i++;
        if(i > word.length -1) {
            clearInterval(id);
            document.getElementsByClassName("write")[0].textContent +="\n";
        }
    }, 20)  
}

write();

// function time() {
//     let i = 0;
//     const id = setInterval(() => {
//         i++;
//         document.getElementsByClassName("time")[0].textContent = `${i === 1 ? 1 : i} second${i ===1?"":"s"} has passed`;
//         if(i % 60 === 0) {
//             document.getElementsByClassName("minut")[0].textContent = `${(i/60) === 1 ? "a": i/60} minute${(i/60) ===1?"":"s"} has passed`;
//         }  
//     }, 100)
// }

// time()

// function clock() {
//     let sec = 0;
//     let minut = 0;
//     let hours = 0;
//     const id = setInterval(() => {
//         sec++;
//         if(sec !== 60) {
//             document.getElementsByClassName("seconds")[0].textContent = `${sec < 10 ? `0${sec}`: sec}`;
//         } else {
//             minut++;
//             sec = 0;
//             document.getElementsByClassName("seconds")[0].textContent ="00";
//         } 
//         if(minut !== 60) {
//             document.getElementsByClassName("minutes")[0].textContent = `${minut < 10 ? `0${minut}`: minut}`; 
//         } else {
//             hours++;
//             document.getElementsByClassName("hours")[0].textContent = `${hours < 10 ? `0${hours}`: hours}`;
//             minut = 0;
//         }
//         if(minut === 2) {
//             clearInterval(id);
//         } 
//     }, 1000)
// }
// clock();

function clock() {
    let sec = 60;
    let minut = 1;
    const id = setInterval(() => {
        sec--;
        document.getElementsByClassName("minutes")[0].textContent = `${minut < 10 ? `0${minut}`: minut}`;
        document.getElementsByClassName("seconds")[0].textContent = "00";
        if (sec >= 0) {
            document.getElementsByClassName("seconds")[0].textContent = `${sec < 10 ? `0${sec}` : sec}`;
        } 
        if (sec === 0 && minut > 0) {
            minut--;
            sec = 60;
            document.getElementsByClassName("minutes")[0].textContent = `${minut < 10 ? `0${minut}` : minut}`;
        }
        if (minut === 0 && sec === 0) {
            clearInterval(id);
            clearInterval(idMole);
            endGame();
            
        }
    }, 100);
}
let idMole;

function startGame() {
    clock();
    const game = document.getElementsByClassName("game")[0].children;
    idMole = setInterval(() => {
        const mole = game[Math.floor(Math.random()*game.length)];
        mole.classList.add("mole-appear");
        setTimeout(() => {
            mole.classList.remove("mole-appear");
        }, 600);
    }, 1000);
}

const startgame = document.getElementById("start-game")
startgame.addEventListener("click", startGame);

const game = document.getElementsByClassName("game")[0];
game.addEventListener("click",(e) => {
    const points = document.getElementsByClassName("points")[0].textContent;
    let score = Number(points);
    if(e.target.classList[1] === "mole-appear") {
         score += 10; 
    } else {
        score -= 5;
    }
    document.getElementsByClassName("points")[0].textContent = score; 
})

function endGame() {
    const game = document.getElementsByClassName("container")[0];
    game.style.display = "none";
    const endscreen = document.createElement("div");
    endscreen.classList.add("endscreen");
    endscreen.textContent = "Game finished";
    const replay = document.createElement("button");
    replay.id = "reload";
    replay.textContent = "Play again";
    endscreen.appendChild(replay);
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(endscreen);
    document.getElementById("reload").addEventListener("click", () => {
        location.reload();
    });
}


