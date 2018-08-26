<?php
namespace Grav\Plugin;

use \Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

class MarkdownNoticesPlugin extends Plugin
{
    protected $level_classes;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onMarkdownInitialized' => ['onMarkdownInitialized', 0],
            'onTwigSiteVariables'   => ['onTwigSiteVariables', 0]
        ];
    }

    public function onMarkdownInitialized(Event $event)
    {
        $markdown = $event['markdown'];

        $markdown->addBlockType('!', 'Notices', true, false);

        $markdown->blockNotices = function($Line) {

            $this->level_classes = $this->config->get('plugins.markdown-notices.level_classes');

            if (preg_match('/^(!{1,'.count($this->level_classes).'})[ ]+(.*)/', $Line['text'], $matches))
            {
                $level = strlen($matches[1]) - 1;



                // if we have more levels than we support
                if ($level > count($this->level_classes)-1)
                {
                    return;
                }

                $text = $matches[2];

                $Block = array(
                    'element' => array(
                        'name' => 'div',
                        'handler' => 'lines',
                        'attributes' => array(
                            'class' => 'notices '. $this->level_classes[$level],
                        ),
                        'text' => (array) $text,
                    ),
                );

                return $Block;
            }
        };

        $markdown->blockNoticesContinue = function($Line, array $Block) {
            if (isset($Block['interrupted']))
            {
                return;
            }

            if ($Line['text'][0] === '!' and preg_match('/^(!{1,'.count($this->level_classes).'})(.*)/', $Line['text'], $matches))
            {
                $Block['element']['text'] []= ltrim($matches[2]);

                return $Block;
            }
        };
    }

    public function onTwigSiteVariables()
    {
        if ($this->config->get('plugins.markdown-notices.built_in_css')) {
            $this->grav['assets']
                ->add('plugin://markdown-notices/assets/notices.css');
        }
    }

}