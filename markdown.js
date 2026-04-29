// Select the elements from the DOM
const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let markdown = markdownInput.value;

  // 1. Headings (Level 1, 2, 3)
  // ^\s* matches start of line and optional spaces
  markdown = markdown.replace(/^\s*### (.*$)/gim, '<h3>$1</h3>');
  markdown = markdown.replace(/^\s*## (.*$)/gim, '<h2>$1</h2>');
  markdown = markdown.replace(/^\s*# (.*$)/gim, '<h1>$1</h1>');

  // 2. Bold (**text** or __text__)
  markdown = markdown.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // 3. Italics (*text* or _text_)
  markdown = markdown.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

  // 4. Images ![alt](src)
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

  // 5. Links [text](url)
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // 6. Blockquotes (> quote)
  markdown = markdown.replace(/^\s*> (.*$)/gim, '<blockquote>$1</blockquote>');

  // 7. Handle line breaks (Optional but helpful for rendering)
  // This helps the preview look like the input
  const formattedHtml = markdown.trim();

  return formattedHtml;
}

// 8. Event Listener for 'input'
markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  
  // Display raw HTML code
  htmlOutput.textContent = html;
  
  // Render the HTML in the preview
  preview.innerHTML = html;
});
