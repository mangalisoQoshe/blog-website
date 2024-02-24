package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

type BlogPost struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Date string   `json:"date"`
	Topic string	`json:"topic"`
	Body  string `json:"body"`
}

var blogPosts []BlogPost

func main() {
	// Populate some dummy blog posts
	blogPosts = []BlogPost{
		{ID: 1, Title: "First Post", Date: "May 04 2013",
      Topic: "hosting", Body: "This is the first blog post."},
		{ID: 2, Title: "Second Post", Date: "May 04 2013",
      Topic: "hosting", Body: "This is the second blog post."},
     {ID: 3,
      Date: "May 04 2013",
      Title: "Hashnode Benefits",
      Topic: "hosting",
      Body: "Hashnode provides us with it's fun to mess around with. I've experimented with it a lot as you may have noticed so here are all of the tricks I use",
    },
    {
      ID: 4,
      Date: "May 04 2023",
      Title: "Hashnode ambassador",
      Topic: "hosting",
      Body: "Now I'll preface all of this by saying that you need to be a Hashnode ambassador to",
    },
    {
      ID: 5,
      Date: "June 04 2013",
      Title: " Benefits",
      Topic: "lifestyle",
      Body: "be able to do a lot of what I'm about to talk about (namely anything using custom",
    },
    {
      ID: 6,
      Date: "July 04 2013",
      Title: "CSS Benefits",
      Topic: "styling",
      Body: "CSS. If you don't know how to become an ambassador they explain it here - it's pretty easy.",
    },
    {
      ID: 7,
      Date: "March 04 2023",
      Title: "Netflix vs Amazon prime",
      Topic: "tv",
      Body: "Strap in, it's a little longer of a read but it's well worth it!",
    },
	}

	// Define HTTP routes
	http.HandleFunc("/blogs", listPostsHandler)
	http.HandleFunc("/blogs/", getPostHandler)

	// Start the server
	fmt.Println("Server listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))


}

func listPostsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(blogPosts)
}

func getPostHandler(w http.ResponseWriter, r *http.Request) {
	// Extract post ID from URL path
	idStr := r.URL.Path[len("/blogs/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	// Find the post with the given ID
	var post *BlogPost
	for _, p := range blogPosts {
		if p.ID == id {
			post = &p
			break
		}
	}

	// Return 404 if post not found
	if post == nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	// Encode and send the post as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}