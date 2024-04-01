package main

import (
	"fmt"
	"net/http"
	"time"

	"blog.godhand/internal/data"
)

func (app *application) createBlogHandler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w,"Create a new blog")
}

//show a blod with id
func (app *application) showBlogHandler(w http.ResponseWriter, r *http.Request){
	
	blogId, err := app.readIDPathValue(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	blog := data.Blog{
	ID  : blogId,
 	Title : "How to write idomatic Golang",
 	CreatedAt : data.DateType(time.Now()),
 	UpdatedAt : data.DateType(time.Now()),
 	Tags : []string{"Lifestyle","Programming"},
 	Body : "This is the main body of the blog",
 	Brief : "Short summary of the blog",
	Version: 1,
	}

	err = app.writeJSON(w,http.StatusOK,envelope{"blog":blog},nil)

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	
}


//show all blogs
func (app *application) showBlogsHandler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w,"Show all blogs")
}



