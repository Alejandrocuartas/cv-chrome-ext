export default defineBackground(() => {

  browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
      if (request.authorize) {

        // @ts-ignore
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          // @ts-ignore
          chrome.tabs.sendMessage(tabs[0].id, { authorize: true }, function (response) {
            // @ts-ignore
            sendResponse(response);
          });
        });


      }
    }
  );

});
