<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MhsController;

Route::get('mahasiswa', [MhsController::class, 'index']);
Route::post('/add-mhs', [MhsController::class, 'store']);
Route::get('/edit-mhs/{id}', [MhsController::class, 'edit']);
Route::put('/update-mhs/{id}', [MhsController::class, 'update']);
Route::delete('delete-mhs/{id}', [MhsController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
