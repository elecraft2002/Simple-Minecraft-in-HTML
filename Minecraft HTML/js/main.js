let worldRender = document.getElementById("world");
let width = 100;
let speed = 10;
let blockNum = -1;
let worldHeight = 50;
let chunkSize = 16;
let world = [];
let mouseSensitivity = 2;
let blockType = 1;

//Generate world
class Block {
    constructor(x, y, z, id) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        blockNum++;
    }
    create() {
        //console.log(this.x);
        //console.log(-this.y);
        //console.log(this.z);
        let block = `  
        <div id="${this.x};${this.y};${this.z}" class="cube container type${this.id} num${blockNum}" style="
        transform: translate3d(${this.x * width}px,${this.y * width}px,${this.z * width}px);
        ">
            <div onclick="create(${this.x},${this.y},${this.z + 1})" class="cube f"></div>
            <div onclick="create(${this.x},${this.y},${this.z - 1})" class="cube ba"></div>
            <div onclick="create(${this.x + 1},${this.y},${this.z})" class="cube r"></div>
            <div onclick="create(${this.x - 1},${this.y},${this.z})" class="cube l"></div>
            <div onclick="create(${this.x},${this.y - 1},${this.z})" class="cube t"></div>
            <div style="box-shadow: inset 0 0 0 ${width}px rgba(0, 0, 0, .6)" onclick="create(${this.x},${this.y + 1},${this.z})" class="cube bt"></div>
        </div>`;
        worldRender.innerHTML += block;
    }
    save() {
        world[blockNum] = { x: this.x, y: this.y, z: this.z, id: this.id };
    }
    checkSidesAdd() {
        //Front side
        if (document.getElementById(`${this.x};${this.y};${this.z + 1}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("f")[0].style.display = "none";
            document.getElementById(`${this.x};${this.y};${this.z + 1}`).getElementsByClassName("ba")[0].style.display = "none";
        }
        //Back side
        if (document.getElementById(`${this.x};${this.y};${this.z - 1}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("ba")[0].style.display = "none";
            document.getElementById(`${this.x};${this.y};${this.z - 1}`).getElementsByClassName("f")[0].style.display = "none";
        }
        //Left side
        if (document.getElementById(`${this.x - 1};${this.y};${this.z}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("l")[0].style.display = "none";
            document.getElementById(`${this.x - 1};${this.y};${this.z}`).getElementsByClassName("r")[0].style.display = "none";
        }
        //Right side
        if (document.getElementById(`${this.x + 1};${this.y};${this.z}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("r")[0].style.display = "none";
            document.getElementById(`${this.x + 1};${this.y};${this.z}`).getElementsByClassName("l")[0].style.display = "none";
        }
        //Top side
        if (document.getElementById(`${this.x};${this.y + 1};${this.z}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("bt")[0].style.display = "none";
            document.getElementById(`${this.x};${this.y + 1};${this.z}`).getElementsByClassName("t")[0].style.display = "none";
        }
        //Bottom side
        if (document.getElementById(`${this.x};${this.y - 1};${this.z}`) != null) {

            document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("t")[0].style.display = "none";
            document.getElementById(`${this.x};${this.y - 1};${this.z}`).getElementsByClassName("bt")[0].style.display = "none";
        }
    }
    addBrightness() {
        let brightnessTop = .6;
        let brightnessSide = .5;
        for (let i = 0; i < world.length; i++) {
            //Přidá stín sobě Nahoře
            if (world[i].x == this.x && world[i].z == this.z && world[i].y < (this.y)) {

                document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("t")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessTop})`;
            }
            //Přidá stín ostatním nahoře
            if (world[i].x == this.x && world[i].z == this.z && world[i].y > (this.y)) {

                document.getElementById(`${this.x};${world[i].y};${this.z}`).getElementsByClassName("t")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessTop})`;
            }

            //Přidá stín ostatním ze strany
            if (world[i].x == (this.x + 1) && world[i].z == this.z && world[i].y > (this.y)) {//Vlevo

                document.getElementById(`${this.x + 1};${world[i].y};${this.z}`).getElementsByClassName("l")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }
            if (world[i].x == (this.x - 1) && world[i].z == this.z && world[i].y > (this.y)) {//Vpravo

                document.getElementById(`${this.x - 1};${world[i].y};${this.z}`).getElementsByClassName("r")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }

            if (world[i].x == this.x && world[i].z == (this.z + 1) && world[i].y > (this.y)) {//Vzadu

                document.getElementById(`${this.x};${world[i].y};${this.z + 1}`).getElementsByClassName("ba")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }
            if (world[i].x == this.x && world[i].z == (this.z - 1) && world[i].y > (this.y)) {//Vpředu

                document.getElementById(`${this.x};${world[i].y};${this.z - 1}`).getElementsByClassName("f")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }
            //Přidá stín sobě ze strany
            if (world[i].x == (this.x - 1) && world[i].z == this.z && world[i].y < (this.y)) {//Vlevo

                document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("l")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }
            if (world[i].x == (this.x + 1) && world[i].z == this.z && world[i].y < (this.y)) {//Vpravo

                document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("r")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }

            if (world[i].x == this.x && world[i].z == (this.z - 1) && world[i].y < (this.y)) {//Vzadu

                document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("ba")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }
            if (world[i].x == this.x && world[i].z == (this.z + 1) && world[i].y < (this.y)) {//Vpředu

                document.getElementById(`${this.x};${this.y};${this.z}`).getElementsByClassName("f")[0].style.boxShadow = `inset 0 0 0 ${width}px rgba(0, 0, 0, ${brightnessSide})`;
            }


        }
    }
}

class World {
    load() {
        worldRender.innerHTML = "";
        let worldNew = JSON.parse(localStorage.getItem("world"))
        for (let i = 0; i < worldNew.length; i++) {
            let x = worldNew[i].x;
            let y = worldNew[i].y;
            let z = worldNew[i].z;
            let id = worldNew[i].id;
            create(x, y, z, id);
        }
    }
    save() {
        localStorage.setItem("world", JSON.stringify(world));
    }

    createFlatWorld() {
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                create(x, 0, z, 1)

            }
        }
    }
}

let svet = new World;
function create(x, y, z, id) {
    if (id === undefined) {
        id = Math.floor(Math.random(1) * 2) + 1;
    }
    if (y <= 0) {
        let block = new Block(x, y, z, id);
        block.create();
        block.save();
        block.checkSidesAdd();
        block.addBrightness();
    }
}


//Controlls
let camera = document.getElementById("camera");
let movement = document.getElementById("movement");
let windowGame = document.getElementById("windowGame");
let up = false,
    right = false,
    down = false,
    left = false,
    space = false,
    shift = false,
    x = window.innerWidth / 2 - 130 / 2,
    z = window.innerHeight / 2 - 130 / 2,
    y = 0,
    rx = 0,
    ry = 0,
    rz = 0,
    rxOld = 0,
    rxFinal = 0,
    ryOld = 0,
    ryFinal = 0,
    angle = 0;
document.addEventListener('keydown', press)
function press(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
        up = true
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        right = true
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
        down = true
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
        left = true
    }
    if (e.keyCode === 32 /* space */) {
        space = true
    }
    if (e.keyCode === 16 /* shift */) {
        shift = true
    }
}
document.addEventListener('keyup', release)
function release(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
        up = false
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        right = false
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
        down = false
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
        left = false
    }
    if (e.keyCode === 32 /* space */) {
        space = false
    }
    if (e.keyCode === 16 /* shift */) {
        shift = false
    }
}

function gameLoop() {
    if (up) {
        x += - Math.sin(angle) * speed;
        z += + Math.cos(angle) * speed;
    }
    if (right) {
        x += - Math.cos(angle) * speed;
        z += - Math.sin(angle) * speed;
    }
    if (down) {
        x += + Math.sin(angle) * speed;
        z += - Math.cos(angle) * speed;
    }
    if (left) {
        x += + Math.cos(angle) * speed;
        z += + Math.sin(angle) * speed;
    }
    if (space) {
        y = y + speed
    }
    if (shift) {
        y = y - speed
    }
    movement.style.transform = ` translate3d(${x}px,${y}px,${z}px)`;
    if (isTabActive) {
        window.requestAnimationFrame(gameLoop)
    }
}

window.requestAnimationFrame(gameLoop);

function getPos(e) {
    ry = e.clientX;
    rx = - e.clientY;
    //Rozdíl v pozici
    rx = (rx - rxOld) / mouseSensitivity;
    ry = (ry - ryOld) / mouseSensitivity;

    rxOld = - e.clientY;
    ryOld = - e.clientX;

    rxFinal += rx;

    //lock rotation
    if (rxFinal >= 90) {
        rxFinal = 90;
    }
    if (rxFinal <= -90) {
        rxFinal = -90;
    }

    // console.log(rxFinal)
    //Úhel v radianech
    angle = ry * Math.PI / 180;

    camera.style.transform = `translateZ(1000px) rotateX(${rxFinal}deg) rotateY(${ry}deg)`;
}

//Optimalizace pozastaví render, když je obrazovka neaktivní

var isTabActive;

window.onfocus = function () {
    isTabActive = true;
    window.requestAnimationFrame(gameLoop);
};

window.onblur = function () {
    isTabActive = false;
};