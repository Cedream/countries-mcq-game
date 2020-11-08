let dataCountries = new Array();
let getUrl = new URL(location.href);
let region = getUrl.searchParams.get("region");
$("#region").text(getNameRegion(region));
if(region==null || region == "" || getNameRegion(region) == "Introuvable"){
    window.location = "index.html";
}else{
  start();
}
if(localStorage.getItem("question") !== null){
  $(".questionNumber").text(localStorage.getItem("question"));
}
if(localStorage.getItem("score") !== null){
  $(".yourScore").text(localStorage.getItem("score"));
}
if(localStorage.getItem("region") === null){
  localStorage.setItem("region", region);
}else if(localStorage.getItem("region") != region){
  localStorage.clear();
}
