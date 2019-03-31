# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from os import path
import subprocess
import json

VALIDATOR_COMMAND = [
    'node',
    path.join(path.dirname(__file__), '../../../../node_modules/amphtml-validator/index.js'),
    '--format json',
    '-',
]

def validate(html):
    validator = subprocess.Popen(' '.join(VALIDATOR_COMMAND), stdout=subprocess.PIPE, stdin=subprocess.PIPE, shell=True)
    result, error = validator.communicate(html.encode('utf-8'))
    return json.loads(result.decode('utf-8'))
