
const loginBtn = document.getElementById('login-btn')
const loginForm = document.getElementById('login-form')
const registerForm =document.getElementById('register-form')



loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log("it works")

    const username = document.getElementById('login-username').value

    const password = document.getElementById('login-password').value

    if(username && password) {

        try {
            fetch('./api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  }

                  
            }).then(document.location.replace('./'))
            console.log('logged in')
        } catch (err) {
            console.log(err)
        }
    }

})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log("it works")

    const username = document.getElementById('register-username').value

    const password = document.getElementById('register-password').value

    if(username && password) {

        try {
            fetch('./api/users/', {
                method: 'POST',
                body: JSON.stringify({
                    username,password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  }

                  
            }).then(document.location.replace('./'))
            console.log('logged in')
        } catch (err) {
            console.log(err)
        }
    }

})