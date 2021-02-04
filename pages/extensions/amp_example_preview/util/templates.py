import os
from grow.documents.document import Document
from jinja2 import contextfilter, Environment, Template

# this is the pod path
BASE_PATH = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../'))

def load_template(path_in_pod, doc):
  """
  :type path_in_pod: str
  :type doc: Document
  :rtype: Template
  """
  template_path = os.path.join(BASE_PATH, path_in_pod.lstrip('/'))

  # use the env from grow with all functions present
  env = doc.pod.render_pool.get_jinja_env(doc.locale)['env']

  with open(template_path, 'rb') as template_file:
    file_contents = template_file.read().decode('utf-8')
    template = env.from_string(file_contents)
    return template
