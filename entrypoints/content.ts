import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: [
    '*://*.google.com/*',
  ],
  main() {

    browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        const html = document.documentElement.outerHTML;

        fetch('http://localhost:8000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ html: html })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            //@ts-ignore
            sendResponse(true);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }
    );

  },
});
