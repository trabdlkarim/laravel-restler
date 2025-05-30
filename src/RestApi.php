<?php

namespace Mirak\Lararestler;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Luracast\Restler\RestException as RestlerRestException;
use Mirak\Lararestler\Exceptions\RestException;
use Mirak\Lararestler\Routing\DynamicRoute;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class RestApi
{
    private static $defaultNamespace = "App\\Http\\Resources";

    public static function routes()
    {
        self::registerRoutes();
        foreach (range(1, self::version()) as $version) {
            Route::prefix('v' . $version)->group(function () use ($version) {
                self::registerRoutes($version);
            });
        }
    }

    public static function version()
    {
        return config('lararestler.version');
    }

    public static function resources()
    {
        return config("lararestler.resources");
    }

    /**
     * Register API routes for a specific version 
     * 
     * @param int $v [optional] API version
     * @return void
     */
    private static function registerRoutes($v = null)
    {
        if ($v) $v = "v{$v}";
        foreach (self::resources() as $path => $class) {
            if (!class_exists($class)) {
                $class = self::getResourceNamespace() . '\\' . $class;
            }

            if ($v) {
                $reflection = new \ReflectionClass($class);
                $default = $class;
                $class = $reflection->getNamespaceName() . "\\" . $v . "\\" . $reflection->getShortName();
                if (class_exists($class)) {
                    DynamicRoute::controller($class, $path);
                } else {
                    DynamicRoute::controller($default, $path);
                }
            } else {
                DynamicRoute::controller($class, $path);
            }
        }
    }

    public static function getResourceNamespace()
    {
        return trim(config('lararestler.namespace', self::$defaultNamespace), '\\');
    }

    public static function getPathPrefix()
    {
        return trim(config('lararestler.path_prefix', ''), '/');
    }

    public static function removePathPrefix(string $path)
    {
        $prefix = self::getPathPrefix();
        if ($prefix) {
            $prefix .= "/";
            $pos = strpos($path, $prefix);
            if ($pos === 0) {
                $path = substr($path, strlen($prefix));
            }
        }
        return $path;
    }

    /**
     * Render an HTTP exception into a JSON response if the current request expects JSON.
     * 
     * @param Illuminate\Foundation\Configuration\Exceptions $exceptions
     * @param bool $enforceJson Whether to always return JSON response or not. 
     * @return void
     */
    public static function renderException($exceptions, $enforceJson = false)
    {
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $e) use ($enforceJson) {
            return $enforceJson || $request->expectsJson();
        });

        $exceptions->render(function (Exception $e, Request $request) use ($enforceJson) {
            if ($enforceJson || $request->expectsJson()) {
                $isRestEx = $e instanceof RestlerRestException;
                $isValidationEx = $e instanceof ValidationException;
                if ($isRestEx || $isValidationEx || $e instanceof HttpException) {

                    if ($isRestEx) {
                        $code = $e->getCode();
                    } elseif ($isValidationEx) {
                        $code = 422;
                    } else {
                        $code = $e->getStatusCode();
                    }

                    $message = $e->getMessage();

                    if (isset(RestException::$codes[$code])) {
                        $message = RestException::$codes[$code] .
                            (empty($message) ? '' : ': ' . $message);
                    }

                    $res = [
                        "error" => [
                            'code' => $code,
                            'message' => $message,
                        ],

                    ];

                    if ($isValidationEx) {
                        $res['error']['validation'] = $e->errors();
                    }

                    if (App::hasDebugModeEnabled()) {
                        $res["debug"] = [
                            "exception" => get_class($e),
                            "file" => $e->getFile(),
                            "line" => $e->getLine(),
                            "trace" => $e->getTrace(),
                        ];
                    }

                    return response()->json($res, $code);
                }
            }
        });
    }
}
