package data

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var AnonymousUser = &User{}

type User struct {
	UID   string `json:"uid,omitempty"  bson:"uid,omitempty"`
	Email string `json:"email,omitempty"  bson:"email,omitempty"`
}

func (u *User) IsAnonymous() bool {
	return u.Email == "" && u.UID == ""
}

type UserModel struct {
	UsersCollection *mongo.Collection
}

func (u UserModel) IsAuthorized(email string) bool {
	var ctx, cancel = context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	filter := bson.M{"email": email}
	count, err := u.UsersCollection.CountDocuments(ctx, filter)
	if err != nil {
		panic(err)
	}

	return count > 0
}
