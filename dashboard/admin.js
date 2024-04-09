main ();

function main(){
  document.getElementsByClassName("btn-exit")[0].addEventListener("click",function(){
window.location.href='../Main page/login.html'; });

  const formateurs= JSON.parse(localStorage.getItem('formateur'));
const userConnect=JSON.parse(localStorage.getItem('userConnect'));
  const index=find_formateur_connecter(userConnect,formateurs);
if(!formateurs[index].listeEtudiants){
  alert("Les etudiants n'ont pas des blocages pour le moment !");
}else {
  affichage_blocage(formateurs,index);
}
}

function find_formateur_connecter(userConnect,formateurs){
  let index=0;
  for(let i=0;i<formateurs.length;i++){
      if(userConnect.email==formateurs[i].email && userConnect.password==formateurs[i].password){
          index=i;
          localStorage.setItem("index",JSON.stringify(index));
          break;
      }
  }
  return index;
}

function affichage_blocage(formateurs,index){
  const tbody=document.querySelector('tbody');
  formateurs[index].listeEtudiants.forEach(etudiant => {
    etudiant.listBlocages.forEach(blocage=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`
      <td>${etudiant.username}</td>
      <td>${blocage.difficulte}</td>
      <td>${blocage.statut}</td>
      <td>${blocage.supprimer}</td>
  `; 
  tbody.appendChild(tr);
    });
  });
}
