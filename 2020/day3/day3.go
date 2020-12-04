package main

import (
	"fmt"
	"math"
	"strings"

	common "../common"
)

func main() {
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")

	// Read the file
	filename := "day3input.txt"
	templateForrest := common.ReadInputText(filename)
	//common.Show(templateForrest, "string")

	// Digital Forrest Dimensions
	rows := len(templateForrest)
	cols := len(templateForrest[0])
	//fmt.Println("rows = " + strconv.Itoa(rows))
	//fmt.Println("cols = " + strconv.Itoa(cols))
	factor := 7.0
	repeat := int(math.Ceil(factor * float64(rows) / float64(cols)))
	//fmt.Println("repeat = " + strconv.Itoa(repeat))
	forrest := growForrest(templateForrest, repeat)
	//common.Show(forrest, "string")

	answer1 := part1(forrest, 1, 3)
	fmt.Printf("You will run into %d tree on the path down %d right %d\n", answer1, 1, 3)

	answer2 := part2(forrest)
	fmt.Printf("The product of trees you will run into is %d", answer2)

}

func growForrest(template []string, factor int) []string {
	var newForrest []string

	for _, line := range template {
		newForrest = append(newForrest, strings.Repeat(line, factor))
	}
	fmt.Printf("length of new forrest = %d\n", len(newForrest))
	return newForrest
}

func part1(forrest []string, dy, dx int) int {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")
	// Digital Forrest Dimensions
	rows := len(forrest)
	cols := len(forrest[0])
	//fmt.Println("rows = " + strconv.Itoa(rows))
	//fmt.Println("cols = " + strconv.Itoa(cols))
	count := 0

	i := 0
	j := 0
	cond := true
	for cond {
		if string(forrest[i][j]) == "#" {
			count++
		}
		if i >= rows-1 || j >= cols-1 {
			cond = false
		}
		i = i + dy
		j = j + dx
	}
	//fmt.Printf("(i,j) = (%d, %d)\n", i, j)
	return count
}

func part2(forrest []string) int {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	// [dy,dx]
	paths := [5][2]int{
		{1, 1},
		{1, 3},
		{1, 5},
		{1, 7},
		{2, 1},
	}

	product := 1
	for _, input := range paths {

		dy := input[0]
		dx := input[1]
		product *= part1(forrest, dy, dx)
	}

	return product
}
