function getNameRegion(choiceRegion){
    switch(choiceRegion){
        case "Amérique-Sud":
            return "Amérique du Sud";
        break;
        case "Europe-Ouest":
            return "Europe de l'Ouest";
        break;
        case "Europe-Est":
            return "Europe de l'Est";
        break;
        default:
            return "Introuvable";
    }
}

function createTableCountries(choiceRegion){
    let tableCountries = new Array();
    for(let i = 0; i < countries.length; i++){
        if(countries[i].region == choiceRegion){
            tableCountries.push(countries[i].name);
        }
    }
    return tableCountries;
}

function createTableFlags(choiceRegion){
    let tableFlags = new Array();
    for(let i = 0; i < countries.length; i++){
        if(countries[i].region == choiceRegion){
            tableFlags.push(countries[i].flag);
        }
    }
    return tableFlags;
}

function start()
{
    let random = Math.floor((Math.random() * (createTableCountries(region).length) - 1 ) + 1);

    if(localStorage.getItem("countryInProgress") !== null){
      random = localStorage.getItem("countryInProgress");
      for(let i = 1; i <= 4; i++){
        $("#choice"+i).attr("value", localStorage.getItem("choice"+i));
      }
    }else if(localStorage.getItem("dataCountries") !== null){
        let tabCountries = JSON.parse(localStorage.getItem("dataCountries"));
        while(tabCountries.indexOf(random) != -1){
          random = Math.floor((Math.random() * (createTableCountries(region).length) - 1 ) + 1);
        }
    }
    localStorage.setItem("countryInProgress", random);

    let country = createTableCountries(region)[random];
    let flag = createTableFlags(region)[random];
    $("#drapeau").attr("src", "assets/images/"+flag);
    let randomButton = Math.floor((Math.random() * 4) + 1);
    let buttonCountryToFind = $("#choice"+randomButton);

    if(localStorage.getItem("choiceWinner") === null){
      buttonCountryToFind.attr("value", country);
      localStorage.setItem("choice"+randomButton, buttonCountryToFind.val());
      localStorage.setItem("choiceWinner", randomButton);
    }

    if(localStorage.getItem("dataCountries") != null){
      let monTab = JSON.parse(localStorage.getItem("dataCountries"));
      monTab.push(random);
      localStorage.setItem("dataCountries", JSON.stringify(monTab))
    }else{
      dataCountries.push(random);
      localStorage.setItem("dataCountries", JSON.stringify(dataCountries));
    }

    for(let i = 1; i <= 4; i++)
    {
        while($("#choice"+i).attr("value") == null)
        {
            let random = Math.floor((Math.random() *
             (createTableCountries(region).length) - 1 ) + 1);
            if(createTableCountries(region)[random] != $("#choice1").val()
            && createTableCountries(region)[random] != $("#choice2").val()
            && createTableCountries(region)[random] != $("#choice3").val()
            && createTableCountries(region)[random] != $("#choice4").val())
            {
                $("#choice"+i).attr("value", createTableCountries(region)[random]);
                localStorage.setItem("choice"+i, createTableCountries(region)[random]);
            }
        }
    }
    selectChoice(buttonCountryToFind);
}

function endGame(){
  if(getQuestion() >= 10){
    $("#nextQuestion").hide();
    getScore() == null ? $("#yourScore").text("0") : $("#yourScore").text(getScore());
    if(getScore() >= 5){
      $("#winbox").addClass("alert-success");
      $("#textWin").text("Bravo! Vous avez répondu correctectement à");
      $("#win").toggle('slow')
      $("#jeu").fadeOut(4000);
    }else{
      $("#winbox").addClass("alert-danger");
      $("#textWin").text("Dommage! Vous pouvez faire mieux, vous avez répondu correctement à");
      $("#win").toggle('slow');
      $("#jeu").fadeOut(4000);
    }
    localStorage.clear();
  }
}

function selectChoice(buttonCountryToFind){
  $(".choice").click(function(){
    analyseChoice($(this), buttonCountryToFind);

  });
}

function analyseChoice(choice, buttonCountryToFind){
  if(choice.val() == localStorage.getItem("choice"+localStorage.getItem("choiceWinner"))){
    choice.removeClass("btn-default").addClass("btn-success");
    cleanQuestion();
    lockButtons();
    setScore();
    setQuestion();
    nextQuestion();
    endGame();
  }else{
    choice.removeClass("btn-default").addClass("btn-danger");
    $("#choice"+localStorage.getItem("choiceWinner")).removeClass("btn-default").addClass("btn-success");
    cleanQuestion();
    lockButtons();
    setQuestion();
    nextQuestion();
    endGame();
  }
}

function cleanQuestion(){
  localStorage.removeItem("countryInProgress");
  localStorage.removeItem("choice1");
  localStorage.removeItem("choice2");
  localStorage.removeItem("choice3");
  localStorage.removeItem("choice4");
  localStorage.removeItem("choiceWinner");
}

function lockButtons(){
  $("#nextQuestion").fadeIn();
  $(".choice").css("cursor","not-allowed");
  $(".choice").attr("disabled", true);
}

function setScore(){
  if(getScore() == null){
    localStorage.setItem("score",0);
  }
  let newScore = parseInt(getScore()) + 1;
  localStorage.setItem("score", newScore);
}

function getScore(){
  return localStorage.getItem("score");
}

function setQuestion(){
  if(getQuestion() == null){
    localStorage.setItem("question",1);
  }
  let newQuestion = parseInt(getQuestion()) + 1;
  localStorage.setItem("question", newQuestion);
}

function getQuestion(){
  return localStorage.getItem("question");
}

function nextQuestion(){
  $("#nextQuestion").click(function(){
    window.location = "game.html?region="+region;
  });
}

function reload(){
  window.location = "game.html?region="+region;
}

function goToIndex(){
  window.location = "index.html";
}
