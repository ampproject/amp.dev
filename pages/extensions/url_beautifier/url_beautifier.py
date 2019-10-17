from grow import extensions
from grow.common import urls

urls._Url = urls.Url

class BeautifiedUrl(urls._Url):

    def __init__(self, path, host=None, port=None, scheme=None):
        super(BeautifiedUrl, self).__init__(path, host=host, port=port, scheme=scheme)
        self.path = self.path.replace('/index.html', '/').replace('.html', '/')

urls.Url = BeautifiedUrl

class UrlBeautifierExtension(extensions.BaseExtension):
    pass
