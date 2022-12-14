
const loginBtn = document.getElementById('login-btn')
const loginForm = document.getElementById('login-form')
const registerForm =document.getElementById('register-form')

// Function to log in
const login = async (e) => {
    e.preventDefault()


    const username = document.getElementById('login-username').value.trim()

    const password = document.getElementById('login-password').value.trim()

    if(username && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })

        if(response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}
// Function to register
const register = async (e) => {
    e.preventDefault()


    const username = document.getElementById('register-username').value.trim()

    const password = document.getElementById('register-password').value.trim()

    if(username && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        if(response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }

    }

}


loginForm.addEventListener('submit', login)

registerForm.addEventListener('submit', register)