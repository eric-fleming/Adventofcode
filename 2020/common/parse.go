package common

import (
	"strconv"
	"strings"
)

// This package is for manipulating data and types

// ConvertToInts takes an array of strings and converts it an an array of ints
func ConvertToInts(lines []string) []int {
	// prints each of the slice values.
	var nums []int
	for _, eachLine := range lines {
		eachLine = strings.TrimSuffix(eachLine, "\n")
		eachLine = strings.Trim(eachLine, " ")
		n, err := strconv.Atoi(eachLine)
		if err != nil {
			panic("Conversion to int failed")
		}
		nums = append(nums, n)
	}

	return nums
}
