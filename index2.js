
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
    }

    else if(test == "25-26 T2"){
        questions = questions.filter(question => question.time == "25-26-2")
    }

    else if(test == "24-25 T2"){
        questions = questions.filter(question => question.time == "24-25-2")
    }

    console.log(questions)
}
async function start() {
    await get_questions();
    
    const card = document.getElementById("card");
    const options = document.getElementById("options");
    const btn1 = document.querySelectorAll(".btn1")
    const num = document.getElementById("num-question");
    const question = document.getElementById("question");
    const opa = document.getElementById("opa")
    const opb = document.getElementById("opb")
    const opc = document.getElementById("opc")
    const opd = document.getElementById("opd")
    const optbtns = document.querySelectorAll(".op")
    const a = document.getElementById("A")
    const b = document.getElementById("B")
    const c = document.getElementById("C")
    const d = document.getElementById("D")
    const nextbtn = document.getElementById("next");
    const ansbtns = document.querySelectorAll(".btn");
    let scoreEL = document.getElementById("score");
    const side = document.getElementById("side");
    const sidebtn = document.getElementById("sidebtn");
    const hideside = document.getElementById("hideside");
    const select = document.getElementById("select");
    const head = document.getElementById("head");
    const passagecolor = document.getElementsByClassName(".passage");

    let currentquestion = 0;
    let score = 0;
    let x = 0;
    let content = document.getElementById("content")


    const passage = document.createElement("p");
    passage.classList.add("passage")

    if(test == "25-26 T1"){
        passage.textContent = passages[0].text
    }

    else if(test == "25-26 T2"){
        passage.textContent = passages[1].text
    }
    else if(test == "24-25 T2"){
        passage.textContent = passages[2].text
    }


    function display_data(currentquestion){

        if(questions[currentquestion].type == "passage"){
            content.appendChild(passage)
        }

        else{
            if(content.contains(passage)){
                content.removeChild(passage)
            }
           
        }

        try{
            const arr = ["A", "B", "C", "D"]
            num.textContent = `Q-${x + 1}`;
            question.textContent = questions[currentquestion].question;
            opa.textContent = `${arr[0]}-${questions[currentquestion].options.A}`;
            opb.textContent = `${arr[1]}-${questions[currentquestion].options.B}`;
            opc.textContent = `${arr[2]}-${questions[currentquestion].options.C}`;
            opd.textContent = `${arr[3]}-${questions[currentquestion].options.D}`;
            scoreEL.textContent = `${score}/${questions.length}`
        }

        catch(error){
            console.error(error)
        } 

    }

    ansbtns.forEach((btn, i) => {
        btn.addEventListener("click", event => {
            let correctanswer = questions[currentquestion].answer;
            currentquestion++;
            console.log(correctanswer)
            x++;

            optbtns[correctanswer].style.backgroundColor = "lightgreen";
            
            optbtns.forEach((item, index) => {
                if(index != correctanswer){
                    item.style.backgroundColor = "tomato"
                }
            })

            if(i == correctanswer){
                score++;
            }

            scoreEL.textContent = `${score}/${questions.length}`

            ansbtns.forEach(b => {
                b.disabled = true;
            })
        })
    })


    nextbtn.addEventListener("click", event => {
        console.log(currentquestion)
        if(currentquestion >= questions.length){
            question.textContent = "Done";
            question.textContent += `\nYour score is: ${score}/${questions.length}`;
            
            num.style.display = "none"
            optbtns.forEach(btn => {
                btn.style.display = "none"
            })

            ansbtns.forEach(button => {
                button.style.display = "none";
            })

            scoreEL.style.display = "none";
            nextbtn.textContent = "Again"
            nextbtn.addEventListener("click", event => {
                window.location.reload();
            })

        }
        else{
            display_data(currentquestion);
            optbtns.forEach((p) => {
                p.style.backgroundColor = "";
            })
            ansbtns.forEach(b => {
                b.disabled = false;
            });
        }
    });

    sidebtn.addEventListener("click", event => {
        side.classList.add("active");
    })

    hideside.addEventListener("click", () => {
        side.classList.remove("active");
    });

    select.addEventListener("change", event => {
        const color = event.target.value;



        if(color == "dodgerblue"){
            card.style.borderColor = "";
            options.style.borderColor = "";
            side.style.borderColor = "";
            select.style.backgroundColor = ""
            select.style.borderColor = ""
            head.style.backgroundColor = "";
            passage.style.borderColor = "";

            btn1.forEach(btn => {
                btn.style.backgroundColor = "";
                btn.style.borderColor = ""
            })

            ansbtns.forEach(btn => {
                btn.style.backgroundColor = "";
                btn.style.borderColor = ""
            })
        }

        else if(color == "lightgreen"){
            card.style.borderColor = "lightgreen";
            options.style.borderColor = "lightgreen";
            side.style.borderColor = "lightgreen";
            select.style.backgroundColor = "lightgreen"
            select.style.borderColor = "lightgreen"
            head.style.backgroundColor = "lightgreen";
            passage.style.borderColor = "lightgreen";

            btn1.forEach(btn => {
                btn.style.backgroundColor = "lightgreen";
                btn.style.borderColor = "lightgreen"
            })

            ansbtns.forEach(btn => {
                btn.style.backgroundColor = "lightgreen";
                btn.style.borderColor = "lightgreen"
            })
        }

        else if(color == "Orange"){
            card.style.borderColor = "Orange";
            options.style.borderColor = "Orange";
            side.style.borderColor = "Orange";
            select.style.backgroundColor = "orange"
            select.style.borderColor = "orange"
            head.style.backgroundColor = "orange";
            passage.style.borderColor = "orange";

            btn1.forEach(btn => {
                btn.style.backgroundColor = "Orange";
                btn.style.borderColor = "Orange"
            })

            ansbtns.forEach(btn => {
                btn.style.backgroundColor = "Orange";
                btn.style.borderColor = "Orange"
            })
        }

        else if(color == "tomato"){
            card.style.borderColor = "tomato";
            options.style.borderColor = "tomato";
            side.style.borderColor = "tomato";
            select.style.backgroundColor = "tomato"
            select.style.borderColor = "tomato";
            head.style.backgroundColor = "tomato";
            passage.style.borderColor = "tomato";

            btn1.forEach(btn => {
                btn.style.backgroundColor = "tomato";
                btn.style.borderColor = "tomato"
            })

            ansbtns.forEach(btn => {
                btn.style.backgroundColor = "tomato";
                btn.style.borderColor = "tomato"
            })
        }

        localStorage.setItem("themeColor", color)
    })

    const savedColor = localStorage.getItem("themeColor");

    if(savedColor){
        card.style.borderColor = savedColor;
        options.style.borderColor = savedColor;
        side.style.borderColor = savedColor;
        select.style.backgroundColor = savedColor
        select.style.borderColor = savedColor
        head.style.backgroundColor = savedColor;
        passage.style.borderColor = savedColor;

        btn1.forEach(button => {
            button.style.backgroundColor = savedColor;
            button.style.borderColor = savedColor
        });

        ansbtns.forEach(button => {
            button.style.backgroundColor = savedColor;
            button.style.borderColor = savedColor;
        });
    }

    display_data(0)
    display_passage()
}

start();
