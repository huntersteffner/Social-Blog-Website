

const loginLink = document.getElementById('login-link')

const logoutBtn = document.getElementById('logout-btn')

// Function to log out user
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

// Function send user to comments page
const directToCommentsPage = async (e) => {
    if(e.target.hasAttribute('data-id')) {
        console.log('it worked')
        const id = e.target.getAttribute('data-id')


        await document.location.replace(`/comments/${id}`)

        if (response.ok) {
            document.location.replace(`/comments/3`)
        } else {
            alert('Failed to delete post')
        }
    }
}

document.querySelector('#timeline').addEventListener('click', directToCommentsPage)