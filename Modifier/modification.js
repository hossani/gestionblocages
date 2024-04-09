document.querySelector(".btn-exit").addEventListener("click",function(){
    window.location.href='../dashboard/student.html';
});


document.querySelector("form").addEventListener("submit",modification);

function modification(event){
    event.preventDefault();
    const mod=JSON.parse(localStorage.getItem("mod"));
    const index=JSON.parse(localStorage.getItem("index"));
    const titre=document.getElementById("titre").value;
    const brief=document.getElementById("brief").value;
    const difficulte=document.getElementById("difficulte").value;
   const std=JSON.parse(localStorage.getItem("listStudent"));
   if(titre!='' && brief!='' && difficulte!=''){
    std[index].listBlocages[mod].titre=titre;
    std[index].listBlocages[mod].brief=brief;
    std[index].listBlocages[mod].blocage=difficulte;
localStorage.setItem('listStudent',JSON.stringify(std));
window.location.href='../dashboard/student.html';
   }
   else{
    alert("Vous devez remplir tous les champs");
return ;
   }
}