<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2d527fdef5e21972b4068765cab9f8b7
{
    public static $prefixLengthsPsr4 = array (
        'G' => 
        array (
            'GCE\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'GCE\\' => 
        array (
            0 => __DIR__ . '/../..' . '/private',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2d527fdef5e21972b4068765cab9f8b7::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2d527fdef5e21972b4068765cab9f8b7::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
