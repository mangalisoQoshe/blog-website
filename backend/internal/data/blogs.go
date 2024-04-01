package data


type Blog struct{
	ID        int64       `json:"id"`
 	Title     string      `json:"title"`
 	CreatedAt DateType   `json:"createdAt"`
 	UpdatedAt DateType   `json:"updatedAt,omitempty"`
 	Tags      []string    `json:"tags"`
 	Body      string      `json:"body"`
 	Brief     string      `json:"brief"`
	Version   int32       `json:"version"` // The version number starts at 1 and will be incremented each
                       // time the blog information is updated
}