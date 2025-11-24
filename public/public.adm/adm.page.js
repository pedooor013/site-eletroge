const loginAPIRoute = 'http://localhost:3000/eletroge/login';

async function loginADM(){
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    try {
        const res = await fetch(loginAPIRoute, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if(!res.ok){
            document.getElementById("message").innerHTML = data.message;
            return;
        }

        localStorage.setItem("token", data.token);

        document.getElementById("message").innerHTML = "Login realizado com sucesso!"

    }catch(err){
        console.error(err);
        document.getElementById("message").innerHTML = "Erro ao conectar com o servidor";
    }
}