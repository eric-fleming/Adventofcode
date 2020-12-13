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
	//example := "example1.txt"
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

	fmt.Printf("%v\n", nums)
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

	// convert to []int
	nums := make([]int, len(text))
	fmt.Println(text)
	for i := 0; i < len(text); i++ {
		if text[i] == "x" {
			nums[i] = 1
		} else if text[i] != "x" {
			n, _ := strconv.Atoi(strings.TrimSpace(text[i]))
			nums[i] = n
		}
	}
	fmt.Printf("nums = %v\n", nums)

	// count the number of equations to solve in the system
	count := 0
	max := 1
	for _, num := range nums {
		if num != 1 {
			max = max * num
			count++
		}
	}

	// create the list of mods to pass to solving function
	mods := make([]common.Modulo, count)
	place := 0
	for i := 0; i < len(nums); i++ {
		if nums[i] > 1 {
			mods[place] = *common.NewModulo(i, nums[i])
			place++
		}
	}

	// execute Chinese Remainder Theorem
	answer := common.ChineseRemainderThm(mods)

	reduced := answer.B % answer.M
	fmt.Printf("%v\t===\t came from %v\n", reduced, answer.Statement)
	fmt.Println("---- FINAL ANSWER ----")
	final := max - reduced
	fmt.Printf("%v", final)

}

func longwayPart2(text []string) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	//example := []string{"17", "x", "13", "19"}
	//example2 := []string{"67", "7", "59", "61"}
	//example3 := []string{"67", "7", "x", "59", "61"}
	//text = example3

	nums := make([]int, len(text))
	fmt.Println(text)
	for i := 0; i < len(text); i++ {
		if text[i] == "x" {
			nums[i] = 1
		} else if text[i] != "x" {
			n, _ := strconv.Atoi(strings.TrimSpace(text[i]))
			nums[i] = n
		}
	}
	fmt.Printf("nums = %v\n", nums)

	base := 1 // 749,468,541,208,439
	//           100,000,000,000,000
	for _, num := range nums {
		base = base * num
	}
	fmt.Printf("base # == %v\n", base)

	//start := (100000000000000 / nums[0]) * nums[0]
	for i := base; i > 0; i = i + 13 {
		meetAllConditions := true
		for d := 0; d < len(nums); d++ {
			if ((i + d) % nums[d]) == 0 {
				meetAllConditions = meetAllConditions && true
			} else {
				meetAllConditions = false
			}
		}
		if i%10000000 == 0 {
			fmt.Println("10 milli...")
		}
		if meetAllConditions {
			fmt.Println("The time stamp that works for all...")
			fmt.Printf("Is... %v", i)
			break
		}
	}

	fmt.Println("---- Fin! ----")
}
