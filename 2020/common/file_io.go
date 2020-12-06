package common

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

// this package has common utils for reading/writing/parsing files

// Show will print an array of values
func Show(array interface{}, dataType string) {
	dataType = strings.ToLower(dataType)
	if dataType == "string" {
		for _, val := range array.([]string) {
			fmt.Printf("%v\n", val)
		}
	} else if dataType == "int" {
		for _, val := range array.([]int) {
			fmt.Printf("%v\n", val)
		}
	}
}

// ReadInputText takes the filename and outputs an array of strings representing each line.
func ReadInputText(filename string) []string {
	file, err := os.Open(filename)

	if err != nil {
		log.Fatalf("failed to open")
	}

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	var text []string
	for scanner.Scan() {
		text = append(text, scanner.Text())
	}
	file.Close()

	return text
}

// ReadInputTextParseAsArray takes an text file and outputs an array of string arrays [][]string
// You can use any splitting character
func ReadInputTextParseAsArray(filename string, splitChar string) [][]string {
	lines := ReadInputText(filename)

	var multiarray [][]string
	for _, line := range lines {
		temp := strings.Split(line, splitChar)
		multiarray = append(multiarray, temp)
	}

	return multiarray
}

// ReadInputTextMultipleLines assumes that text in paragraphs is all related to one input
// Specify a concatChar to go between the lines that you are appending onto a single line
func ReadInputTextMultipleLines(filename string, concatChar string) []string {
	text := ReadInputText(filename)

	// loop through lines by group onto one line
	tempLine := ""
	var inputLines []string
	for _, line := range text {
		if line != "" {
			// compiles into one line
			trimmedLine := strings.TrimSuffix(line, "\n")
			tempLine = tempLine + trimmedLine + concatChar
		} else {
			// appends to list and resets
			inputLines = append(inputLines, tempLine)
			tempLine = ""
		}
	}
	// save the last one when it hits the end of file
	inputLines = append(inputLines, tempLine)

	return inputLines
}

// ReadInputArray reads in a file and spits out an array
func ReadInputArray(filename, delimiter string) []string {
	file, err := os.Open(filename)

	if err != nil {
		log.Fatalf("failed to open")
	}

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	var array []string
	for scanner.Scan() {
		text := scanner.Text()
		array = strings.Split(text, delimiter)
		break
	}
	file.Close()

	return array
}
