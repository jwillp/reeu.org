<?php
namespace Grav\Theme;

use Grav\Common\Theme;

class REEU extends Theme
{

    public static function getSubscribedEvents()
    {

        return [
            'onThemeInitialized' => ['onThemeInitialized', 0],
        ];
    }

    public function onThemeInitialized()
    {
        if ($this->isAdmin()) {
            $this->active = false;
            return;
        }

        $this->enable([
            'onTwigExtensions' => ['onTwigExtensions', 0],
        ]);

    }

    public function onTwigExtensions()
    {

        // Cache Busting Manifest
        require_once(__DIR__ . '/twig/WebpackAssetsExtension.php');
        $this->grav['twig']->twig->addExtension(
            new WebpackAssetsExtension(__DIR__ . '/dist/manifest.json')
        );


        // Load file content (mostly used for critical css inlining)
        require_once(__DIR__ . '/twig/GetFileContentExtension.php');
        $this->grav['twig']->twig->addExtension(
            new GetFileContentExtension()
        );
    }
}
