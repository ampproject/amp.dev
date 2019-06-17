import os
import gettext
from jinja2 import contextfilter, Environment, Template
from markupsafe import Markup

# this is the pod path
BASE_PATH = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../'))

DEFAULT_ENV = Environment()

@contextfilter
def eval_markup(context, value):
  return Markup(Template(value).render(context))

# The eval_markup filter has to be used to evaluate possible j2 markup in the source code
# Our grow setup will evaluate the template markup in the contents
# So we also have to do this for the examples
# Mostly we have {% raw %} marker in the examples to prevent evaluation of the amp-mustache templates
DEFAULT_ENV.filters['eval_markup'] = eval_markup
DEFAULT_ENV.globals['_'] = gettext.gettext


def load_template(path_in_pod, doc=None, env=DEFAULT_ENV):
  """
  :rtype: Template
  """
  template_path = os.path.join(BASE_PATH, path_in_pod.lstrip('/'))
  with open(template_path, 'r') as template_file:
    file_contents = template_file.read().decode('utf-8')
    template = env.from_string(file_contents)
    return template
