document.addEventListener("DOMContentLoaded", function() {
    // Like 버튼 클릭 이벤트
    document.querySelectorAll(".like-button").forEach(button => {
        button.addEventListener("click", function() {
            const postId = this.getAttribute("data-post-id");
            fetch(`/like_post/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCookie('csrftoken')
                },
                body: `post_id=${postId}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.liked) {
                    this.textContent = "Dislike";
                } else {
                    this.textContent = "Like";
                }
                this.previousElementSibling.textContent = `Likes: ${data.likes_count}`;
            });
        });
    });

    // 댓글 작성 폼 제출 이벤트
    document.querySelectorAll(".comment-form").forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const postId = this.getAttribute("data-post-id");
            const content = this.querySelector("textarea").value;

            fetch(`/add_comment/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCookie('csrftoken')
                },
                body: `post_id=${postId}&content=${content}`
            })
            .then(response => response.json())
            .then(data => {
                const commentDiv = document.createElement("div");
                commentDiv.className = "comment";
                commentDiv.id = `comment-${data.comment_id}`;
                commentDiv.innerHTML = `
                    <p>${data.content}</p>
                    <p>by ${data.user}</p>
                    <button class="delete-comment-button" data-comment-id="${data.comment_id}">Delete</button>
                `;
                this.closest(".comments").appendChild(commentDiv);
                this.querySelector("textarea").value = "";
            });
        });
    });

    // 댓글 삭제 버튼 클릭 이벤트
    document.querySelectorAll(".delete-comment-button").forEach(button => {
        button.addEventListener("click", function() {
            const commentId = this.getAttribute("data-comment-id");

            fetch(`/delete_comment/${commentId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.closest(".comment").remove();
                }
            });
        });
    });
});

// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
