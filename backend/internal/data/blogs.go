package data

import (
	"blog.godhand/internal/validator"
	"go.mongodb.org/mongo-driver/mongo"
)

type Blog struct {
	ID        int64    `json:"id"`
	Title     string   `json:"title"`
	CreatedAt DateType `json:"createdAt"`
	UpdatedAt DateType `json:"updatedAt,omitempty"`
	Tags      []string `json:"tags"`
	Body      string   `json:"body"`
	Brief     string   `json:"brief"`
	Version   int32    `json:"version"` // The version number starts at 1 and will be incremented each
	// time the blog information is updated
}

type BlogModel struct{
	DB *mongo.Client
}

func ValidateBlog(v *validator.Validator, blog *Blog) {

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


