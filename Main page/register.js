const myForm=document.querySelector('form');
myForm.addEventListener('submit',function(event){
    event.preventDefault();
    const user=document.getElementById('user').value;
    const mail=document.getElementById('email').value;
    const mdp=document.getElementById('mdp').value;
if(user=='' || mail == '' || mdp == '')
{
alert("Veuillez remplir tous les champs.");
return ;
}
const dataStudent={
    username: user,
     email : mail,
    password: mdp,
};
let array;
if(localStorage.getItem('listStudent')==null){
array=[];
}
else {
    array=JSON.parse(localStorage.getItem('listStudent'));
}
array.push(dataStudent);
localStorage.setItem('listStudent',JSON.stringify(array));
alert("Données enregistrées avec succès dans le local storage !");
window.location.href="login.html";

}

)