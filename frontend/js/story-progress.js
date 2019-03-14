// Move story to the selected page
var pageId = getUrlParameter('id');
switchToPage(pageId);

function switchToPage(pageId) {
  if (!pageId) {
    return;
  }
  var story = document.querySelector('amp-story');
  story.addEventListener('ampstory:load', function() {
    var event = new CustomEvent('ampstory:switchpage',  {
      bubbles: true,
      detail: {
        targetPageId: pageId
      }
    });
    story.dispatchEvent(event);
  });
}

function getUrlParameter(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
