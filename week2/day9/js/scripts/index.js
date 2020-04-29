const exam = new Exam();
let examState = localStorage.getItem("state");
if (examState) {
  examState = JSON.parse(examState);
  exam.setState(examState);
}
window.onload = function () {
  if (exam.state.questions.length > 0) {
    if (exam.state.status === 1) {
      renderQuestion();
      exam.start((state) => {
        const { time } = state;
        localStorage.setItem("state", JSON.stringify(state));
        updateTime(time);
      });
    } else {
      endExam();
    }
  } else {
    renderWelcomeScreen();
  }
};
function updateTime(time) {
  let timer = document.querySelector("#timer");
  if (time !== 0) {
    if (time <= 300) {
      timer.style.color = "#88fc90";
    }
    if (time < 120) {
      timer.style.color = "#ffe500";
    }
    if (time < 10) {
      timer.style.color = "#ef3b59";
    }
    timer.innerText = time.toString().toHHMMSS();
  } else {
    timer.innerText = "Finished";
  }
}
function fetchQuestions(category, amount, difficulty, callback) {
  let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  let result = GET(url, (data) => {
    let array = [];
    if (data) {
      const questions = data.results;
      for (let i = 0; i < questions.length; i++) {
        let eachQuestion = questions[i];
        let {
          category,
          question,
          type,
          correct_answer,
          incorrect_answers,
          difficulty,
        } = eachQuestion;
        let options = [{ text: correct_answer, answer: true }];
        question=question.replace("&quot;", '');
        incorrect_answers.map((option) => {
          option=option.replace("&quot;", '');
          options.push({
            text: option,
            answer: false,
          });
        });

        let questionObject = {
          type,
          category,
          text:question,
          options,
          difficulty,
        };
        array.push(questionObject);
      }
      callback && callback(array);
    }
  });
}

function renderWelcomeScreen() {
  let nextButton = document.querySelector("#next");
  nextButton.onclick = null;
  let content = document.querySelector("#content");
  content.innerHTML = "";
  content.style.paddingTop = "50px";
  let category = 25;
  let amount = 5;
  exam.setState({ name: "Art" }, (state) => {
    localStorage.setItem("state", JSON.stringify(state));
  });
  let difficulty = "easy";
  addElement(content, "h1", {
    innerText: "Configure Your Exam",
    style: "padding-bottom:20px",
  });
  let categorySelector = addElement(content, "select", {
    name: "categories",
    label: "Categories",
    onchange: function () {
      category = categorySelector.value;
      let brand = document.querySelector("#exam-category");
      let name = categories.filter(function (o) {
        return o.no === categorySelector.value;
      })[0].name;
      exam.setState({ name }, (state) => {
        localStorage.setItem("state", JSON.stringify(state));
      });
      brand.innerText = `${name} Exam`;
    },
  });
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    addElement(categorySelector, "option", {
      innerText: category.name,
      value: category.no,
      name: category.name,
    });
  }
  let numberSelector = addElement(content, "select", {
    name: "numbers",
    label: "Number Of Questions",
    onchange: function () {
      amount = numberSelector.value;
    },
  });
  for (let i = 5; i <= 20; i += 5) {
    addElement(numberSelector, "option", { innerText: i, value: i });
  }
  let difficultySelector = addElement(content, "select", {
    name: "difficulty",
    label: "Difficulty",
    onchange: function () {
      difficulty = difficultySelector.value;
    },
  });
  for (let i = 0; i < levels.length; i++) {
    let level = levels[i];
    addElement(difficultySelector, "option", {
      innerText: level.text,
      value: level.value,
    });
  }
  nextButton.onclick = function () {
    console.log("clicked");
    nextButton.innerText = "Loading...";
    nextButton.disabled = true;
    fetchQuestions(category, amount, difficulty, (questions) => {
      exam.setState(
        { questions, time: questions.length * 60, difficulty },
        (state) => {
          localStorage.setItem("state", JSON.stringify(state));
        }
      );
      renderExamInfo();
    });
  };
}

function renderExamInfo() {
  let nextButton = document.querySelector("#next");
  nextButton.disabled = false;
  let prevButton = document.querySelector("#prev");
  prevButton.innerHTML = "&#10218; Configurations";
  prevButton.disabled = false;
  prevButton.onclick = function () {
    exam.setState({}, () => {
      localStorage.setItem("state", null);
      // nextButton.innerHTML="Next &#10219;"
      window.location.reload();
    });
  };
  prevButton.style.visibility = "visible";
  nextButton.innerHTML = "Start &#10219;";
  let content = document.querySelector("#content");
  content.innerHTML = "";
  content.className = "center col";
  addElement(content, "h1", {
    innerText: exam.state.name + " Exam",
    style: "margin-bottom:20px",
  });
  addElement(content, "h3", {
    innerText: `Time : ${exam.state.time.toString().toHHMMSS()}`,
    style: "margin-bottom:20px",
  });
  addElement(content, "h3", {
    innerText: `Difficulty : ${exam.state.difficulty.toUpperCase()}`,
    style: "margin-bottom:20px",
  });
  addElement(content, "h3", {
    innerText: `Number Of Questions : ${exam.state.questions.length}`,
    style: "margin-bottom:20px",
  });
  nextButton.onclick = function () {
    renderQuestion();
    exam.start((state) => {
      const { time } = state;
      localStorage.setItem("state", JSON.stringify(state));
      updateTime(time);
    });
  };
}

function renderQuestion() {
  let activeOption = -1;
  const { index } = exam.state;
  let brand = document.querySelector("#exam-category");
  brand.innerText = `Question ${index + 1}`;
  let content = document.querySelector("#content");
  content.innerHTML = "";
  content.className = "center col";
  let questionContainer = document.createElement("div");
  questionContainer.className = "fade-in";
  content.appendChild(questionContainer);
  let nextButton = document.querySelector("#next");
  nextButton.innerHTML =
    exam.state.questions.length === index + 1
      ? `Result &#10219`
      : "Next &#10219";
  nextButton.onclick = function () {
    if (exam.state.questions.length === index + 1) {
      endExam();
    } else {
      exam.next((state) => {
        renderQuestion();
        localStorage.setItem("state", JSON.stringify(state));
      });
    }
  };
  let prevButton = document.querySelector("#prev");
  prevButton.innerHTML = "&#10218; Previous";
  prevButton.onclick = function () {
    exam.prev((state) => {
      localStorage.setItem("state", JSON.stringify(state));
      renderQuestion();
    });
  };
  prevButton.style.visibility = index === 0 ? "hidden" : "visible";
  prevButton.disabled = index === 0;
  let question = exam.current();
  addElement(questionContainer, "h1", { innerHTML: question.text });
  for (let i = 0; i < question.options.length; i++) {
    let option = question.options[i];
    let className = exam.getAnswer(question)
      ? exam.getAnswer(question).option.text === option.text
        ? "option-selected"
        : "option"
      : "option";

    //console.log({option,prevOption:exam.getAnswer(question).option})
    let optionContainer = addElement(questionContainer, "div", {
      className,
      onclick: () => {
        exam.addAnswer(question, option, (state) => {
          localStorage.setItem("state", JSON.stringify(state));
          if (state) {
            renderQuestion();
          }
        });
      },
    });

    let radioContainer = addElement(optionContainer, "div", {
      className: "option-radio",
    });
    let optionRadio = addElement(radioContainer, "input", {
      type: "radio",
      checked: false,
    });
    let optionText = addElement(optionContainer, "div", {
      className: "option-text",
      innerText: option.text,
    });
  }
}

function endExam() {
  let nextButton = document.querySelector("#next");
  exam.setState({ time: 0, status: 0 }, (state) => {
    localStorage.setItem("state", JSON.stringify(state));
    let brand = document.querySelector("#exam-category");
    let timer = document.querySelector("#timer");
    brand.innerText = `Exam`;
    let content = document.querySelector("#content");
    content.innerHTML = "";
    nextButton.disabled=true;
    nextButton.style.visibility="hidden";
    content.className = "center col";
    content.style="width:100%";
    exam.stop();
    timer.innerHTML = "<button id='restart'>Restart</button>";
    let restart = document.querySelector("#restart")
    restart.onclick=function(){
      exam.setState({},()=>{
        localStorage.removeItem("state");
        window.location.reload();
      })
    }
    exam.result();

    let result = exam.state.result;
    addElement(content,"h1",{style:"flex-grow:1;margin-bottom:25px;",innerText:"Exam Result"});
    addElement(content,"h3",{style:"flex-grow:1;margin-bottom:25px;",innerText:`Correct :  ${result.correct}`})
    addElement(content,"h3",{style:"flex-grow:1;margin-bottom:25px;",innerText:`Empty :  ${result.empty}`})
    addElement(content,"h3",{style:"flex-grow:1;margin-bottom:25px;",innerText:`Wrong :  ${result.wrong}`})
    addElement(content,"h3",{style:"flex-grow:1;margin-bottom:25px;",innerText:`Score :  ${result.score}`})
  });
}
