
class Exam {
  constructor() {
    this.state = {
      name: "",
      questions: [],
      answers:[],
      index: 0,
      time: 0,
      score: 0,
      status:-1,
    };
    this.setState = function (object,callback) {
      Object.entries(object).map((entry) => {
        this.state[entry[0]] = entry[1];
      });
      callback&&callback(this.state)
    };
    this.addAnswer=function (question,option,callback){
        let exist = this.getAnswer(question);
        if(exist){
          this.updateAnswer(question,option)
        }
        else{
          const {answers}=this.state;
          this.setState({answers:[...answers,{text:question.text,option}]})
        }
        callback&&callback(this.state)
    }
    this.getAnswer=function(question){
      const {answers}=this.state;
      let find = answers.filter(function(o){return o.text===question.text})[0];
      if(find){
        return find;
      }
      else{
        return;
      }
    }
    this.updateAnswer=function(question,option){
       try{
        const {answers}=this.state;
        const answer = answers.filter(function(o){
            return o.text===question.text;
        })[0];
       
        
        if(answer){
            let index = answers.indexOf(answer);
            answers[index]={text:question.text,option};
            this.setState({answers})
        }
        
       }
       catch(e){
           throw new Error(e);
       }
    }
    this.addQuestion = function (question) {
      const { questions } = this.state;
      this.setState({ questions: [...questions, question] });
    };
    this.updateQuestion = function (index, question) {
      const { questions } = this.state;
      questions[index] = question;
      this.setState({ questions });
    };
    this.next = function (callback) {
      const {index}=this.state;
      this.setState({ index: index + 1 });
      callback&&callback(this.state);
    };
    this.prev = function (callback) {
      const {index}=this.state;
      this.setState({ index: index -1 });
      callback&&callback(this.state);
    };
    this.current = function () {
      const {index,questions}=this.state;
      return questions[index];
    };
    this.result= function (){
        try{
          let correct= 0;
          let empty = 0;
          let wrong = 0;
          let score=0;
            this.setState({score:0});
            const {questions,answers} = this.state;
            for (let i = 0; i <questions.length; i++){
                let question = questions[i];
                let correctAnswer = question.options.filter(function(o){return o.answer===true})[0];
                let findAnswer = answers.filter(function(o){
                    return question.text===o.text;
                })[0];
                if(findAnswer){
                    let studentAnswer = findAnswer.option;
                    if(studentAnswer===correctAnswer){
                        correct++;
                        score++;
                    
                    }
                    else{
                        // answer is wrong!
                        wrong++;
                    }
                }
                else{
                    // not answered!
                    console.log("not answered");
                    empty++;
                }
            }
            this.setState({result:{correct,wrong,empty,score}},()=>{
              localStorage.setItem("state",JSON.stringify(this.state))
            });
        }
        catch(e){
            throw new Error(e)
        }
    }
    this.stop=function(){
      this.setState({time:0})
      clearInterval(this.state.timer)
    }
    this.start=function(callback){
      this.setState({status:1})
      let {time}= this.state;
      let interval = setInterval(()=>{
        this.setState({timer:interval})
        if(time===0){
          this.setState({status:0},(state)=>{
            callback&&callback(state)
            clearInterval(interval);
          })
          
        }
        else{
          console.log("count")
          time--;
          this.setState({time},(state)=>{
            callback&&callback(state)
          })
        }
      },1000)
    }
  }
}


