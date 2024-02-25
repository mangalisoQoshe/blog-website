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
	PublishDate string   `json:"pulishDate"`
	UpdatedDate string   `json:"updatedDate"`
	Tag string	`json:"tag"`
	Body  string `json:"body"`
	Brief string `json:"brief"`
}

var blogPosts []BlogPost

func main() {
	// Populate some dummy blog posts
	blogPosts = []BlogPost{
		{ID: 1, Title: "What makes a good website?", UpdatedDate:"",PublishDate: "May 04 2013",
      Tag: "hosting", Body: "This is the first blog post.",Brief:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, soluta rerum accusantium velit aperiam cumque"},
		{ID: 2, Title: "Customizing your Hashnode Blog [Complete Guide]", UpdatedDate:"",PublishDate: "May 04 2013",
      Tag: "hosting", Body: "This is the second blog post.", Brief: "laborum porro praesentium. Velit voluptates corporis iste nam."},
     {ID: 3,
		UpdatedDate:"",
      PublishDate: "May 04 2013",
      Title: "Netlify vs. Vercel: Which one is better?",
      Tag: "hosting",
      Body: "Hashnode provides us with it's fun to mess around with. I've experimented with it a lot as you may have noticed so here are all of the tricks I use",
	  Brief: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, soluta",
    },
    {
      ID: 4,
      PublishDate: "May 04 2023",
	  UpdatedDate:"",
      Title: "Hashnode ambassador",
      Tag: "hosting",
      Body: "Now I'll preface all of this by saying that you need to be a Hashnode ambassador to",
	  Brief: "Vercel is a platform that provides developers with a cloud-based solution for hosting, deploying, and managing web applications",
    },
    {
      ID: 5,
      PublishDate: "June 04 2013",
	  UpdatedDate:"June 30 2013",
      Title: " Benefits",
      Tag: "lifestyle",
      Body: "be able to do a lot of what I'm about to talk about (namely anything using custom",
	  Brief: "Netlify is best suited for static web applications such as blogs, portfolios, and landing pages. Examples of applications that can be hosted on Netlify include Gatsby, Hugo, and Jekyll.",
    },
    {
      ID: 6,
      PublishDate: "July 04 2013",
	  UpdatedDate:"April 01 2014",
      Title: "CSS Benefits",
      Tag: "styling",
      Body: "CSS. If you don't know how to become an ambassador they explain it here - it's pretty easy.",
	  Brief: "Netlify offers several features such as continuous deployment, instant rollbacks, form handling, serverless functions, and more. Netlify is a great platform for static web application",
    },
    {
      ID: 7,
      PublishDate: "March 04 2023",
	  UpdatedDate:"March 13 2024",
      Title: "Netflix vs Amazon prime",
      Tag: "tv",
      Body: "Strap in, it's a little longer of a read but it's well worth it!",
	  Brief: "Netlify is a platform that provides developers with a complete solution for building, deploying, and hosting web applications",
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