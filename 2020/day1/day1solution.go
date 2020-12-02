package main

import (
	"fmt"

	common "../common"
)

func main() {

	filename := "day1input.txt"
	text := common.ReadInputText(filename)

	nums := common.ConvertToInts(text)
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
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
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
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
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")
	fmt.Printf("Your values are %d and %d\n", val1, val2)
	fmt.Printf("Their product is %d\n", val1*val2)
}
