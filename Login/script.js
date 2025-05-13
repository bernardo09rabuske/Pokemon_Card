
function fazerLogin(){
    const form = document.querySelector("form")
    form.addEventListener("submit",async(e)=>{
        e.preventDefault()
        //console.log("submit")
        const email = document.querySelector("#email")
        const pass = document.querySelector("#pass")
        const user = { 
            email:email.value,
            password:pass.value
        }
        //console.log(email.value,pass.value)
        const res = await fetch(`http://localhost:3001/login`,{
            method:"POST",
            body : JSON.stringify(obj),
            headers: {
                'Content-Type':"application/json; charset=utf-8"
            }
        })
        if(res.status ===200){
            console.log("if")
            document.body.insertAdjacentHTML("beforeend",`
            
                <div class="toast success">
                    <p>Login efetuado com sucesso!</p>
                </div>
                `)
            setTimeout(()=>{
                localStorage.setItem("Logado", true)
                console.log(res)
                location.href = "/"
                
            },3000)
            const response = await res.json()
            console.log(response)
            
        }else {
            console.log("else")
            document.body.insertAdjacentHTML("afterend",`
            
                <div class="toast error">
                    <p>Credenciáis inválidas</p>
                </div>
                `)
        }        
    })
}   
fazerLogin()
