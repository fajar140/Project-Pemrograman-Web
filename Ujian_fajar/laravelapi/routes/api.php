<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MhsController;

// Definisi rute untuk operasi CRUD pada entitas 'Mahasiswa' menggunakan MhsController

// Menampilkan semua data mahasiswa (GET request)
Route::get('mahasiswa', [MhsController::class, 'index']);
// Menambahkan data mahasiswa baru (POST request)
Route::post('/add-mhs', [MhsController::class, 'store']);
// Mengambil data mahasiswa berdasarkan ID untuk tujuan pengeditan (GET request)
Route::get('/edit-mhs/{id}', [MhsController::class, 'edit']);
// Memperbarui data mahasiswa berdasarkan ID (PUT request)
Route::put('/update-mhs/{id}', [MhsController::class, 'update']);
// Menghapus data mahasiswa berdasarkan ID (DELETE request)
Route::delete('delete-mhs/{id}', [MhsController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
