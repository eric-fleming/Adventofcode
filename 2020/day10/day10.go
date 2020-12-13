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
	part2(sortedNums)
}

func part1(adapters []int) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

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

func part2(adapters []int) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-")
	fmt.Println("-*-*-*- RECURSION PARTY! -*-*-*-")

	//maxRating := adapters[len(adapters)-1] + 3
	adapterPaths := dynamicAdapterPath(adapters)

	fmt.Printf("Number of adapter combinations = %v", adapterPaths)

}

func dynamicAdapterPath(adapters []int) int {
	paths := make([]int, len(adapters))
	for i := 0; i < len(adapters); i++ {
		paths[i] = 0
	}

	for i := 0; i < len(paths); i++ {
		if i == 0 && adapters[0] <= 3 {
			paths[0] = 1
		} else if i == 1 && adapters[1] <= 3 {
			paths[1] = 1 + paths[0]
		} else if i == 2 && adapters[2] <= 3 {
			paths[2] = 1 + paths[1] + paths[0]
		} else if i >= 3 {
			if testConnectionStep(adapters, i, i-1) {
				paths[i] += paths[i-1]
			}
			if testConnectionStep(adapters, i, i-2) {
				paths[i] += paths[i-2]
			}
			if testConnectionStep(adapters, i, i-3) {
				paths[i] += paths[i-3]
			}
		}
	}

	return paths[len(paths)-1]
}

func testConnectionStep(adapters []int, joltIndex, nextIndex int) bool {
	// Does the next step meet the criteria
	if nextIndex < 0 {
		return false
	}
	return (adapters[joltIndex]-adapters[nextIndex] <= 3)
}
