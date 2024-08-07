document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.dataset.postId;
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            fetch('/like_post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({ 'post_id': postId })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.liked !== undefined) { // 데이터를 제대로 받았는지 확인
                    if (data.liked) {
                        this.textContent = 'Dislike';
                    } else {
                        this.textContent = 'Like';
                    }
                    document.querySelector(`#post-${postId} .likes-count`).textContent = data.likes_count;
                }
            })
            .catch(error => console.error('Error:', error)); // 오류 로그 출력
        });
    });

    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const postId = this.dataset.postId;
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const content = this.querySelector('textarea').value;

            fetch('/add_comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({ 'post_id': postId, 'content': content })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const commentHtml = `
                    <div class="comment" id="comment-${data.comment_id}">
                        <p>${data.content}</p>
                        <p>by ${data.user} on ${data.created_at}</p>
                        <button class="delete-comment-button" data-comment-id="${data.comment_id}">Delete</button>
                    </div>
                `;
                document.querySelector(`#post-${postId} .comments`).insertAdjacentHTML('beforeend', commentHtml);
                this.querySelector('textarea').value = '';

                document.querySelector(`#comment-${data.comment_id} .delete-comment-button`).addEventListener('click', function () {
                    const commentId = this.dataset.commentId;
                    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

                    fetch(`/delete_comment/${commentId}/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            document.querySelector(`#comment-${commentId}`).remove();
                        }
                    })
                    .catch(error => console.error('Error:', error)); // 오류 로그 출력
                });
            })
            .catch(error => console.error('Error:', error)); // 오류 로그 출력
        });
    });

    document.querySelectorAll('.delete-comment-button').forEach(button => {
        button.addEventListener('click', function () {
            const commentId = this.dataset.commentId;
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            fetch(`/delete_comment/${commentId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    document.querySelector(`#comment-${commentId}`).remove();
                }
            })
            .catch(error => console.error('Error:', error)); // 오류 로그 출력
        });
    });
});
