

let questions = null;
let category = [
    {
        "name": "25-26 T1",
        "num": "NO. of Questions: 50",
        "subject": "Subject English"
    },

    {
        "name": "25-26 T2",
        "num": "NO. of Questions: 50",
        "subject": "Subject English"
    },

    {
        "name": "24-25 T2",
        "num": "NO. of Questions: 50",
        "subject": "Subject English"
    },
]
const cards = document.getElementById("cards")

async function get_questions(){
    const response = await fetch("questions.json");
    questions = await response.json();
}

async function start() {
    await get_questions();

    category.forEach(element => {
        const card = document.createElement("div");
        const h1 = document.createElement("h1")
        const p1 = document.createElement("p")
        const p2 = document.createElement("p")

        h1.textContent = element.name;
        p1.textContent = element.num;
        p2.textContent = element.subject;

        card.appendChild(h1)
        card.appendChild(p1)
        card.appendChild(p2)
        card.classList.add("card");

        cards.appendChild(card)

        card.addEventListener("click", event => {
            window.location.href = `index2.html?test=${element.name}`;
        })
    })
}

start()

/*
    <div class="card">
        <h1 id="qname">25-25 T1</h1>
        <p id="numq">NO. of Questions: 50</p>
        <p id="subject">English Test</p>
    </div>
*/