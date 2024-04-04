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

	var input struct {
		ID        primitive.ObjectID `json:"id"  bson:"_id"`
		Title     string             `json:"title"`
		CreatedAt data.DateType      `json:"createdAt"`
		Tags      []string           `json:"tags"`
		Body      string             `json:"body"`
		Brief     string             `json:"brief"`
		Version   int32              `json:"version"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	blog := &data.Blog{
		ID:        primitive.NewObjectID(),
		Title:     input.Title,
		Tags:      input.Tags,
		Body:      input.Body,
		Brief:     input.Body,
		Version:   0,
		CreatedAt: data.DateType(time.Now()),
	}

	v := validator.New()

	// Use the Valid() method to see if any of the checks failed. If they did, then use
	// the failedValidationResponse() helper to send a response to the client, passing
	// in the v.Errors map.
	if data.ValidateBlog(v, blog); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	//insert the blog into the database
	err = app.models.Blogs.Insert(blog)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("v1/blogs/%s", blog.ID.Hex()))

	err = app.writeJSON(w, http.StatusCreated, envelope{"blog": blog}, headers)

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

	objId, err := primitive.ObjectIDFromHex(blogId)

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	blog := data.Blog{
		ID:        objId,
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
