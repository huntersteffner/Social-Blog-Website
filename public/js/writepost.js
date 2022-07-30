const postForm = document.getElementById('post-form')

postForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const post_name = document.getElementById('post_name').value
    const post_description = document.getElementById('post_description').value

    if(post_name && post_description) {
        try {
            fetch('./api/posts/', {
                method: 'POST',
                body: JSON.stringify({
                    post_name, post_description,

                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(document.location.replace('./'))
        } catch (err) {
            console.log(err)
        }
    }
})