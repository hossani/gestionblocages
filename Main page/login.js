
if(localStorage.getItem('formateur')==null){
    const formateurArray=[{
        bootcamp:'MERN stack',
        username: "Abdelaziz",
        email : "a@a",
       password: "a"
    }, {
        bootcamp:'PHP Laravel',
        username: "Salah",
        email : "s@s",
       password: "1"
    }];
    const formateurString=JSON.stringify(formateurArray);
    localStorage.setItem('formateur',formateurString);
}
const formateurData=JSON.parse(localStorage.getItem('formateur'));
const form=document.querySelector("form");

form.addEventListener("submit",function(event){
    event.preventDefault();
const mail=document.getElementById("mail").value;
const password=document.getElementById("mdp").value;
if(find(formateurData,mail,password)){
   localStorage.setItem('userConnect',JSON.stringify(find(formateurData,mail,password))); 
    window.location.href="../dashboard/admin.html";
}
else if(localStorage.getItem('listStudent')){
        const std=JSON.parse(localStorage.getItem('listStudent'));
    if(find(std,mail,password)){
        localStorage.setItem('userConnect',JSON.stringify(find(std,mail,password)));
        window.location.href="../dashboard/student.html";
    }
    else{
        alert('Email ou mot de passe incorrect.'); }
}

});


function find(arrayObject,mail,password){
    for(let i=0;i<arrayObject.length;i++){
        if(arrayObject[i].email==mail && arrayObject[i].password==password){
            return arrayObject[i];
        }
    }
    return null;
}