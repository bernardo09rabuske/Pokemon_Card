function fazerCadastro(){
    const form = document.querySelector("form")
    form.addEventListener("submit",async(e)=>{
        e.preventDefault()
        //console.log("submit")
        const email = document.querySelector("#email")
        const pass = document.querySelector("#pass")
        // const user = { 
        //     email:email.value,
        //     password:pass.value
        // }
        //console.log(email.value,pass.value)
        if (email.value == "" || pass.value == ""){
            document.body.insertAdjacentHTML("beforeend",`
            
                <div class="toast error">
                    <p>Valores não inseridos!</p>
                </div>
                `)
        }else{
            const obj = {
                email: email.value,
                password: pass.value
            }
            const res = await fetch(`http://localhost:3001/users`,{
                method:"POST",
                body : JSON.stringify(obj),
                headers: {
                    'Content-Type':"application/json; charset=utf-8"
                }
            })
            console.log(res)
            const response = await res.json()
            console.log(response)
            if(res.status === 201){
                document.body.insertAdjacentHTML("beforeend",`
            
                <div class="toast success">
                    <p>Cadastro efetuado com sucesso!</p>
                </div>
                `)
            setTimeout(()=>{
                location.href = "/login"
                
            },3000)}
        }
    })
}   
fazerCadastro()