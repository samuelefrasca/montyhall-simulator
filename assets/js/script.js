document.getElementById("myRange").addEventListener("input", () => {
    document.getElementById("valoreinizio").textContent = document.getElementById("myRange").value;
});

document.getElementById("bottoneinizio").addEventListener("click", () => {
    const num = parseInt(document.getElementById("myRange").value);
    startMontyHall(num);
});

let start = document.getElementById("start");
let montyHallDiv = document.getElementById("mhgrid")
let subtitle = document.getElementById("subtitle")
let car = 0;
let numeroporte = 0;
let doors = [];

function startMontyHall(num) {
    numeroporte = num;
    // Posizione dell'auto
    car = Math.floor(Math.random() * num) + 1;
    for (let i = 0; i < num; i++) {
        if (i === car - 1) {
            doors.push(true);
        }
        else {
            doors.push(false);
        }
    }

    // Cancelliamo il Div
    start.innerHTML = "";

    // Inseriamo le porte
    let porte = ""
    for (let i = 0; i < num; i++) {
        porte += `<div class="porta"><img class="portaimg" height=200px; src="assets/img/door.png"><button onclick="chooseDoor(${car}, ${i + 1}, ${doors[i]})">Porta ${i + 1}</button></div>`;
    }
    subtitle.innerHTML = "<h1>Scegli una porta</h1>";
    montyHallDiv.innerHTML += porte;
}

function chooseDoor(car, index, bool) {
    subtitle.innerHTML = "";
    subtitle.innerHTML += "<h1>Cambia la scelta o scegli nuovamente la porta iniziale</h1>";
    if (bool) {
        let anotherDoor = Math.floor(Math.random() * numeroporte) + 1;
        while (anotherDoor === car) {
            anotherDoor = Math.floor(Math.random() * numeroporte) + 1;
        }
        // Ricancelliamo le porte
        montyHallDiv.innerHTML = "";
        // Inseriamo nuovamente le porte
        let porte = ""
        for (let i = 0; i < numeroporte; i++) {
            if (i === index - 1) {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/door.png"><button onclick="portaFinale(true)">Porta ${i + 1}</button></div>`;
            }
            else if (i === anotherDoor - 1) {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/door.png"><button onclick="portaFinale(false)">Porta ${i + 1}</button></div>`;
            }
            else {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/goat.png"><button onclick="portaFinale(false)">Porta ${i + 1}</button></div>`;
            }
        }
        montyHallDiv.innerHTML += porte;
    }
    else {
        // Ricancelliamo le porte
        montyHallDiv.innerHTML = "";
        // Inseriamo nuovamente le porte
        let porte = ""
        for (let i = 0; i < numeroporte; i++) {
            if (i === index - 1) {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/door.png"><button onclick="portaFinale(false)">Porta ${i + 1}</button></div>`;
            }
            else if (i === car - 1) {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/door.png"><button onclick="portaFinale(true)">Porta ${i + 1}</button></div>`;
            }
            else {
                porte += `<div class="porta"><img class="portaimg" src="assets/img/goat.png"></div>`;
            }
        }
        montyHallDiv.innerHTML += porte;
    }
}

function portaFinale(bool) {
    montyHallDiv.innerHTML = "";
    subtitle.innerHTML = "";
    let porte = "";
    for (let i = 0; i < numeroporte; i++) {
        if (i === car - 1) {
            porte += `<div class="porta"><img class="portaimg" height=200px; src="assets/img/car.png"></div>`;
        }
        else {
            porte += `<div class="porta"><img class="portaimg" height=200px; src="assets/img/goat.png"></div>`;
        }
    }
    let esito = bool ? `<h1 style="color: green">Hai vinto!</h1>` : `<h1 style="color: red">Hai perso!</h1>`;
    subtitle.innerHTML += esito;
    subtitle.innerHTML += `<button onclick="location.reload()">Premi per rigiocare</button>`;
    montyHallDiv.innerHTML += porte;
}