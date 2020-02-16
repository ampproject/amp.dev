from grow import extensions
from grow.common import logger
import logging
from grow.server import manager

# logging.basicConfig(level=logging.INFO, format='\033[1;30;40m[%(asctime)s] [Grow]\033[00m %(message)s')

logger._get_logger = logger.get_logger

def get_logger(name='pod'):
    handler = logging.StreamHandler()
    _formatter = logging.Formatter('\033[1;30;40m[%(asctime)s] [Grow]\033[00m %(message)s', '%H:%M:%S')
    handler.setFormatter(_formatter)
    logger = logging.getLogger(name)
    logger.propagate = False
    logger.addHandler(handler)
    return logger

logger.get_logger = get_logger
# logger.LOGGER = get_logger('pod')

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
