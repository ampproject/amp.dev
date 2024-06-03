# -*- coding: utf-8 -*-
import os
import json

COMPONENT_VERSIONS_FILE = os.path.normpath(os.path.join(os.path.dirname(
    os.path.abspath(__file__)), '../../../platform/config/component-versions.json'))
COMPONENT_VERSIONS = {}

with open(COMPONENT_VERSIONS_FILE) as f:
    # The latest component versions if no explicit version is set
    COMPONENT_VERSIONS = json.load(f)

# Default version to use if it is not in the set of known components
DEFAULT_VERSION = '0.1'

# Used to determine where to print the script tags
PLACEHOLDER = '__AMP__DEPENDENCIES__'


class AmpDependencies(object):
    def __init__(self, pod):
        self._pod = pod
        # Stores registered dependencies
        self._dependencies = {}
        # Can be used to determine if the deps have already been injected
        self.injected = False

    def __repr__(self):
        return '<AmpDependencies>'

    def add(self, name, version=None, type='element', no_version_warn=False):
        if version is None and not no_version_warn:
            self._pod.logger.warning(
                'Adding an AMP dependency ({}) without a specific version is not recommended.'.format(name))

        _version, dep_type = self._dependencies.get(name, (version, None))
        if not _version == version and _version is not None and version is not None:
            raise RuntimeError('Using two versions ({}, {}) of the same dependency ({}) is not supported.'.format(
                version, _version, name))
        elif _version is not None and dep_type:
            # component is already known
            return ''

        self._dependencies[name] = (version, type)
        return ''

    def emit(self):
        return PLACEHOLDER

    def inject(self, content):
        # Check if the content has the placeholder
        if PLACEHOLDER not in content or self.injected:
            self._pod.logger.warning('Did not find placeholder for amp dependencies. '
                                     'Ensure you call emit() in your template head section.')
            return content

        self.injected = True

        dependencies = ''
        for name, details in self._dependencies.items():
            version = details[0]

            if version is None:
                version = COMPONENT_VERSIONS.get(name, DEFAULT_VERSION)

            dep_type = details[1]

            src = 'https://cdn.ampproject.org/v0/{name}-{version}.js'.format(
                name=name, version=version)
            tag = '<script custom-{type}="{name}" src="{src}" async></script>'.format(
                type=dep_type, name=name, src=src)

            dependencies = dependencies + tag

        return content.replace(PLACEHOLDER, dependencies)
