package data

import (
	
	"errors"

	"go.mongodb.org/mongo-driver/mongo"
)

var (
	ErrRecordNotFound = errors.New("Record Not Found.")
)

type Models struct {
	Blogs BlogModel
	
}

func NewModels(collection *mongo.Collection) Models {
	return Models{
		Blogs: BlogModel{BlogsCollection: collection},
		
	}
}
