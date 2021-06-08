import json
import os

COMPONENT_VERSIONS_FILE = os.path.normpath(os.path.join(os.path.dirname(
    os.path.abspath(__file__)), '../../../../platform/config/component-versions.json'))
COMPONENT_VERSIONS = {}

with open(COMPONENT_VERSIONS_FILE) as f:
    COMPONENT_VERSIONS = json.load(f)


class AmpComponent:

    def __init__(self, name, version):
        self.name = name
        self.version = version

    def __hash__(self):
        return hash(self.name) ^ hash(self.version)

    def __eq__(self, other):
        return self.name == other.name and self.version == other.version

    def __ne__(self, other):
        return not self.eq()

    def __str__(self):
        return "{}:{}".format(self.name, self.version)


def get_component(identifier):
    """
    Returns an AmpComponent object with version info for the identifier.
    If the identifier does not contain a version, the latest version is used.
    :type identifier: str
    """
    if identifier:
        name = identifier
        version = '0.1'
        if ':' in identifier:
            name = identifier[:identifier.index(':')]
            version = identifier[len(name)+1:]
        elif name in COMPONENT_VERSIONS:
            version = COMPONENT_VERSIONS[name]
        return AmpComponent(name, version)
    return None


def get_components(identifiers):
    result = []

    if identifiers:
        if isinstance(identifiers, str):
            collection = identifiers.split(',')
        else:
            collection = identifiers

        for identifier in collection:
            component = get_component(identifier.strip())
            if component:
                result.append(component)

    return result


def remove_component_from_set(name, component_set):
    """
    Will remove the component with the specified name from the set with components,
    regardless of the version.
    :type name: str
    :type component_set: set
    """
    for component in component_set:
        if component.name == name:
            component_set.discard(component)
            break
