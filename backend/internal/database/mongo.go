package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client      *mongo.Client
	ctx, cancel = context.WithTimeout(context.Background(), 30*time.Second)
)

func OpenDB(db_dsn string) error {

	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(db_dsn).SetServerAPIOptions(serverAPI)
	defer cancel()

	// Create a new client and connect to the server
	local_client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return err
	}

	client = local_client

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		return err
	}

	return nil
}

func CloseDB() error {

	return client.Disconnect(ctx)
}

// get a collection from the 'Blog' database
func GetCollection(collectionName string) *mongo.Collection {
	collection := client.Database("Blog").Collection(collectionName)
	return collection
}
