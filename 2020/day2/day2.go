package main

import (
	"fmt"
	"strconv"
	"strings"

	common "../common"
)

// Password holds all the information relevant to check validity
type Password struct {
	min  int
	max  int
	char string
	pass string
}

// Valid returns
func (p Password) Valid() bool {
	count := 0
	for i := 0; i < len(p.pass); i++ {
		if p.pass[i:i+1] == p.char {
			count++
		}
	}
	if count >= p.min && count <= p.max {
		return true
	}
	return false
}

// ValidSecond only one of the positions in the password can be the char
// min == first char pos
// max == second char pos
func (p Password) ValidSecond() bool {
	first := string(p.pass[p.min-1])
	second := string(p.pass[p.max-1])

	cond1 := first == p.char
	cond2 := second == p.char

	// XOR
	if (cond1 || cond2) && !(cond1 && cond2) {
		return true
	}
	return false
}

func parseIntoPassword(line string) Password {

	split := strings.Split(line, " ")
	nums := strings.Split(split[0], "-")
	minimum, _ := strconv.Atoi(nums[0])
	maximum, _ := strconv.Atoi(nums[1])

	return Password{
		min:  minimum,
		max:  maximum,
		char: split[1][0:1],
		pass: split[2],
	}

}

func main() {

	filename := "day2input.txt"
	text := common.ReadInputText(filename)

	var passwords []Password

	for _, val := range text {
		passwords = append(passwords, parseIntoPassword(val))
	}
	//fmt.Printf("There are %d passwords", len(passwords))
	//fmt.Printf("%v", passwords[0])
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	step1(passwords)
	step2(passwords)
}

func step1(passwords []Password) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	count := 0
	for _, pass := range passwords {
		if pass.Valid() {
			count++
		}
	}

	fmt.Printf("The number of Valid Passwords is %v", count)

}

func step2(passwords []Password) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	count := 0
	for _, pass := range passwords {
		if pass.ValidSecond() {
			count++
		}
	}

	fmt.Printf("The number of Valid Passwords is %v\n", count)
}
