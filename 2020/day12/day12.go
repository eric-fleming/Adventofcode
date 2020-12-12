package main

import (
	"errors"
	"fmt"
	"strconv"

	common "../common"
)

// Ship is the agent
type Ship struct {
	Name        string
	orientation string
	Px          int
	Py          int
}

// Instruction tells the ship how to change position
type Instruction struct {
	Action string
	Value  int
}

// NewInstruction is a constructor
func NewInstruction(text string) Instruction {
	fmt.Println("input text for instruction : " + text)
	act := string(text[0:1])
	val, _ := strconv.Atoi(text[1:])

	return Instruction{
		Action: act,
		Value:  val,
	}

}

// NewShip is a constructor
func NewShip(n, dir string) (*Ship, error) {

	if len(dir) != 1 {
		return nil, errors.New("Direction should only be one char length")
	}

	return &Ship{
		Name:        n,
		orientation: dir,
		Px:          0,
		Py:          0,
	}, nil
}

// Move handles the instructions
func (s *Ship) Move(instruction string) {
	command := NewInstruction(instruction)
	fmt.Printf("my command : %v\n", command)
	switch command.Action {
	case "N":
		s.Py = s.Py + command.Value
	case "S":
		s.Py = s.Py - command.Value
	case "E":
		s.Px = s.Px + command.Value
	case "W":
		s.Px = s.Px - command.Value
	case "F":
		s.MoveInDirection(s.orientation, command.Value)
	case "B":
		s.MoveInDirection(oppositeDirection(s.orientation), command.Value)
	case "R":
		s.changeOrientation(command)
	case "L":
		s.changeOrientation(command)
	default:
		fmt.Printf("action : %v\n", command.Action)
		panic("Did not recognize direction")

	}
}

func (s *Ship) changeOrientation(instrction Instruction) {
	orientationSet := []string{"N", "E", "S", "W"}
	spinMap := map[int]int{
		0:   0,
		90:  1,
		180: 2,
		270: 3,
		360: 0,
	}
	orientInd := 0
	for i, dir := range orientationSet {
		if dir == s.orientation {
			orientInd = i
			break
		}
	}
	var spin int
	if instrction.Action == "R" {
		spin = 1
	}
	if instrction.Action == "L" {
		spin = -1
	}

	spin = spin * spinMap[instrction.Value]
	newOrientInd := (spin + orientInd) % 4
	if newOrientInd < 0 {
		newOrientInd = newOrientInd + 4
	}
	fmt.Printf("old orient = %v\tnew orient = %v\tinstruction = %v", orientInd, newOrientInd, instrction)
	s.orientation = orientationSet[newOrientInd]

}

func oppositeDirection(dir string) string {
	if dir == "N" {
		return "S"
	}
	if dir == "S" {
		return "N"
	}
	if dir == "E" {
		return "W"
	}
	if dir == "W" {
		return "E"
	}
	return ""

}

// MoveInDirection moves it
func (s *Ship) MoveInDirection(dir string, val int) {
	switch dir {
	case "N":
		s.Py = s.Py + val
	case "S":
		s.Py = s.Py - val
	case "E":
		s.Px = s.Px + val
	case "W":
		s.Px = s.Px - val
	default:
		panic("Did not recognize direction")
	}
}

func main() {

	// Read the file
	filename := "day12input.txt"
	text := common.ReadInputText(filename)
	//common.Show(text, "string")
	//fmt.Printf("line:\t%v\n", text[0])
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	fmt.Println("-*-*-*-*-*- MERRY CHRISTMAS! -*-*-*-*-*-")
	fmt.Println("-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-")
	part1(text)
	part2()

}

func part1(inputText []string) {
	// create ship
	ship, _ := NewShip("S.S. Flem", "E")
	fmt.Printf("Made a ship: %v\n", ship)
	// move the ship
	for _, command := range inputText {
		ship.Move(command)
	}

	// calc dist
	origin := common.NewPoint(0.0, 0.0)
	currentPosition := common.NewPoint(float64(ship.Px), float64(ship.Py))
	dist := currentPosition.ManhattanDistance(origin)
	fmt.Printf("The ship moved a total dist of %v\n", dist)
}

func part2() {

}
