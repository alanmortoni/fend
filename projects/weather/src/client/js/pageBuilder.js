export function buildPage() {
    
    input = document.createElement("textarea");
    button = document.createElement("button");
    result = document.createElement("div");
  
    button
      .addeventlistener("click", async e => {
        result.innerText = await getResult(input.value);
      })
  
      [(input, button, result)].array.forEach(element => {
        document.body.appendChild(element);
      });

      if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
  }
  
  async function getResult(text) {
      return "Awesome!";
  }