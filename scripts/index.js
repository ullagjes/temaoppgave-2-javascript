
const MINE_VARER = document.querySelector("#mine-varer");

//HENTER ALLE PRODUKTENE OG GENERER FORSIDE

let mineProdukter = [
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 1",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 2",
        pris: 200
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 3",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 4",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 5",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 6",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 7",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 8",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 9",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 10",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 11",
        pris: 100
    },
    {
        bilde: "./images/test-bilde.jpg",
        produkt: "Vare 12",
        pris: 100
    }
];

function forside() {
    let html = ``;
    mineProdukter.forEach(el => {
        html += `
            <div class="vare">
                <img src="${el.bilde}">
                <h2 class="varenavn">${el.produkt}</h2>
                <div class="priceAndBuy">
                    <h3 class="pris">${el.pris}</h3>
                    <button class="buyBtn">Legg i handlekurv</button>
                </div>
            </div>
            `;
    });
    MINE_VARER.innerHTML = html;
}

forside();

// LEGG TIL VARE I HANDLEKURV
const MIN_HANDLEKURV = document.querySelector("#handlekurv");
let handlekurv = [];

//Lager en unik knapp utav hver knapp med klassen .buyBtn

let knapper = document.querySelectorAll(".buyBtn");
for (const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
}

function leggTilVare(event) {

    // Denne delen av funksjonen sørger for å knytte "click"-eventen fra leggTilVare-funksjonen til alle "legg i handlekurv"-knappene mine på forsiden. Ved å identifisere innholdet til vare, pris og bilde-url, for så å koble dem til event.target kan jeg dermed "pushe" disse inn i handlekurv-arrayet mitt.

    let knapp = event.target;
    let trykketInnhold = knapp.parentElement.parentElement;
    let minVare = trykketInnhold.querySelector(".varenavn").innerText;
    let minPris = trykketInnhold.querySelector(".pris").innerText;
    let mittBilde = trykketInnhold.querySelector("img").src;

    handlekurv.push(
        {
            bilde: mittBilde,
            vare: minVare,
            pris: Number(minPris)
        }
    );
    
    //Kaller på funksjonen som summerer pris-valuen min, som dermed oppdaterer handlekurvens totalsum

    oppdaterHandlevogn();

    //Denne delen av funksjonen oppretter et nytt div-element i handlekurven min. Dette div-elementet henter verdier fra handlekurv-arrayet og bruker egne klasser fra klasser.css for å opprette varene inne i handlekurven.

    let html = ``;
    handlekurv.forEach(el => {
        html += `
        <div class="handlekurvElement">
                <img src=${el.bilde}>
                <span class="handlekurvProdukt">${el.vare}</span>
                <span class="handlekurvPris">${el.pris}</span>
                <input class="handlekurvKvantitet" type="number"> 
                <button class="fjernFraHandlekurv">Fjern</button>
        </div>
        `

    });
    MIN_HANDLEKURV.innerHTML = html;

    //Denne delen av funksjonen sørger for å koble fjernVare-funksjonen min til alle fjern-knappene som opprettes i handlekurven min

    let fjernKnapper = document.querySelectorAll(".fjernFraHandlekurv");

    for (const fjernKnapp of fjernKnapper) {
        fjernKnapp.addEventListener("click", fjernVare);
    }
}


//FJERNE VARER FRA HANDLEKURV
//Denne funksjonen fjerner både innholdet i arrayet og html-innholdet i handlekurven

function fjernVare(event) {
    let fjernObjekt = event.target;
    let valgtProdukt = fjernObjekt.parentElement;
    let valgtProduktNavn = valgtProdukt.querySelector(".handlekurvProdukt").innerText;

    for(let i = 0; i < handlekurv.length; i++) {

        if(handlekurv[i].vare === valgtProduktNavn) {
            handlekurv.splice(i, 1);
            fjernObjekt.parentElement.remove();
        }
    }

    //bruker en if-statement, slik at denne beskjeden dukker opp dersom kurven er tom

    if (handlekurv.length === 0) {
        MIN_HANDLEKURV.innerHTML = `
        <div id="handlekurv"><p>Du har ingen varer i handlekurven.</p>
            </div>
        `
    }

    //Kaller på den samme funksjonen her også for å oppdatere summen i handlevognen

    oppdaterHandlevogn();
}

//Denne funksjonen legger sammen pris-valuen som er igjen i handlekurva både etter at jeg har lagt til og tatt ut elementer fra handlekurv-arrayet

let minSumHer = document.querySelector(".sumHer");

function oppdaterHandlevogn () {
    let sumHer = 0;

    for(let i = 0; i < handlekurv.length; i++){
        sumHer += handlekurv[i].pris;
    }
    minSumHer.innerText = sumHer + "kr";
}

//Handlekurv skal dukke opp når jeg trykker på handlekurvknappen

const KURV_IKON = document.querySelector("#handlekurvBtn");

let knappTrykket = true;
function visHandlekurv() {

    KURV_IKON.style.backgroundColor = "transparent";
    KURV_IKON.style.border = "none";

    if (knappTrykket === true) {
        handlekurvGrid.style.top = "19vh";
        handlekurvGrid.style.right = "0";
        KURV_IKON.style.backgroundColor = "#BEEBE5";
        KURV_IKON.style.border = "1px solid black";
    } else {
        handlekurvGrid.style.top = "-300vh";
        handlekurvGrid.style.right = "0";
    }
    knappTrykket = !knappTrykket;
}

KURV_IKON.addEventListener("click", visHandlekurv);

//_______________________ DIVERSE NOTATER

// grunnleggende struktur for funksjon til flere knapper

/*let knapper = document.querySelectorAll(".buyBtn");

for(const knapp of knapper) {
    knapp.addEventListener("click", test)
}*/