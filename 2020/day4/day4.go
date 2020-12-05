package main

//chore: inital day setup
import (
	"fmt"
	"strings"

	common "../common"
)

func main() {

	// Read the file
	filename := "day4input.txt"
	text := common.ReadInputText(filename)
	common.Show(text, "string")

	tempLine := ""
	var inputLines []string
	for _, line := range text {
		if line != "" {
			// compiles into one line
			trimmedLine := strings.TrimSuffix(line, "\n")
			tempLine = tempLine + trimmedLine + " "
		} else {
			// appends to list and resets
			inputLines = append(inputLines, tempLine)
			tempLine = ""
		}
	}
	// save the last one when it hits the end of file
	inputLines = append(inputLines, tempLine)

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- END OF FILE READ -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")

	common.Show(inputLines, "string")
	fmt.Printf("number of objs %d\n", len(inputLines))
	fmt.Printf("last obj %v\n", inputLines[len(inputLines)-1])

	// parse the lines
	var pairs [][]string
	var passports []Passport
	for _, line := range inputLines {
		line = strings.TrimSuffix(line, " ")
		temp := strings.Split(line, " ")
		pairs = append(pairs, temp)
		p := &Passport{}

		for _, item := range temp {
			//fmt.Printf("ITEM ==== %v\n", item)
			pieces := strings.Split(item, ":")
			property := pieces[0]
			value := pieces[1]
			switch property {
			case "byr":
				p.setBirthYear(value)
			case "iyr":
				p.setIssueYear(value)
			case "eyr":
				p.setExpirationYear(value)
			case "hgt":
				p.setHeight(value)
			case "hcl":
				p.setHairColor(value)
			case "ecl":
				p.setEyeColor(value)
			case "pid":
				p.setPassportID(value)
			case "cid":
				p.setCountryID(value)
			default:
				panic("No such type exists")
			}
		}
		//fmt.Printf("password obj ---- %v\n", *p)
		passports = append(passports, *p)
	}

	fmt.Printf("%v\n", pairs[0])
	fmt.Printf("%d\n", len(passports))

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1(passports)
	part2()

}

func part1(passports []Passport) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	// Lax Valid Test && Strictly Valid Test
	laxCount := 0
	strictCount := 0
	for _, currentPassport := range passports {
		if currentPassport.LaxValid() {
			laxCount++
		}
		if currentPassport.Valid() {
			strictCount++
		}
	}

	fmt.Printf("Lax count = %d\n", laxCount)
	fmt.Printf("Strict count = %d\n", strictCount)

}

func part2() {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
}
