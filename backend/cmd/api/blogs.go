package main

import (
	"fmt"

	"net/http"
	"time"

	"blog.godhand/internal/data"
	"blog.godhand/internal/validator"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (app *application) createBlogHandler(w http.ResponseWriter, r *http.Request) {

	var input data.CreateBlog
	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	input.CreatedAt = time.Now()

	v := validator.New()

	// Use the Valid() method to see if any of the checks failed. If they did, then use
	// the failedValidationResponse() helper to send a response to the client, passing
	// in the v.Errors map.
	if data.ValidateBlog(v, &input); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	//insert the blog into the database
	res, err := app.models.Blogs.Insert(&input)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
	blog := &data.Blog{
		ID:        res.InsertedID.(primitive.ObjectID),
		Title:     input.Title,
		Tags:      input.Tags,
		CreatedAt: input.CreatedAt,
		Body:      input.Body,
		Brief:     input.Body,
		Version:   0,
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("v1/blogs/%s", blog.ID.Hex()))

	err = app.writeJSON(w, http.StatusCreated, envelope{"blog": blog}, headers)

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

// show a blog with id
func (app *application) showBlogHandler(w http.ResponseWriter, r *http.Request) {

	blogId, err := app.readIDPathValue(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	objId, err := primitive.ObjectIDFromHex(blogId)

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	blog, err := app.models.Blogs.Get(objId)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"blog": blog}, nil)

	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

// show all blogs
func (app *application) showBlogsHandler(w http.ResponseWriter, r *http.Request) {
	blogs, err := app.models.Blogs.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"blogs": blogs}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) updateBlogHandler(w http.ResponseWriter, r *http.Request) {
	var input data.CreateBlog
	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	v := validator.New()

	// Use the Valid() method to see if any of the checks failed. If they did, then use
	// the failedValidationResponse() helper to send a response to the client, passing
	// in the v.Errors map.
	if data.ValidateBlog(v, &input); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	//retrieve blog id from params
	blogId, err := app.readIDPathValue(r)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	objId, err := primitive.ObjectIDFromHex(blogId)

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return

	}

	blog := &data.Blog{
		ID:        objId,
		Title:     input.Title,
		Tags:      input.Tags,
		Body:      input.Body,
		CreatedAt: input.CreatedAt,
		UpdatedAt: time.Now(),
		Brief:     input.Body,
		Version:   input.Version + 1,
	}

	err = app.models.Blogs.Update(blog)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"blog": blog}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

}
