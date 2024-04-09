// La liste des formateurs 
const formateurs=JSON.parse(localStorage.getItem('formateur'));
// Les elements HTML 'select tag'
const bootcampSelect=document.getElementById("bootcamp");
bootcampSelect.value="Choose a bootcamp";
const formateurSelect=document.getElementById("formateur");
// Les elements HTML 'input tag'
const titreInput = document.getElementById("titre");
titreInput.value="";
const briefInput = document.getElementById("brief");
briefInput.value="";
const difficulteInput = document.getElementById("difficulte");
difficulteInput.value="";

document.querySelector("button").addEventListener("click", function() {
  window.location.href='../dashboard/student.html'; });

bootcampSelect.addEventListener("change", function() {filtration(formateurSelect,this.value);});

document.querySelector("form").addEventListener("submit",function(){ 
  // User Student Online
const userStd=JSON.parse(localStorage.getItem('userConnect'));
const listStd=JSON.parse(localStorage.getItem('listStudent'));
let index=0;
for(let i=0;i<listStd.length;i++){
  if(listStd[i].email==userStd.email && listStd[i].password==userStd.password){
    index=i;
    break;
  }
}
if(formateurSelect.value=='' || titreInput.value==''||briefInput.value==''||difficulteInput.value==''){
  alert("Remplissez tous les cases s'il vous plait !!!");
  return ;
}
else {
  ajouter_blocage(listStd,index,bootcampSelect.value,formateurSelect.value,titreInput.value,briefInput.value,difficulteInput.value);
  save_dataStudent_inside_formateur(listStd,index,bootcampSelect.value,formateurSelect.value,formateurs);
}
}
);


function dateToday(){
  const currentdate=new Date();
  const year= currentdate.getFullYear();
  const month = String(currentdate.getMonth()+1).padStart(2,'0');
  const day = String(currentdate.getDate()).padStart(2,'0');
  return day+'-'+month+'-'+year;
}

function ajouter_blocage(listStd,index,bootcampSelectvalue,formateurSelectvalue,titreInputvalue,briefInputvalue,difficulteInputvalue){

  const statusIcon = '<img src="statusX.png" alt="" id="status">';
  const viewBtn='<img src="view.png" alt="" class="view">';
  const modifierBtn= '<img src="modifierVal.png" alt="" class="modifier">';
  const supprimerBtn = '<img src="deleteVal.png" alt="" class="delete">';
  const dataBlocage ={
     bootcamp:bootcampSelectvalue,
     formateur:formateurSelectvalue,
     titre:titreInputvalue,
     brief:briefInputvalue,
     blocage:difficulteInputvalue,
     date:dateToday(),
     difficulte: viewBtn,
     statut: statusIcon ,
     modifier: modifierBtn ,
     supprimer:supprimerBtn 
  }
   // Vérifier si l'utilisateur a déjà des blocages
   if (!listStd[index].listBlocages) {
    listStd[index].listBlocages = []; // Créer la liste des blocages s'il n'existe pas encore
  }
  // Ajouter le blocage à la liste des blocages de l'utilisateur
  listStd[index].listBlocages.push(dataBlocage);
  localStorage.setItem('listStudent',JSON.stringify(listStd));
  alert("Obstacle ajouté avec succès !");
}

  function filtration(formateurSelect,bootcampSelectvalue){
    formateurSelect.innerHTML="";
    const formateurFilter= formateurs.filter(e=>e.bootcamp==bootcampSelectvalue);
    formateurFilter.forEach(formateur => {
      const option=document.createElement("option");
      option.text=formateur.username;
      option.value=formateur.username;
      formateurSelect.appendChild(option);

  });
}

 function save_dataStudent_inside_formateur(listStd,index,bootcampSelectvalue,formateurSelectvalue,formateurs){
let indexFormateur=-1; let indiceImportant=-1;
  for(let i=0;i<formateurs.length;i++){
    if(formateurs[i].username==formateurSelectvalue && formateurs[i].bootcamp==bootcampSelectvalue){
    indexFormateur=i;
    break;
  }
}
if (indexFormateur === -1) {
 alert("Formateur non trouvé");
  return;
}

if(!formateurs[indexFormateur].listeEtudiants){
  formateurs[indexFormateur].listeEtudiants=[];
  formateurs[indexFormateur].listeEtudiants.push(listStd[index]);
}

formateurs[indexFormateur].listeEtudiants.forEach(function(etudiant,j){
if(etudiant.email==listStd[index].email){
  indiceImportant=j;
}
});

if(indiceImportant==-1){
  formateurs[indexFormateur].listeEtudiants.push(listStd[index]);
}
else{
  formateurs[indexFormateur].listeEtudiants[indiceImportant]=listStd[index];
}
localStorage.setItem('formateur',JSON.stringify(formateurs));
}


