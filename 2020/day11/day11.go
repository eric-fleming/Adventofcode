package main

import (
	"fmt"

	common "../common"
)

func main() {

	//Example
	//examplefile := "example.txt"
	//example := common.ReadInputText(examplefile)

	// Read the file
	filename := "day11input.txt"
	text := common.ReadInputText(filename)

	//common.Show(text, "string")
	//fmt.Printf("line:\t%v\n", text[0])
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1(text)
	part2(text)

}

func part1(inputText []string) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")
}

func part2(inputText []string) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")

}
