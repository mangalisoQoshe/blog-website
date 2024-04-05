package data

import (
	"context"
	"log"
	"time"

	"blog.godhand/internal/validator"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Blog struct {
	ID        primitive.ObjectID `json:"id,omitempty"  bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
	Tags      []string           `json:"tags" bson:"tags"`
	Body      string             `json:"body" bson:"body"`
	Brief     string             `json:"brief" bson:"brief"`
	Version   int32              `json:"version" bson:"version"` // The version number starts at 1 and will be incremented each
	// time the blog information is updated
}

type CreateBlog struct {
	Title     string    `json:"title" bson:"title"`
	Tags      []string  `json:"tags" bson:"tags"`
	Body      string    `json:"body" bson:"body"`
	Brief     string    `json:"brief" bson:"brief"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	Version   int32     `json:"version" bson:"version"`
}

var ctx, _ = context.WithTimeout(context.Background(), 30*time.Second)

type BlogModel struct {
	BlogsCollection *mongo.Collection
}

func (b BlogModel) Insert(blog *CreateBlog) (*mongo.InsertOneResult, error) {
	result, err := b.BlogsCollection.InsertOne(ctx, blog)

	return result, err
}

func (b BlogModel) GetAll() (*[]Blog, error) {
	cursor, err := b.BlogsCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, ErrUnableFindAll
	}

	var blogs []Blog
	if err := cursor.All(ctx, &blogs); err != nil {
		return nil, ErrUnableFindAll
	}

	return &blogs, nil
}

func (b BlogModel) Get(id primitive.ObjectID) (*Blog, error) {

	results := b.BlogsCollection.FindOne(ctx, primitive.M{"_id": id})
	var blog Blog
	err := results.Decode(&blog)
	if err != nil {
		return nil, ErrResultNotFound
	}
	return &blog, nil
}

func (b BlogModel) Update(blog *Blog) error {

	update := bson.M{"title": blog.Title, "body": blog.Body, "createdAt": blog.CreatedAt, "updatedAt": blog.UpdatedAt, "brief": blog.Brief, "tags": blog.Tags, "version": blog.Version}
	//data, err := bson.Marshal(blog)
	// if err != nil{
	// 	return err
	// }

	res, err := b.BlogsCollection.UpdateOne(ctx, bson.M{"_id": blog.ID}, bson.M{"$set": update})
	log.Println(res)
	//log.Println(res.UpsertedCount)
	//log.Println(blog.ID)
	return err
}

func (b BlogModel) Delete(id int64) error {
	return nil
}

func ValidateBlog(v *validator.Validator, blog *CreateBlog) {

	// Use the Check() method to execute our validation checks. This will add the
	// provided key and error message to the errors map if the check does not evaluate
	// to true. For example, in the first line here we "check that the title is not
	// equal to the empty string". In the second, we "check that the length of the title
	// is less than or equal to 500 bytes" and so on.
	v.Check(blog.Title != "", "title", "must be provided")
	v.Check(len(blog.Title) <= 500, "title", "must not be more than 500 bytes long")

	v.Check(blog.Body != "", "body", "must be provided")

	v.Check(blog.Brief != "", "brief", "must be provided")

	v.Check(blog.Tags != nil, "tags", "must be provided")
	v.Check(len(blog.Tags) >= 1, "tags", "must contain at least 1 genre")
	// Note that we're using the Unique helper in the line below to check that all
	// values in the input.Genres slice are unique.
	v.Check(validator.Unique(blog.Tags), "tags", "must not contain duplicate values")

}