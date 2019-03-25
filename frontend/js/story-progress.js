// Move story to the selected page
const pageId = getUrlParameter('id');
switchToPage(pageId);

function switchToPage(pageId) {
  if (!pageId) {
    return;
  }
  const story = document.querySelector('amp-story');
  story.addEventListener('ampstory:load', () => {
    const event = new CustomEvent('ampstory:switchpage', {
      bubbles: true,
      detail: {
        targetPageId: pageId,
      },
    });
    story.dispatchEvent(event);
  });
}

function getUrlParameter(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
