const commentForm = document.querySelector("#comment-form")

const postId = commentForm.getAttribute('data-post')

const commentFormHandler = async e => {
    e.preventDefault();
  
    const content = document.getElementById('comment-input').value
  
    if (content) {
      const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({
          postId,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  commentForm.addEventListener("submit", commentFormHandler);
