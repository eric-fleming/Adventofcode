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
