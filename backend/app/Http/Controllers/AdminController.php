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
    public function listAuthors()
    {
        $authors = User::where('role', 'author')->get();
        return response()->json($authors);
    }
    public function updateAuthorStatus(Request $request, $id)
    {
        $author = User::findOrFail($id);
        $author->status = $request->input('status');
        $author->save();

        return response()->json(['message' => 'Author status updated successfully.']);
    }
    public function listBooks()
    {
        $books = Book::all();
        return response()->json($books);
    }
    public function listBooksByAuthor($authorId)
    {
        // Fetch books where the user_id matches the provided author ID
        $books = Book::where('user_id', $authorId)->get();

        if ($books->isEmpty()) {
            return response()->json(['message' => 'No books found for this author'], 404);
        }

        return response()->json($books);
    }
}
