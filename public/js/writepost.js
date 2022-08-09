const postForm = document.getElementById('post-form')

// Function to write a post
const makePost = async (e) => {
    e.preventDefault()
    
    const post_name = document.getElementById('post_name').value
    const post_description = document.getElementById('post_description').value

    

    if(post_name && post_description) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({post_name,post_description}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }

            
        })

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }

    }
}

postForm.addEventListener('submit', makePost)

