const writePost = document.getElementById('write-post')
const editBtn = document.getElementById('edit-btn')

const makeEdit = async(e) => {
    e.preventDefault()
    const id = writePost.y6u('data-type')
    console.log(id)
    
    const post_name = document.getElementById('post_name').value
    const post_description = document.getElementById('post_description').value

    if(post_name && post_description) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
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

editBtn.addEventListener('click', makeEdit)