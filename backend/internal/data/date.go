package data

import (
	"errors"
	"fmt"
	"log"
	"strconv"

	"time"
)

type DateType time.Time

var ErrInvalidDateFormat = errors.New("Invalid date format")

func (dt DateType) MarshalJSON() ([]byte, error) {
	y, m, d := (time.Time(dt)).Date()

	year := strconv.Itoa(y)
	day := strconv.Itoa(d)
	month := m.String()

	jsonValue := fmt.Sprint(day + "/" + month + "/" + year)

	quotedJSONValue := strconv.Quote(jsonValue)

	return []byte(quotedJSONValue), nil
}

func (dt *DateType) UnmarshalJSON(jsonValue []byte) error {
	unquotedJSONValue, err := strconv.Unquote(string(jsonValue))
	if err != nil {
		return ErrInvalidDateFormat
	}


	layout := "2/January/2006"


	date, err := time.Parse(layout, unquotedJSONValue)

	if err != nil {
		log.Println("Error parsing date: ", err)
		return err
	}

	*dt = DateType(date)



	return nil
}
