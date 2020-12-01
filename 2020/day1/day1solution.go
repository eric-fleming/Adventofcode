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
	fmt.Println("------ MERRY CHRISTMAS! -------")
	part1(nums)
	part2(nums)
}

func part2(nums []int) {
	var val1, val2, val3 int
	size := len(nums)
	for i := 0; i < size-2; i++ {
		for j := i + 1; j < size-1; j++ {
			for k := i + 2; k < size; k++ {
				if nums[i]+nums[j]+nums[k] == 2020 {
					val1 = nums[i]
					val2 = nums[j]
					val3 = nums[k]
					break
				} else {
					continue
				}
			}
		}
	}
	fmt.Println("------ Part 2! -------")
	fmt.Printf("Your values are %d, %d, & %d\n", val1, val2, val3)
	fmt.Printf("Their product is %d\n", val1*val2*val3)
}

func part1(nums []int) {
	var val1, val2 int
	size := len(nums)
	for i := 0; i < size-1; i++ {
		for j := i + 1; j < size; j++ {
			if nums[i]+nums[j] == 2020 {
				val1 = nums[i]
				val2 = nums[j]
				break
			} else {
				continue
			}
		}
	}
	fmt.Println("------ Part 1! -------")
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
