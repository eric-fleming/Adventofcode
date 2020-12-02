package common

import (
	"bufio"
	"log"
	"os"
)

// this package has common utils for reading/writing/parsing files

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
