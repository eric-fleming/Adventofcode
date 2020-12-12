package main

import (
	"fmt"

	common "../common"
)

func main() {
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")

	// Read the file
	filename := "day10input.txt"
	text := common.ReadInputText(filename)
	nums := common.ConvertToInts(text)
	sortedNums := make([]int, len(nums))
	copy(sortedNums, nums)
	sortedNums = common.SortInts(sortedNums)

	fmt.Printf("%v\n", nums)
	fmt.Printf("%v\n", sortedNums)

	part1(sortedNums)
	part2()
}

func part1(adapters []int) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	//maxRating := adapters[len(adapters)-1] + 3
	joltDiffs := map[int]int{
		1: 0,
		2: 0,
		3: 0,
	}

	for i := 0; i < len(adapters); i++ {
		if i == 0 {
			joltType := adapters[i]
			joltDiffs[joltType]++
		} else {
			joltType := adapters[i] - adapters[i-1]
			joltDiffs[joltType]++
		}
	}

	// last jolt diff is always 3
	joltDiffs[3]++

	fmt.Printf("1-jolt-diff's : %v\n", joltDiffs[1])
	fmt.Printf("3-jolt-diff's : %v\n", joltDiffs[3])
	fmt.Printf("product of jolt diffs : %v\n", joltDiffs[1]*joltDiffs[3])

}

func part2() {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

}
