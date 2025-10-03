const lines = [
  "hi officer,",
  "A small gift for you,",
  "Happy Birthday <span class=\"emoji\">🥳</span>",
  "Sam <span class=\"emoji\">🎂</span>"
];

// Start text sequence after 8 seconds
setTimeout(() => {
  let delay = 0;
  // Animate each line one by one
  lines.forEach((line, i) => {
    setTimeout(() => {
      typeWriter(line, document.getElementById(`line${i+1}`));
    }, delay);
    // Only count visible characters for delay
    delay += line.replace(/<[^>]*>/g, '').length * 100 + 1000; // typing + wait time
  });
  // Show button after last line
  setTimeout(() => {
    document.getElementById("celebrateBtn").classList.add("show");
  }, delay + 500);
}, 2000);

// Typing effect (correctly handles HTML tags and emojis)
function typeWriter(text, element) {
  let i = 0;
  let output = "";
  while (i < text.length && text[i] === "<") {
    // If line starts with a tag, insert it instantly
    let tag = "";
    while (i < text.length && text[i] !== ">") {
      tag += text[i];
      i++;
    }
    tag += ">";
    i++;
    output += tag;
  }
  function typing() {
    if (i < text.length) {
      if (text[i] === "<") {
        // Instantly insert the whole tag
        let tag = "";
        while (i < text.length && text[i] !== ">") {
          tag += text[i];
          i++;
        }
        tag += ">";
        i++;
        output += tag;
        element.innerHTML = output;
        setTimeout(typing, 0);
      } else {
        output += text[i];
        element.innerHTML = output;
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
        i++;
        setTimeout(typing, 100);
      }
    }
  }
  typing();
}

// Navigate to cake page
function goToCake() {
  window.location.href = "cake.html";
}
