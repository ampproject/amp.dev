import logging

from grow import extensions
from grow.common import logger
from grow.server import manager

logger._get_logger = logger.get_logger

def get_logger(name='pod'):
    _formatter = logging.Formatter('%(message)s')
    logger = logging.getLogger(name)
    logger.propagate = False

    # get_logger has already been called by Grow before so it's not necessary
    # to add a handler but just to update the formatter
    if logger.handlers:
      logger.handlers[0].setFormatter(_formatter)
    else:
      handler = logging.StreamHandler()
      handler.setFormatter(_formatter)
      logger.addHandler(handler)
    return logger

logger.get_logger = get_logger
logger.LOGGER = get_logger('pod')

manager._print_server_ready_message = manager.print_server_ready_message

def print_server_ready_message(pod, host, port):
    home_doc = pod.get_home_doc()
    root_path = home_doc.url.path if home_doc and home_doc.exists else '/'
    url = 'http://{}:{}{}'.format(host, port, root_path)
    logger.LOGGER.info('Grow started successfully.')
    return url

manager.print_server_ready_message = print_server_ready_message

class LogBeautifierExtension(extensions.BaseExtension):
    pass
