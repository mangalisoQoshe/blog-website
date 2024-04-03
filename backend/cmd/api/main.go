package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const version = "1.0.0"

var ctx, cancel = context.WithTimeout(context.Background(),20 * time.Second)

type config struct {
	port int
	env  string
	db_dsn string

}

type application struct {
	config config
	logger *log.Logger
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 8080, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment {developemnt|staging|production}")
	flag.StringVar(&cfg.db_dsn,"db-dsn",os.Getenv("BLOG_DB_DSN"), "MongoDB DSN")
	
	flag.Parse()
	

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	db, err := openDB(cfg)
	if err != nil {
		logger.Fatal(err)
	}
	logger.Printf("database connection pool established")

	

	defer db.Disconnect(ctx); 
	
	

	app := &application{
		config: cfg,
		logger: logger,
	}

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	logger.Printf("Starting %s server on %s", cfg.env, srv.Addr)
	err = srv.ListenAndServe()
	logger.Fatal(err)
}

func openDB(cfg config) (*mongo.Client, error) {
	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(cfg.db_dsn).SetServerAPIOptions(serverAPI)
	defer cancel()

	// Create a new client and connect to the server
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil,err
	}

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		return nil, err
	}


	return client,nil
}

// import (
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"strconv"
// )

// type BlogPost struct {
// 	ID    int    `json:"id"`
// 	Title string `json:"title"`
// 	PublishDate string   `json:"pulishDate"`
// 	UpdatedDate string   `json:"updatedDate"`
// 	Tags []string	`json:"tags"`
// 	Body  string `json:"body"`
// 	Brief string `json:"brief"`
// }

// var blogPosts []BlogPost

// func main() {
// 	// Populate some dummy blog posts
// 	blogPosts = []BlogPost{
// 		{ID: 1, Title: "What makes a good website?", UpdatedDate:"",PublishDate: "May 04 2013",
//       Tags: []string{"hosting"}, Body: "This is the first blog post.",Brief:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, soluta rerum accusantium velit aperiam cumque"},
// 		{ID: 2, Title: "Customizing your Hashnode Blog [Complete Guide]", UpdatedDate:"",PublishDate: "May 04 2013",
//       Tags:  []string{"hosting"}, Body: "This is the second blog post.", Brief: "laborum porro praesentium. Velit voluptates corporis iste nam."},
//      {ID: 3,
// 		UpdatedDate:"",
//       PublishDate: "May 04 2013",
//       Title: "Netlify vs. Vercel: Which one is better?",
//       Tags: []string{"hosting","Cash"},
//       Body: "Hashnode provides us with it's fun to mess around with. I've experimented with it a lot as you may have noticed so here are all of the tricks I use",
// 	  Brief: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, soluta",
//     },
//     {
//       ID: 4,
//       PublishDate: "May 04 2023",
// 	  UpdatedDate:"",
//       Title: "Hashnode ambassador",
//       Tags: []string{"hosting","Coding"},
//       Body: "Now I'll preface all of this by saying that you need to be a Hashnode ambassador to",
// 	  Brief: "Vercel is a platform that provides developers with a cloud-based solution for hosting, deploying, and managing web applications",
//     },
//     {
//       ID: 5,
//       PublishDate: "June 04 2013",
// 	  UpdatedDate:"June 30 2013",
//       Title: " Benefits",
//       Tags:  []string{"hosting","Benefits"},
//       Body: "be able to do a lot of what I'm about to talk about (namely anything using custom",
// 	  Brief: "Netlify is best suited for static web applications such as blogs, portfolios, and landing pages. Examples of applications that can be hosted on Netlify include Gatsby, Hugo, and Jekyll.",
//     },
//     {
//       ID: 6,
//       PublishDate: "July 04 2013",
// 	  UpdatedDate:"April 01 2014",
//       Title: "CSS Benefits",
//       Tags: []string{"Frontend","CSS Styling"},
//       Body: "CSS. If you don't know how to become an ambassador they explain it here - it's pretty easy.",
// 	  Brief: "Netlify offers several features such as continuous deployment, instant rollbacks, form handling, serverless functions, and more. Netlify is a great platform for static web application",
//     },
//     {
//       ID: 7,
//       PublishDate: "March 04 2023",
// 	  UpdatedDate:"March 13 2024",
//       Title: "Netflix vs Amazon prime",
//       Tags: []string{"lifestyles","TV"},
//       Body: "Strap in, it's a little longer of a read but it's well worth it!",
// 	  Brief: "Netlify is a platform that provides developers with a complete solution for building, deploying, and hosting web applications",
//     },
// 	}

// 	// Define HTTP routes
// 	http.HandleFunc("/blogs", listPostsHandler)
// 	http.HandleFunc("/blogs/", getPostHandler)

// 	// Start the server
// 	fmt.Println("Server listening on port 8080...")
// 	log.Fatal(http.ListenAndServe(":8080", nil))

// }

// func listPostsHandler(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(blogPosts)
// }

// func getPostHandler(w http.ResponseWriter, r *http.Request) {
// 	// Extract post ID from URL path
// 	idStr := r.URL.Path[len("/blogs/"):]
// 	id, err := strconv.Atoi(idStr)
// 	if err != nil {
// 		http.Error(w, "Invalid post ID", http.StatusBadRequest)
// 		return
// 	}

// 	// Find the post with the given ID
// 	var post *BlogPost
// 	for _, p := range blogPosts {
// 		if p.ID == id {
// 			post = &p
// 			break
// 		}
// 	}

// 	// Return 404 if post not found
// 	if post == nil {
// 		http.Error(w, "Post not found", http.StatusNotFound)
// 		return
// 	}

// 	// Encode and send the post as JSON
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(post)
// }
