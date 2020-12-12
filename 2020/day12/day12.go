package main

import (
	"fmt"

	common "../common"
)

func main() {

	// Read the file
	filename := "day12input.txt"
	text := common.ReadInputText(filename)
	//common.Show(text, "string")
	fmt.Printf("line:\t%v\n", text[0])
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1()
	part2()

}

func part1() {

}

func part2() {

}
