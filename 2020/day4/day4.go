package main

//chore: inital day setup
import (
	"fmt"
	"strings"

	common "../common"
)

// Passport official international passport
type Passport struct {
	Byr string // birth year
	Iyr string // issue year
	Eyr string // expiration year
	Hgt string // height
	Hcl string // hair color
	Ecl string // eye color
	Pid string // passport id
	Cid string // country id
}

func (p *Passport) setBirthYear(val string) {
	p.Byr = val
}

func (p *Passport) setIssueYear(val string) {
	p.Iyr = val
}

func (p *Passport) setExpirationYear(val string) {
	p.Eyr = val
}

func (p *Passport) setHeight(val string) {
	p.Hgt = val
}

func (p *Passport) setHairColor(val string) {
	p.Hcl = val
}

func (p *Passport) setEyeColor(val string) {
	p.Ecl = val
}

func (p *Passport) setPassportID(val string) {
	p.Pid = val
}

func (p *Passport) setCountryID(val string) {
	p.Cid = val
}

// Valid checks to make sure all values are not falsy
func (p *Passport) Valid() bool {
	return p.Byr != "" && p.Iyr != "" && p.Eyr != "" && p.Hgt != "" && p.Hcl != "" && p.Ecl != "" && p.Pid != "" && p.Cid != ""
}

// LaxValid checks to make sure all values are not falsy
func (p *Passport) LaxValid() bool {
	return p.Byr != "" && p.Iyr != "" && p.Eyr != "" && p.Hgt != "" && p.Hcl != "" && p.Ecl != "" && p.Pid != ""
}

// NorthPoleCredential official international passport
type NorthPoleCredential struct {
	Byr string // birth year
	Iyr string // issue year
	Eyr string // expiration year
	Hgt string // height
	Hcl string // hair color
	Ecl string // eye color
	Pid string // passport id
}

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

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1(inputLines)
	part2()

}

func part1(inputLines []string) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

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
