import re
from grow.pods.pods import Pod

COMPONENT_VERSION_PATTERN = re.compile('.*/(amp-.+)-v(\d+)\.(\d+)', re.IGNORECASE)


class ComponentDocInfo(object):

  def __init__(self, pod_path, major_version, minor_version):
    self.pod_path = pod_path
    self.major_version = int(major_version)
    self.minor_version = int(minor_version)

  def is_older(self, other_major, other_minor):
    other_major = int(other_major)
    other_minor = int(other_minor)
    if self.major_version < other_major:
      return True
    if self.major_version == other_major and self.minor_version < other_minor:
      return True
    return False

  def update_if_older(self, pod_path, other_major, other_minor):
    if self.is_older(other_major, other_minor):
      self.pod_path = pod_path
      self.major_version = int(other_major)
      self.minor_version = int(other_minor)


class ComponentVersionResolver(object):

  def __init__(self, pod, components_path):
    """
    :type pod: Pod
    :type components_path: str
    """
    self.pod = pod
    self.default_locale = pod.podspec.default_locale
    self.latest_components = self.init_latest_versions(components_path)
    self.no_version_component_pattern = self.init_no_version_pattern(components_path)

  def init_no_version_pattern(self, components_path):
    if not components_path.endswith('/'):
      components_path = components_path + '/'
    # for components matching this pattern we add the latest version number to the link
    return re.compile(
      r'^.*' + components_path + r'((?:.(?!-v\d[\d\.]+))+).md$')

  def init_latest_versions(self, components_path):
    """
    :type components_path: str
    """
    result = {}
    component_docs = self.pod.get_collection(components_path)
    for item in component_docs.list_docs(locale=self.default_locale):
      match = COMPONENT_VERSION_PATTERN.match(item.pod_path)
      if match:
        component = match.group(1)
        major_version = match.group(2)
        minor_version = match.group(3)
        if component in result:
          doc_info = result[component]
          doc_info.update_if_older(item.pod_path, major_version, minor_version)
        else:
          doc_info = ComponentDocInfo(item.pod_path, major_version, minor_version)
          result[component] = doc_info
    return result

  def find_latest_for_component_with_no_version(self, pod_path):
    """
    Return the pod path to the latest version if the given pod_path points to a component
    and has no version information.
    :param pod_path:
    :return:
    """
    match = self.no_version_component_pattern.match(pod_path)
    if match:
      component = match.group(1)
      if component in self.latest_components:
        return self.latest_components[component].pod_path
    return None
