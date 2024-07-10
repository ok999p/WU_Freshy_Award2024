document.addEventListener("DOMContentLoaded", function() {
  var n = 1000;
  var bubbles = 1000;
  var container = document.querySelector('.bottom-particles');
  
  while(n <= bubbles) {
    var bubble = document.createElement('div');
    bubble.className = 'bubble';
    container.appendChild(bubble); // แก้จาก bbubble เป็น bubble
    n++;
  }
});
