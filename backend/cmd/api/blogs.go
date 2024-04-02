package main

import (
	"fmt"
	"net/http"
	"time"

	"blog.godhand/internal/data"
	"blog.godhand/internal/validator"
)

func (app *application) createBlogHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Title string   `json:"title"`
		Tags  []string `json:"tags"`
		Body  string   `json:"body"`
		Brief string   `json:"brief"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	blog := &data.Blog{
		Title: input.Title,
		Tags:  input.Tags,
		Body:  input.Body,
		Brief: input.Body,
	}

	v := validator.New()

	// Use the Valid() method to see if any of the checks failed. If they did, then use
	// the failedValidationResponse() helper to send a response to the client, passing
	// in the v.Errors map.
	if data.ValidateBlog(v, blog); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	//fmt.Fprintf(w, "%+v\n", input)
	err = app.writeJSON(w, http.StatusOK, envelope{"blog": input}, nil)

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

// show a blod with id
func (app *application) showBlogHandler(w http.ResponseWriter, r *http.Request) {

	blogId, err := app.readIDPathValue(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	blog := data.Blog{
		ID:        blogId,
		Title:     "How to write idomatic Golang",
		CreatedAt: data.DateType(time.Now()),
		UpdatedAt: data.DateType(time.Now()),
		Tags:      []string{"Lifestyle", "Programming"},
		Body:      "This is the main body of the blog",
		Brief:     "Short summary of the blog",
		Version:   1,
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"blog": blog}, nil)

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

// show all blogs
func (app *application) showBlogsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Show all blogs")
}
