u"""
PySkCode, a Python implementation of a full-featured BBCode syntax parser library.
"""

# Package information
from __future__ import absolute_import
__author__ = u"Fabien Batteix (@skywodd)"
__copyright__ = u"Copyright 2016, TamiaLab"
__credits__ = [u"Fabien Batteix", u"TamiaLab"]
__license__ = u"GPLv3"
__version__ = u"3.2.1"
__maintainer__ = u"Fabien Batteix"
__email__ = u"fabien.batteix@tamialab.fr"
__status__ = u"Production"


# User friendly imports
from .treebuilder import parse_skcode
from .render import render_to_html, render_to_text
