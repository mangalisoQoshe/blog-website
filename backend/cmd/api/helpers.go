package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
)

type envelope map[string]interface{}

func (app *application) readIDPathValue(r *http.Request) (int64, error){
	id := r.PathValue("blogId")

	blogId ,err := strconv.ParseInt(id,10,64) 

	if err != nil || blogId < 1 {
		return 0,errors.New("Invalid id value")
	}

	return blogId,nil
}


func (app *application) writeJSON(w http.ResponseWriter, status int,data envelope,headers http.Header) error {
	js, err := json.MarshalIndent(data,"","\t")
	if err != nil {
		return err
	}

	js = append(js, '\n')

	for key, value := range headers {
		w.Header()[key] = value
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil
}