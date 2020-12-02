package main

import (
	"fmt"

	common "../common"
)

func main() {

	filename := "day2input.txt"
	text := common.ReadInputText(filename)

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	step1()
	step2()
}

func step1() {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")
}

func step2() {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
}
