package main

import (
	"fmt"
	"net/http"
)

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w,"status: available")
	fmt.Fprintf(w,"environment: %s\n",app.config.env)
	fmt.Fprintln(w,"version",version)
	app.logger.Println("hexxx")
}