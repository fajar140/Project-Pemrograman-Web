<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Validator;

class MhsController extends Controller
{
    public function index(){
        $mahasiswa = Mahasiswa::all();
        return response()->json([
            'status'=> 200,
            'mahasiswa'=> $mahasiswa,
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'nama'=>'required|max:70', 
            'npm'=>'required|numeric|digits:8',
            'kelas'=>'required|max:5|min:5',
            'bahasa'=>'required|max:50',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        } else {
            $mahasiswa = new Mahasiswa;
            $mahasiswa->nama = $request->input('nama');
            $mahasiswa->npm = $request->input('npm');
            $mahasiswa->kelas = $request->input('kelas');
            $mahasiswa->bahasa = $request->input('bahasa');
            $mahasiswa->save();

            return response()->json([
                'status'=> 200,
                'message'=> 'Mahasiswa Berhasil Ditambahkan',
            ]);
        }
    }

    public function edit($id) {
        $mahasiswa = Mahasiswa::find($id);
        if($mahasiswa){
        return response()->json([
            'status'=> 200,
            'mahasiswa'=>$mahasiswa,
        ]);
        } else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'Data Mahasiswa Tidak Ditemukan',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|max:70',
            'npm' => 'required|numeric|digits:8',
            'kelas' => 'required|max:5|min:5',
            'bahasa' => 'required|max:50',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->messages(),
            ]);
        } else {
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
                return response()->json([
                    'status' => 404,
                    'message' => 'Data Mahasiswa Tidak Ditemukan',
                ]);
            }
        }
    }
    

    public function destroy($id){
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa ->delete();
        return response() -> json([
            'status'=> 200,
            'message'=> ' Data Mahasiswa Berhasil Dihapus',
        ]);
    }
}