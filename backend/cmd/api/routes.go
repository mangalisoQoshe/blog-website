package main

import (
	"net/http"
)


func (app *application) routes() *http.ServeMux{
	router := http.NewServeMux();



	router.HandleFunc("GET /v1/healthcheck",app.healthcheckHandler)
	router.HandleFunc("GET /v1/blogs",app.showBlogsHandler)
	router.HandleFunc("POST /v1/blogs",app.createBlogHandler)
	router.HandleFunc("GET /v1/blogs/{blogId}",app.showBlogHandler)
	router.HandleFunc("PUT /v1/blogs/{blogId}",app.updateBlogHandler)

	return router
	


}