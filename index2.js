
const params = new URLSearchParams(window.location.search)

const test = params.get("test")

let questions = null;
let passages = null;

async function get_questions(){
    const response = await fetch("questions.json");
    questions = await response.json();

    const response2 = await fetch("passage.json");
    passages = await response2.json()

    if(test == "25-26 T1"){
        questions = questions.filter(question => question.time == "25-26-1")
        passages = passages[0].text
    }

    else if(test == "25-26 T2"){
        questions = questions.filter(question => question.time == "25-26-2")
        passages = passages[1].text
    }

    else if(test == "24-25 T2"){
        questions = questions.filter(question => question.time == "24-25-2")
        passages = passages[2].text
    }

    console.log(passages)
}

async function displaydata() {
    await get_questions();

    // the top (passage and score)

    const content = document.getElementById("content");

    const cards = document.getElementById("cards")

    const passage = document.getElementById("passage")
    passage.textContent = passages;

    content.prepend(passage);

    const scoreEl = document.getElementById("score");
    const scoreh1 = document.createElement("h1")
    const inp = document.createElement("div");
    const qans = document.createElement("div");
    inp.id = "inp";
    inp.style.display = "flex";
    inp.style.justifyContent = "center";
    inp.style.alignItems = "center";
    inp.style.marginTop = "20px";
    

    
    scoreh1.textContent = "Your Score";

    const scorenum = document.createElement("p");

    let score = 0;
    let answered = 0;
    qans.textContent = `${answered}/50 Questions Answered`;
    qans.style.marginTop = "10px"

    inp.style.setProperty("--before-width", `${score}%`);


    scorenum.textContent = `${score}%`;
    scorenum.style.fontSize = "1.3em"

    scoreEl.prepend(scoreh1)
    inp.append(scorenum)
    scoreEl.append(inp);
    scoreEl.append(qans);
    scoreEl.style.padding = "10px"



    content.prepend(scoreEl)

    // sidebar

    const side = document.getElementById("side");
    const sidebtn = document.getElementById("sidebtn");
    const hideside = document.getElementById("hideside");

    sidebtn.addEventListener("click", event => {
        side.classList.add("active")
    })

    hideside.addEventListener("click", event => {
        side.classList.remove("active")
    })

    const select = document.getElementById("select");

    select.addEventListener("change", event => {
        const color = event.target.value;

        if(color == "dodgerblue"){
            document.documentElement.style.setProperty("--primary-color", color)
        }

        else if(color == "lightgreen"){
            document.documentElement.style.setProperty("--primary-color", color)
        }

        else if(color == "tomato"){
            document.documentElement.style.setProperty("--primary-color", color)
        }

        else if(color == "orange"){
            document.documentElement.style.setProperty("--primary-color", color)
        }

        window.localStorage.setItem("theme", color);
    })

    const savedcolor = localStorage.getItem("theme");

    if(savedcolor){
        document.documentElement.style.setProperty("--primary-color", savedcolor)
    }

    questions.forEach((q, index) => {

        /*
        <div class="card">
            <h2 id="num-question">Q0</h2>
            <p id="question">Whats Your name?</p>
            <div id="options">
                <p id="opa" class="op">A</p>
                <p id="opb" class="op">B</p>
                <p id="opc" class="op">C</p>
                <p id="opd" class="op">D</p>
            </div>
            <div id="answers">
                <button id="A" class="btn" class="btn1"><i class="fa-solid fa-font" style="color: black;"></i></button>
                <button id="B" class="btn" class="btn1"><i class="fa-solid fa-b" style="color: black;"></i></button>
                <button id="C" class="btn" class="btn1"><i class="fa-solid fa-c" style="color: black"></i></button>
                <button id="D" class="btn"  class="btn1"><i class="fa-solid fa-d" style="color: black;"></i></button>
            </div>
            <div id="btm">
                <p id="score"></p>
                <button id="next" class="btn1">Next</button>
            </div>

        </div>
        */
        const card = document.createElement("div");
        const slides = document.getElementById("slides")
        card.classList.add("card");

        const num_question = document.createElement("h1");
        
        const question = document.createElement("p")

        const options = document.createElement("div");
        options.classList.add("options")
        const answers = document.createElement("div");
        const btm = document.createElement("div");
        btm.classList.add("btm")

        const check = document.createElement("button");
        check.classList.add("check");
        check.textContent = "Answer";
        btm.appendChild(check)

        answers.classList.add("ans")

        const opa = document.createElement("p")
        opa.textContent = `A-${q.options.A}`
        options.appendChild(opa)
        const opb = document.createElement("p")
        opb.textContent = `B-${q.options.B}`
        options.appendChild(opb)
        const opc = document.createElement("p")
        opc.textContent = `C-${q.options.C}`
        options.appendChild(opc)
        const opd = document.createElement("p")
        opd.textContent = `D-${q.options.D}`
        options.appendChild(opd)

        opa.classList.add("ops")
        opb.classList.add("ops")
        opc.classList.add("ops")
        opd.classList.add("ops")

        const ana = document.createElement("button")
        ana.textContent = `A`
        ana.classList.add("answers")
        answers.appendChild(ana)
        const anb = document.createElement("button")
        anb.textContent = `B`
        anb.classList.add("answers")
        answers.appendChild(anb)
        const anc = document.createElement("button")
        anc.textContent = `C`
        anc.classList.add("answers")
        answers.appendChild(anc)
        const and = document.createElement("button")
        and.textContent = `D`;
        and.classList.add("answers")
        answers.appendChild(and)


        num_question.textContent = `Q${index+1}`;
        question.textContent = q.question;

        card.appendChild(num_question);
        card.appendChild(question);
        card.appendChild(options);
        card.appendChild(answers);
        card.appendChild(btm);

        slides.appendChild(card);
         
        // check variables
        const correctanswer = q.answer;
        const ans = answers.querySelectorAll(".answers");
        const ops = options.querySelectorAll(".ops")
        console.log(correctanswer)
        console.log(ans)


        ans.forEach((btn, i) => {
            btn.addEventListener("click", event => {
                if(i == correctanswer){
                    ops[correctanswer].style.backgroundColor = "lightgreen";
                    check.textContent = "Right";
                    check.style.backgroundColor = "lightgreen";
                    score += 2;
                    scorenum.textContent = `${score}%`;
                    inp.style.setProperty("--before-width", `${score}%`);
                    answered++;
                    qans.textContent = `${answered}/50 Questions Answered`
                }

                else if(i != correctanswer){
                    ops[correctanswer].style.backgroundColor = "lightgreen";
                    ops[i].style.backgroundColor = "tomato";
                    check.textContent = "Wrong";
                    check.style.backgroundColor = "tomato";
                    answered++;
                    qans.textContent = `${answered}/50 Questions Answered`
                }

                ans.forEach(btn => {
                    btn.disabled = true
                })

            })
        })

    })
}

displaydata()
