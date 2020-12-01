package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {

	file, err := os.Open("day1input.txt")

	if err != nil {
		log.Fatalf("failed to open")
	}

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	var text []string
	for scanner.Scan() {
		text = append(text, scanner.Text())
	}
	file.Close()

	nums := convertToInts(text)
	size := len(nums)
	var val1, val2 int

	for i := 0; i < size; i++ {
		for j := 1; j < size; j++ {
			if i != j && nums[i]+nums[j] == 2020 {
				val1 = nums[i]
				val2 = nums[j]
				break
			} else {
				continue
			}
		}
	}
	fmt.Println("------MERRY CHRISTMAS!-------")
	fmt.Printf("Your values are %d and %d\n", val1, val2)
	fmt.Printf("Their product is %d\n", val1*val2)

}

func convertToInts(lines []string) []int {
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
