package main

import (
	"fmt"
	"strings"

	common "../common"
)

// SeatPlan reprsents a snapshot of the ferry
type SeatPlan struct {
	IterationNo int
	State       []string
}

// NewSeatPlan is a constructor
func NewSeatPlan(num int, layout []string) SeatPlan {
	return SeatPlan{
		IterationNo: num,
		State:       layout,
	}
}

// Diff reports the difference between two states
func (sp *SeatPlan) Diff(other SeatPlan) int {

	if len(sp.State) != len(other.State) || len(sp.State[0]) != len(other.State[0]) {
		fmt.Printf("ERROR: Dimensions are not aligned\n")
	}
	count := 0
	for rowx := 0; rowx < len(sp.State); rowx++ {
		for coly := 0; coly < len(sp.State[0]); coly++ {
			if sp.State[rowx][coly] != other.State[rowx][coly] {
				count++
			}
		}
	}
	return count
}

// NextSeatPlan takes the current seat plan and make sthe next iteration of one
func (sp *SeatPlan) NextSeatPlan() SeatPlan {
	next := sp.IterationNo + 1
	nextPlan := applyAlgorith(sp.State)

	return NewSeatPlan(next, nextPlan)

}

func (sp *SeatPlan) countOccupied() int {
	count := 0
	for rowx := 0; rowx < len(sp.State); rowx++ {
		for coly := 0; coly < len(sp.State[0]); coly++ {
			if sp.State[rowx][coly] == '#' {
				count++
			}
		}
	}
	return count
}

// ApplyAlgorith does string checking/transforming
func applyAlgorith(state []string) []string {

	futureState := make([]string, len(state))
	copy(futureState, state)

	//fmt.Printf("future state line 0 : %v\n", futureState)

	// actually does the logic here
	// the -1's are for the padding
	rows := len(state) - 1
	cols := len(state[0]) - 1

	for i := 1; i < rows; i++ {
		for j := 1; j < cols; j++ {
			if futureState[i][j] == '.' {
				continue
			}
			if state[i][j] == 'L' && checkEmptyNeighborhood(state, i, j) {
				// replace
				futureState[i] = futureState[i][:j] + "#" + futureState[i][j+1:]
			}
			if state[i][j] == '#' && checkOccupiedNeighborhood(state, i, j) {
				// replace
				futureState[i] = futureState[i][:j] + "L" + futureState[i][j+1:]
			}
		}
	}

	return futureState
}

func checkEmptyNeighborhood(state []string, i, j int) bool {

	count := 0
	for rowx := i - 1; rowx < i+2; rowx++ {
		for coly := j - 1; coly < j+2; coly++ {
			if rowx == i && coly == j {
				continue
			}
			if state[rowx][coly] == 'L' || state[rowx][coly] == '.' {
				count++
			}
		}
	}
	if count == 8 {
		return true
	}
	return false
}

func checkOccupiedNeighborhood(state []string, i, j int) bool {
	count := 0
	for rowx := i - 1; rowx < i+2; rowx++ {
		for coly := j - 1; coly < j+2; coly++ {
			if rowx == i && coly == j {
				continue
			}
			if state[rowx][coly] == '#' {
				count++
			}
		}
	}
	if count >= 4 {
		return true
	}

	return false
}

func main() {

	//Example
	//examplefile := "example.txt"
	//example := common.ReadInputText(examplefile)

	// Read the file
	filename := "day11input.txt"
	text := common.ReadInputText(filename)
	paddedText := padWithEmptySpace(text)
	//common.Show(paddedText, "string")

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
	var history []SeatPlan

	origin := NewSeatPlan(0, inputText)
	history = append(history, origin)

	next := origin.NextSeatPlan()
	history = append(history, next)

	fmt.Printf("history length : %v\n", len(history))
	fmt.Printf("%v\n\n\n\n", history[0].State)
	fmt.Printf("%v\n", history[1].State)
	fmt.Printf("Diff : %v\n", history[0].Diff(history[1]))
	/**/
	i := 1
	for history[i].Diff(history[i-1]) > 0 {
		history = append(history, history[i].NextSeatPlan())
		i++
	}

	//finalDiff := history[len(history)].Diff(history[len(history)-1])
	occupied := history[len(history)-1].countOccupied()

	fmt.Printf("Number of occupied seats %v with a diff of ...\n", occupied)

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")
	/**/
}

func part2(inputText []string) {
	fmt.Println("\n-*-*-*-*-*- Part 2! -*-*-*-*-*-")

	fmt.Println("\n-*-*-*-*-*- Finished! -*-*-*-*-*-")

}
