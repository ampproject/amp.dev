import logging

from grow import extensions
from grow.common import logger, colors
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
    url_base = 'http://{}:{}/'.format(host, port)
    url_root = 'http://{}:{}{}'.format(host, port, root_path)
    logger.LOGGER.info('Grow started successfully.')

    messages = manager.ServerMessages()
    messages.add_message('Pod:', pod.root, colors.HIGHLIGHT)
    messages.add_message('Server:', url_root, colors.HIGHLIGHT)

    # Trigger the dev manager message hook.
    extra_urls = pod.extensions_controller.trigger(
        'dev_manager_message', messages.add_message, url_base, url_root) or []

    messages.add_message(
        'Ready.', 'Press ctrl-c to quit.', colors.SUCCESS, colors.SUCCESS)

    return (url_root, extra_urls)

manager.print_server_ready_message = print_server_ready_message

class LogBeautifierExtension(extensions.BaseExtension):
    pass
