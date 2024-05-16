import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: [
    '*://*.linkedin.com/*',
  ],
  main() {

    browser.runtime.onMessage.addListener(
      async function (request, sender, sendResponse) {

        let signedURL = '';

        await fetch("https://xwc63s9qe2.execute-api.us-east-1.amazonaws.com/uploads").
          then(response => response.json()).then(data => {
            console.log(data)
            signedURL = data?.uploadURL;
          }).catch(error => {
            console.error('Error getting signed url:', error);
          });

        if (!signedURL) {
          alert("Error generating CV: Could not get signed URL");
          return;
        }

        const html = document.documentElement.outerHTML;

        let blobData = new Blob([html], { type: 'text/html' })
        await fetch(signedURL, {
          method: 'PUT',
          body: blobData
        }).catch(error => {
          console.error('Error uploading to S3:', error);
        });

        fetch('https://0domuf6wce.execute-api.us-east-1.amazonaws.com/default', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ html_s3_key: getS3Key(signedURL) })
        })
          .then(response => response.json())
          .then(data => {

            if (data?.error) {
              alert("Error generating CV: " + data?.message);
              return;
            }

            alert("CV generated successfully. Check your email!");
          })
      }
    );

  },
});

function getS3Key(url: string) {
  let parsedUrl = new URL(url);
  parsedUrl.search = '';
  url = parsedUrl.toString();

  const s3Key = url.split('amazonaws.com/')[1];

  return s3Key;
}