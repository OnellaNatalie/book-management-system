<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('author');
    }

    public function listBooks()
    {
        $authorId = Auth::id();
        $books = Book::where('user_id', $authorId)->get();
        return response()->json($books);
    }

    public function addBook(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'cover_image' => 'nullable|string|max:255'
        ]);

        $book = new Book();
        $book->title = $validatedData['title'];
        $book->cover_image = $validatedData['cover_image'];
        $book->user_id = Auth::id(); 
        $book->save();

        return response()->json(['message' => 'Book created successfully.', 'book' => $book], 201);
    }
   

}
