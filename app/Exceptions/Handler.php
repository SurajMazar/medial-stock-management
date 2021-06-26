<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, \Throwable $exception)
    {
        info($exception->getTraceAsString());
        if ($request->expectsJson()) {
            if ($exception instanceof  ValidationException) {
                return failure($exception->getMessage(), 422, ['errors' => $exception->errors()]);
            }
            if ($exception instanceof  BindingResolutionException) {
                return failure($exception->getMessage(), 500);
            }
            if ($exception instanceof \ErrorException) {
                return failure($exception->getMessage(), 500);
            }
            if ($exception instanceof NotFoundHttpException) {
                return failure("URL not found", 404, ['type' => 'NotFoundHttpException', 'code' => $exception->getCode()]);
            }
            if ($exception instanceof ModelNotFoundException) {
                return failure($exception->getMessage(), 404);
            }
            if ($exception instanceof AuthorizationException) {
                return failure("This action is unauthorized.", 403);
            }
            if ($exception instanceof MethodNotAllowedHttpException) {
                return failure($exception->getMessage(), 405);
            }
        }
        return parent::render($request, $exception);
    }               

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
