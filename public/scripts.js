
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
    const cliente = document.getElementById('clientes').value
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
  .then(res => res.json())
    .then(json => {   
      alert(json.msg)
    })
  
}
function preenchercli() {
  fetch('http://localhost:3000/equipamento')
    .then(res => res.json())
    .then(json => {   
      const clientes = document.getElementById('clientes')
      for (i in json) {
        let nome = json[i].nome
        let _id = json[i]._id
        clientes.innerHTML += `<option value="${_id}">${nome}</option>`
      }
    })
  
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
  localStorage.setItem("_id", data._id)
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

function criarUtilizador(){

  const nome = document.getElementById('nome').value
  const moradaRua = document.getElementById('rua').value
  const moradaNumero = document.getElementById('numero').value
  const codigoPostal = document.getElementById('codigoPostal').value
  const email = document.getElementById('email').value
  const numTele = document.getElementById('tel').value
  const nomeEmpresa = document.getElementById('nomeEmpresa').value
  const utilizador = document.getElementById('Utilizador').value
  const passe = document.getElementById('palavraPasse').value
 
  let novoUtilizador ={
    nome :nome ,
    moradaRua : moradaRua ,
    moradaNumero : moradaNumero,
    codigoPostal : codigoPostal,
    email : email,
    numTele : numTele,
    nomeEmpresa : nomeEmpresa ,
    utilizador : utilizador ,
    passe : passe
  }

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoUtilizador),
  }

  fetch('http://localhost:3000/utilizador', options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch((error)=>{
    console.log(error)
  })
  

}

function preencherTB(){
  fetch('http://localhost:3000/utilizador')
  .then(res => res.json())
  .then(json => {
    const tbPendentes = document.getElementById('pendentes')
    const tbAceites = document.getElementById('aceites')
    tbPendentes.innerHTML = ''
    tbAceites.innerHTML = ''
      for(i in json){
        if (json[i].aceite == true) {
          let _id = json[i]._id
          let nome = json[i].nome
          let empresa = json[i].nomeEmpresa
          let nivel = json[i].nivel
          tbAceites.innerHTML += `<tr>
                                    <td>${nome}</td>
                                    <td>${empresa}</td>
                                    <td>${nivel}</td>
                                    <td class="text-center">
                                    <button
                                        type="button" 
                                        class="btn btn-success me-2"
                                        onclick="detalhe('${_id}');"
                                        style="width:100px;"> Ver mais                                      
                                    </button>
                                    <button 
                                        type="button" 
                                        class="btn btn-danger"
                                        style="width:100px;"
                                        onclick="eliminar('${_id}');"
                                        > Eliminar
                                    </button>
                                    </td>
                                </tr>`
        }
        else if(json[i].aceite==false){
          let _id = json[i]._id
          let nome = json[i].nome
          let empresa = json[i].nomeEmpresa
          let nivel = json[i].nivel
          tbPendentes.innerHTML += `<tr>
                                    <td>${nome}</td>
                                    <td>${empresa}</td>
                                    <td>${nivel}</td>
                                    <td class="text-center">
                                    <button      
                                        type="button" 
                                        class="btn btn-success me-2"
                                        style="width:100px;"
                                        onclick="aceitar('${_id}');"
                                        > Aceitar   
                                                                           
                                    </button>
                                    <button 
                                        type="button" 
                                        class="btn btn-danger"
                                        style="width:100px;"
                                        onclick="eliminar('${_id}');"
                                        > Recusar
                                    </button>
                                    </td>
                                </tr>`
          

        }
      }



  })
  .catch((error)=>{
    console.log(error)
  })
}

function aceitar(_id) {
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    }
  }
  fetch('http://localhost:3000/utilizador/' + _id, options)
    .then(res => res.json())
    .then(json => {
      alert(json.msg)
      preencherTB()
  })
}

function eliminar(_id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  }
  fetch('http://localhost:3000/utilizador/' + _id, options)
    .then(res => res.json())
    .then(json => {
      alert(json.msg)
      preencherTB()
  })
}

function detalhe(_id) {
  console.log(_id)
  fetch('http://localhost:3000/utilizador/' + _id)
    .then(res => res.json())
    .then(json => {
      var modelWrap=null
      if(modelWrap!==null){
           modelWrap.remove()
       }
      modelWrap = document.createElement('div')
      modelWrap.innerHTML = 
          `<div class="modal">
              <div class="modal-dialog modal-lg"  >
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Detalhe do utilizador:</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div><b>Nome: </b>${json.msg.nome}</div>
                      <div class="mt-3">Nome da empresa: ${json.msg.nomeEmpresa}</div>
                      <div class="mt-3">Morada: ${json.msg.moradaRua} - ${json.msg.moradaNumero}</div>
                      <div class="mt-3">Código Postal: ${json.msg.codigoPostal}</div>
                      <div class="mt-3">Numero de telemóvel: ${json.msg.numTele}</div>
                      <div class="mt-3">Email-: ${json.msg.email}</div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                      </div>
                  </div>
              </div>
          </div>`
          document.body.append(modelWrap)
          var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
          modal.show()
      //alert(json.msg)
      
  })
}

function preencherTbCli() {

  fetch('http://localhost:3000/tbDispo')
  .then(res => res.json())
    .then(json => {
      console.log(json)
    
    const dispositivos = document.getElementById('dispositivos')
    dispositivos.innerHTML = ''
    for (i in json) {
      if (json[i]._id == authController._id ) {
        let _id = json[i]._id
        let idEquip = json[i].idEquip
        let lat = json[i].lat
        let log = json[i].log
        dispositivos.innerHTML += `<tr>
                                    <td>${idEquip}</td>
                                    <td>${lat}</td>
                                    <td>${log}</td>
                                    <td class="text-center">
                                    <button
                                        type="button" 
                                        class="btn btn-success me-2"
                                        onclick="detalhe('${_id}');"
                                        style="width:100px;"> Ver mais                                      
                                    </button>
                                    </td>
                                </tr>`
        
      }
      }



  })
  .catch((error)=>{
    console.log(error)
  })
}
  
