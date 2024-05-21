export default defineBackground(() => {

  browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {

      console.log("Message received: " + JSON.stringify(request));

      if (request.authorize) {

        // @ts-ignore
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          // @ts-ignore
          chrome.tabs.sendMessage(tabs[0].id, { authorize: true, email: request.email }, function (response) {
            console.log("Response: " + response);
            // @ts-ignore
          });
        });
      }

      if (request.success) {
        console.log("Success!");
      }
    }
  );

});
