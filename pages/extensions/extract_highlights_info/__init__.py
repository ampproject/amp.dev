# -*- coding: utf-8 -*-
from grow import extensions
from .page_info_collector import PageInfoCollector

CONFIG_INPUT_FILE = 'input_file'
CONFIG_OUTPUT_FOLDER = 'output_folder'

class ExtractHighlightsInfoExtension(extensions.BaseExtension):

  def __init__(self, pod, config):
    super(ExtractHighlightsInfoExtension, self).__init__(pod, config)

    input_file = config.get(CONFIG_INPUT_FILE)
    output_folder = config.get(CONFIG_OUTPUT_FOLDER)

    PageInfoCollector(pod, input_file, output_folder).run()
