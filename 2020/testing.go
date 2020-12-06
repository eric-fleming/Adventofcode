package main

import (
	"fmt"

	common "./common"
)

func main() {
	fmt.Println("Testing validate")

	nums := "asdfasdfpasdfASDFoipnjandiou"
	result := true
	for _, val := range nums {
		result = result && common.IsLower(val)
	}
	fmt.Printf("%v\n", result)

}
