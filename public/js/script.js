
const loginLink = document.getElementById('login-link')

const logoutBtn = document.getElementById('logout-btn')

// logoutBtn.addEventListener('click', () => {
//     fetch('./api/users/logout', {
//         method: 'POST',

//     }).then(document.location.replace('./')
// })

logoutBtn.addEventListener('click', () => {
    fetch('./api/users/logout', {
        method: 'POST'
    }).then(document.location.replace('./'))
})