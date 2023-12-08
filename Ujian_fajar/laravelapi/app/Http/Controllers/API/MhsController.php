<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Validator;

class MhsController extends Controller
{
    // Menampilkan semua data mahasiswa
    public function index(){
        $mahasiswa = Mahasiswa::all();
        return response()->json([
            'status'=> 200,
            'mahasiswa'=> $mahasiswa,
        ]);
    }

    // Menyimpan data mahasiswa baru
    public function store(Request $request) {
        // Mengvalidasi input menggunakan validator
        $validator = Validator::make($request->all(),[
            'nama'=>'required|max:70', 
            'npm'=>'required|numeric|digits:8',
            'kelas'=>'required|max:5|min:5',
            'bahasa'=>'required|max:50',
        ]);

        // Jika validasi gagal, kembalikan pesan error
        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        } else {
            // Jika validasi berhasil, simpan data mahasiswa baru
            $mahasiswa = new Mahasiswa;
            $mahasiswa->nama = $request->input('nama');
            $mahasiswa->npm = $request->input('npm');
            $mahasiswa->kelas = $request->input('kelas');
            $mahasiswa->bahasa = $request->input('bahasa');
            $mahasiswa->save();

            // Kembalikan pesan sukses
            return response()->json([
                'status'=> 200,
                'message'=> 'Mahasiswa Berhasil Ditambahkan',
            ]);
        }
    }

    // Mengambil data mahasiswa berdasarkan ID untuk tujuan pengeditan data
    public function edit($id) {
        $mahasiswa = Mahasiswa::find($id);
        // Jika data mahasiswa ditemukan, kembalikan dalam format JSON dengan status 200
        if($mahasiswa){
        return response()->json([
            'status'=> 200,
            'mahasiswa'=>$mahasiswa,
        ]);
        } else
        {
            // Jila data mahasiswa tidak ditemukan, kembalikan pesan error
            return response()->json([
                'status'=> 404,
                'message' => 'Data Mahasiswa Tidak Ditemukan',
            ]);
        }
    }
    // Memperbarui data mahasiswa berdasarkan ID
    public function update(Request $request, $id)
    {
        // Validasi input menggunakan validator
        $validator = Validator::make($request->all(), [
            'nama' => 'required|max:70',
            'npm' => 'required|numeric|digits:8',
            'kelas' => 'required|max:5|min:5',
            'bahasa' => 'required|max:50',
        ]);

        // Jika validasi gagal, kembalikan pesan error
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->messages(),
            ]);
        } else {
            // Jika data mahasiswa ditemukan, perbarui data dan kembalikan pesan sukses
            $mahasiswa = Mahasiswa::find($id);
            if ($mahasiswa) {
                $mahasiswa->nama = $request->input('nama');
                $mahasiswa->npm = $request->input('npm');
                $mahasiswa->kelas = $request->input('kelas');
                $mahasiswa->bahasa = $request->input('bahasa');
                $mahasiswa->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Data Mahasiswa Berhasil Diperbarui',
                ]);
            } else {
                // Jika data mahasiswa tidak ditemukan, kembalikan pesan error
                return response()->json([
                    'status' => 404,
                    'message' => 'Data Mahasiswa Tidak Ditemukan',
                ]);
            }
        }
    }
    
    // Menghapus data mahasiswa berdasarkan ID
    public function destroy($id){
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa ->delete();
        return response() -> json([
            'status'=> 200,
            'message'=> ' Data Mahasiswa Berhasil Dihapus',
        ]);
    }
}