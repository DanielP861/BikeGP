function init(){
    getNavbarcli()
}
 
 function getNavbarcli(){
     const nbarcli = document.getElementById('nbarcli')
     fetch('http://localhost:3000/navbarcli')
     .then(res => res.text())
     .then((html)=>{
         nbarcli.innerHTML += html
     })
     .catch(function(err){
         alert('Ocorreu um problema...')
     })
 }


function criarEquip(){
    const cliente = document.getElementById('nome').value
    const idEquip = document.getElementById('idEquip').value
    let novoEquip ={
       
        cliente : cliente,
        idEquip: idEquip,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoEquip),
    };
    fetch('http://localhost:3000/equipamento', options)
}

function fazerlogin(){
  const _utilizador = document.getElementById("Utilizador").value;
  const _passe = document.getElementById("Passe").value;
  let loginObj = {
    utilizador: _utilizador,
    passe: _passe,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginObj),
  };
  fetch('http://localhost:3000/login', options)
  .then((res) => {
      if(res.status===406){
        alert(res.json().msg)
        return
      }       
      let token = res.headers.get("Authorization");
      console.log(token)
      localStorage.setItem("token", token);
      return res.json()
  })
  .then((data) => {
    getPage(data)
  })
  .catch((error) => alert(error));

}

function getPage(data){
    localStorage.setItem("nivel", data.nivel); 
    const obj = {
        nivel: localStorage.getItem('nivel')
    }
    let options = {
        method:"POST",
        headers: {
            'Content-type': "application/json",
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    };
    fetch("http://localhost:3000/page", options)
      .then((res) => {
        console.log(res);
        window.location.replace(res.url);
      })
      .catch((error) => console.log(error));
}

function criarCliente(){

  const nome = document.getElementById('nome').value
  const MoradaRua = document.getElementById('rua').value
  const MoradaNumero = document.getElementById('numero').value
  const codigoPostal = document.getElementById('codigoPostal').value
  const email = document.getElementById('email').value
  const numTele = document.getElementById('tel').value
  const nomeImpresa = document.getElementById('nomeImpresa').value
  const utilizador = document.getElementById('Utilizador').value
  const passe = document.getElementById('palavraPasse').value
 
  let novoEquip ={
     
    nome :nome ,
    MoradaRua : MoradaRua ,
    MoradaNumero : MoradaNumero,
    codigoPostal : codigoPostal,
    email : email,
    numTele : numTele,
    nomeImpresa : nomeImpresa ,
    utilizador : utilizador ,
    passe : passe,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoEquip),
  };
  fetch('http://localhost:3000/utilizador', options)
  
}