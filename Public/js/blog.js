function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + ' ...';
    }
    return text;
}
addEventListener("load", (event) => {
    // Get all elements with the class 'blog_description'
    const blogDescriptions = document.querySelectorAll(".blog_description");

    // Loop through each element and apply the truncation
    blogDescriptions.forEach((element) => {
        element.textContent = truncateText(element.textContent, 40); // Truncate to 50 characters
    });
});

document.getElementById("registerButton").addEventListener("click", function() {
    window.location.href = "/register"; 
  });