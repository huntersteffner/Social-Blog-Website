
// Function to delete posts off your dashboard
const deleteFunction = async (e) => {
    if(e.target.hasAttribute('data-id')) {
        console.log('it worked')
        const id = e.target.getAttribute('data-id')

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to delete post')
        }
    }
}

document.querySelector('.post-list').addEventListener('click', deleteFunction)