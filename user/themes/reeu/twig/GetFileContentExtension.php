<?php

namespace Grav\Theme;

use Twig_Extension;
use Twig_SimpleFunction;

/**
 * Twig filter inlining Critical CSS
 */
class GetFileContentExtension extends Twig_Extension
{

    public function __construct() {
    }

    /**
     * Returns extension name.
     *
     * @return string
     */
    public function getName()
    {
        return 'GetFileContent';
    }

    public function getFunctions()
    {
        return [
            new Twig_SimpleFunction('get_file_content', function (string $file): string {
                    //return file_get_contents($file);
                    $fullPath = __DIR__ . '/../' . $file;
                    return file_exists($fullPath) ? file_get_contents($fullPath) : '';
                }
            )
        ];
    }
}


