<?php
namespace Grav\Theme;

use Twig_Extension;
use Twig_SimpleFilter;

/**
 * Maps a file name to its cash hashed name
 */
class WebpackAssetsExtension extends Twig_Extension
{

    // Assets Manigest
    private $manifest;

    public function __construct($manifestPath) {
        if (!file_exists($manifestPath)) {
            $this->manifest = [];
            return;
        }

        $content   = file_get_contents($manifestPath);
        $this->manifest = json_decode($content, true);
    }

    /**
     * Returns extension name.
     *
     * @return string
     */
    public function getName()
    {
        return 'WebpackAssetsExtension';
    }

    public function getFilters()
    {
        return [
            new Twig_SimpleFilter('webpack_asset', function (string $name): string {
                return array_key_exists($name, $this->manifest) ? $this->manifest[$name] : "";
            }),
        ];
    }
}
