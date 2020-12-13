package main

import (
	"fmt"
	"strconv"
	"strings"

	common "../common"
)

func main() {
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")

	// Read the file
	filename := "day13input.txt"
	text := common.ReadInputText(filename)
	//common.Show(templateForrest, "string")
	start, _ := strconv.Atoi(strings.TrimSpace(text[0]))
	fmt.Println(start)

	info := strings.Split(strings.TrimSpace(text[1]), ",")
	var nums []int
	for _, item := range info {
		if item != "x" {
			n, _ := strconv.Atoi(item)
			nums = append(nums, n)
		}
	}

	fmt.Printf("%v", nums)
	part1(nums, start)
	part2(info)

}

func part1(nums []int, target int) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")
	fmt.Printf("Starting at %v\n", target)

	i := target
	var divisor int

	for i = target; i < 10000000000; i++ {
		shouldBreak := false
		for d := 0; d < len(nums); d++ {
			if i%nums[d] == 0 {
				shouldBreak = true
				divisor = nums[d]
				break
			}
		}
		if shouldBreak {
			break
		}
	}

	fmt.Printf("The first number is = %v\n", i)
	fmt.Printf("The divisor is %v\n", divisor)
	fmt.Printf("The product is %v\n", divisor*(i-target))

}

func part2(text []string) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
	var nums []int
	for i, item := range text {
		if item == "x" {
			nums[i] = 0
		} else if item != "x" {
			n, _ := strconv.Atoi(item)
			nums[i] = n
		}
	}

	fmt.Printf("nums = %v", nums)

}
