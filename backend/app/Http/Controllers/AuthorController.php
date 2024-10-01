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
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'cover_image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048'
            ]);

            $book = new Book();
            $book->title = $validatedData['title'];
            if ($request->hasFile('cover_image')) {
                $path = $request->file('cover_image')->store('cover_images'); // Store the uploaded image
                $book->cover_image = $path;
            }
            $book->user_id = Auth::id();
            $book->save();

            return response()->json(['message' => 'Book created successfully.', 'book' => $book], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

   

}
