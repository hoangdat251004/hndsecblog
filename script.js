document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const post = posts.find(p => p.id === postId);
    if (post) {
        document.getElementById("postTitle").textContent = post.title;
        document.getElementById("postContent").textContent = post.content;
    } else {
        document.getElementById("postTitle").textContent = "Post not found";
        document.getElementById("postContent").textContent = "";
    }

    // Hiển thị comment
    let comments = JSON.parse(localStorage.getItem("comments")) || {};
    let commentSection = document.getElementById("commentSection");
    if (comments[postId]) {
        comments[postId].forEach(comment => {
            let commentDiv = document.createElement("div");
            commentDiv.innerHTML = `<strong>${comment.username}</strong>: ${comment.text}`;
            commentSection.appendChild(commentDiv);
        });
    }

    // Nếu user đã login, hiển thị form comment
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("commentFormContainer").style.display = "block";

        document.getElementById("submitComment").addEventListener("click", function () {
            let commentText = document.getElementById("commentText").value.trim();
            if (!commentText) return;

            if (!comments[postId]) comments[postId] = [];
            comments[postId].push({ username: user.username, text: commentText });

            localStorage.setItem("comments", JSON.stringify(comments));
            location.reload();
        });
    }
});
