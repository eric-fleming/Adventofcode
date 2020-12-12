package main

import (
	"fmt"
	"strings"

	common "../common"
)

func main() {

	//Example
	//examplefile := "example.txt"
	//example := common.ReadInputText(examplefile)

	// Read the file
	filename := "day11input.txt"
	text := common.ReadInputText(filename)
	paddedText := padWithEmptySpace(text)
	common.Show(paddedText, "string")

	//fmt.Printf("line:\t%v\n", text[0])
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")

	part1(paddedText)
	part2(paddedText)

}

func padWithEmptySpace(text []string) []string {
	rowlen := len(text[0]) + 2
	size := len(text) + 2
	paddedText := make([]string, size)
	paddedText[0] = strings.Repeat(".", rowlen)
	// Add empty space to make D8 lookup easier
	// guard rails
	for i, line := range text {
		paddedText[i+1] = "." + line + "."
	}
	rowlen = len(paddedText[0])
	paddedText[size-1] = strings.Repeat(".", rowlen)
	return paddedText
}

func part1(inputText []string) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")
}

func part2(inputText []string) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")

}
