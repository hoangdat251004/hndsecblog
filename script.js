document.addEventListener("DOMContentLoaded", function () {
    const postList = document.getElementById("postList");
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (postList) {
        posts.forEach((post, index) => {
            const postLink = document.createElement("a");
            postLink.href = `post.html?index=${index}`;
            postLink.textContent = post.title;
            postList.appendChild(postLink);
        });
    }

    document.getElementById("postForm")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("postTitle").value;
        const content = document.getElementById("postContent").value;

        posts.push({ title, content });
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("Post created!");
        window.location.href = "index.html";
    });
});
