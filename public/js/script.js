

const loginLink = document.getElementById('login-link')

const logoutBtn = document.getElementById('logout-btn')

// logoutBtn.addEventListener('click', () => {
//     fetch('./api/users/logout', {
//         method: 'POST',

//     }).then(document.location.replace('./')
// })

// const checkIfLogged = (req, res) => {
//     if(req.session.logged_in) {
//         console.log('logged in')
//     } else if (!req.session.logged_in) {
//         console.log('logged out')
//     }
// }
// checkIfLogged()


const logout = async () => {
    const response = await fetch('./api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
    })
    
    if(response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}
logoutBtn.addEventListener('click', logout)