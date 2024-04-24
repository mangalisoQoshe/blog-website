package data

import (
	"errors"

	"go.mongodb.org/mongo-driver/mongo"
)

var (
	ErrResultNotFound = errors.New("unable to Find result.")
	ErrUnableFindAll  = errors.New("unable to fetch blogs")
)

type Models struct {
	Blogs BlogModel
	Users UserModel
}

func NewModels(Bcollection *mongo.Collection, Ucollection *mongo.Collection) Models {
	return Models{
		Blogs: BlogModel{BlogsCollection: Bcollection},
		Users: UserModel{UsersCollection: Ucollection},
	}
}
