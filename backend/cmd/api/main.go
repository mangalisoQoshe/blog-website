package main

import (
	"context"
	"flag"

	"os"

	"blog.godhand/internal/data"
	"blog.godhand/internal/database"
	"blog.godhand/internal/jsonlog"
	firebase "firebase.google.com/go"

	"google.golang.org/api/option"
)

const version = "1.0.0"

type config struct {
	port   int
	env    string
	db_dsn string

	limiter struct {
		rps     float64
		burst   int
		enabled bool
	}
}

type application struct {
	config   config
	logger   *jsonlog.Logger
	models   data.Models
	firebase *firebase.App
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 8080, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment {developemnt|staging|production}")
	flag.StringVar(&cfg.db_dsn, "db-dsn", os.Getenv("BLOG_DB_DSN"), "MongoDB DSN")

	flag.Float64Var(&cfg.limiter.rps, "limiter-rps", 2, "Rate limiter maximum requests per second")
	flag.IntVar(&cfg.limiter.burst, "limiter-burst", 4, "Rate limiter maximum burst")
	flag.BoolVar(&cfg.limiter.enabled, "limiter-enabled", true, "Enable rate limiter")

	flag.Parse()

	logger := jsonlog.New(os.Stdout, jsonlog.LevelInfo)

	err := database.OpenDB(cfg.db_dsn)
	if err != nil {
		logger.PrintFatal(err, nil)
	}
	logger.PrintInfo("database connection pool established", nil)

	defer func() {
		err = database.CloseDB()
		if err != nil {
			logger.PrintError(err, map[string]string{"MongoDB": "database failed to close connection"})
		}
	}()

	//initialize firebase

	opt := option.WithCredentialsFile("private_key.json")
	firebase, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		logger.PrintFatal(err, map[string]string{"Firebase": "failed to connect"})
	}

	// fb_client, err := firebase.Auth(context.Background())
	// log.Println(fb_client)

	// if err != nil {
	// 	logger.PrintFatal(err, map[string]string{"Firebase": "failed to get client"})
	// }

	//tocken = eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2Ftcy1ibG9nLWI4NjExIiwiYXVkIjoic2Ftcy1ibG9nLWI4NjExIiwiYXV0aF90aW1lIjoxNzExNDE5ODc5LCJ1c2VyX2lkIjoiM1lORWxXbHJOWFhHMmwxenFrTHBEQTFGYVo4MiIsInN1YiI6IjNZTkVsV2xyTlhYRzJsMXpxa0xwREExRmFaODIiLCJpYXQiOjE3MTMzNzM0NjUsImV4cCI6MTcxMzM3NzA2NSwiZW1haWwiOiJnb2RoYW5kQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJnb2RoYW5kQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.n21LUemf5_P_yXxBSXwPeq0vaxCas9eaRYKLyuUPQNS4nPPhAQgmcw2upQ_-sDiBLcYg8Ds9yOuh_QEAf3dvAYSAhQ6lHGPuQWkP3kmbhnpHtCkd650WDBf4aNnLp8rChjBtOpUl_j9ccI5AF3xoAev_iLvKUlweAoROU_Wz3MwkoWVTEj96YJVBh5IlAjZwv_vsEEcOFGYbYI_WXJgz3A7MPOndLZcQ2gGmpEq-xgtGNcvHhLoHW5QLeQPNoPHPkduEXJmEjEKP4N5spSn2lT4cF0muIklKn8jN6Y0iq9SGpBOLulqZI4Ek-Js0rz7i69xj916swnNx9WTfTAWZIA

	logger.PrintInfo("firebase connection pool established", nil)

	app := &application{
		config:   cfg,
		logger:   logger,
		models:   data.NewModels(database.GetCollection("Blogs"),database.GetCollection("Users")),
		firebase: firebase,
	}

	err = app.serve()
	if err != nil {
		logger.PrintFatal(err, nil)
	}
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
