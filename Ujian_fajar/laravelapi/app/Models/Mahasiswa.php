<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Model Mahasiswa yang merepresentasikan entitas 'mahasiswa' dalam basis data
class Mahasiswa extends Model
{
    use HasFactory;
    // Nama tabel yang terkait dengan model ini dalam basis data
    protected $table = 'mahasiswa';
    // Kolom-kolom yang dapat diisi secara massal (mass assignment)
    protected $fillable = [
        'nama',
        'npm',
        'kelas',
        'bahasa',
    ];
}
