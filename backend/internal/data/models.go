package data

import (
	
	"errors"

	"go.mongodb.org/mongo-driver/mongo"
)

var (
	ErrResultNotFound = errors.New("Unable to Find result.")
	ErrUnableFindAll = errors.New("Unable to fetch blogs")
)

type Models struct {
	Blogs BlogModel
	
}

func NewModels(collection *mongo.Collection) Models {
	return Models{
		Blogs: BlogModel{BlogsCollection: collection},
		
	}
}
