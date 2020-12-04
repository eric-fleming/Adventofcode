package main

//chore: inital day setup
import (
	"fmt"

	common "../common"
)

func main() {

	// Read the file
	filename := "day5input.txt"
	text := common.ReadInputText(filename)
	common.Show(text, "string")

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1()
	part2()

}

func part1() {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")
}

func part2() {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
}
