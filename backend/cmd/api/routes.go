package main

import (
	"net/http"
)


func (app *application) routes() http.Handler{
	router := http.NewServeMux();

	router.HandleFunc("GET /v1/healthcheck",app.healthcheckHandler)
	router.HandleFunc("GET /v1/blogs",app.showBlogsHandler)
	router.HandleFunc("POST /v1/blogs",app.createBlogHandler)
	router.HandleFunc("GET /v1/blogs/{blogId}",app.showBlogHandler)
	router.HandleFunc("PUT /v1/blogs/{blogId}",app.updateBlogHandler)
	router.HandleFunc("DELETE /v1/blogs/{blogId}",app.deleteBlogByIDHandler)

	return app.recoverPanic(app.rateLimit(router))
	


}