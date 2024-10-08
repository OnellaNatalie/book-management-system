<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    //Get authors
    public function listAuthors()
    {
        $authors = User::where('role', 'author')->get();
        return response()->json($authors);
    }

    //Update the author status to active or inactive
    public function updateAuthorStatus(Request $request, $id)
    {
        // \Log::info('update user status');

        $author = User::findOrFail($id);
        $author->status = $request->input('status');
        $author->save();

        return response()->json(['message' => 'Author status updated successfully.']);
    }

    //Get books with the user 
    public function listBooks()
    {
        $books = Book::with('user')->get();
        return response()->json($books);
    }
   
}
