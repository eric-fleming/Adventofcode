package main

//chore: inital day setup
import (
	"fmt"
	"math"
	"strconv"
	"strings"

	common "../common"
)

//F -> 0
//B -> 1
//Partition into rows and cols

// Seat describes your seat on the plane
type Seat struct {
	Raw string
	Row int
	Col int
	Num int
}

// NewSeat is a constructor function for seats
func NewSeat(input string) Seat {
	input = strings.TrimSpace(input)
	if len(input) != 10 {
		panic("The length of this seat is not 10")
	}

	r := GenerateNumber(input[0:7])
	c := GenerateNumber(input[7:])
	n := 8*r + c
	return Seat{
		Raw: input,
		Row: r,
		Col: c,
		Num: n,
	}
}

// BinaryTextTransform helps you build a string of 1's and 0's to convert to binary
// eventually convert to an int
func BinaryTextTransform(digit string) string {
	digit = strings.ToUpper(digit)

	switch digit {
	case "F":
		return "0"
	case "B":
		return "1"
	case "L":
		return "0"
	case "R":
		return "1"
	default:
		fmt.Errorf("digit: %v", digit)
		panic("This digit on your seat is not F, B, L, or R??")
	}
}

// BinaryTextToInt creates an integer value
func BinaryTextToInt(bt string) int {
	size := len(bt)
	placeValue := int(math.Pow(2, float64(size)-1.0))

	num := 0
	for d := 0; d < size; d++ {
		digit, _ := strconv.Atoi(string(bt[d]))
		digitValue := digit * placeValue
		num += digitValue
		placeValue = placeValue / 2
	}
	return num
}

// GenerateNumber ties together all the previous methods
func GenerateNumber(text string) int {
	text = strings.TrimSpace(text)

	var binaryText string
	for _, letter := range text {
		binaryText += BinaryTextTransform(string(letter))
	}

	num := BinaryTextToInt(binaryText)

	fmt.Printf("text:%v ----> %v\n", binaryText, num)
	return num
}

func main() {

	// Read the file
	filename := "day5input.txt"
	text := common.ReadInputText(filename)
	//common.Show(text, "string")
	fmt.Printf("length: %d\n\n", len(text))

	var flightArrangements []Seat

	for _, line := range text {
		line = strings.TrimSpace(line)
		flightArrangements = append(flightArrangements, NewSeat(line))
	}

	fmt.Printf("The number of seats : %d\n", len(flightArrangements))
	fmt.Printf("first seat %v\n", flightArrangements[0])

	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1(flightArrangements)
	part2()

}

func part1(boardingInfo []Seat) {
	fmt.Println("\n-*-*-*-*-*- Part 1! -*-*-*-*-*-")

	max := 0
	for _, seat := range boardingInfo {
		if seat.Num > max {
			max = seat.Num
		}
	}
	fmt.Printf("MAX SEAT is %v", max)
}

func part2() {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")
}
