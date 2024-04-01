package data

import (
	"fmt"
	"strconv"
	"time"
)

type DateType time.Time


func (dt DateType) MarshalJSON()([]byte, error) {
	y, m, d := (time.Time(dt)).Date()

	year := strconv.Itoa(y)
	day := strconv.Itoa(d)
	month := m.String()

	jsonValue := fmt.Sprint(day+"/"+month+"/"+year)

	quotedJSONValue := strconv.Quote(jsonValue)

	return []byte(quotedJSONValue), nil
}