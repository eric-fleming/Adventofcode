package main

import (
	"fmt"

	common "./common"
)

func main() {
	fmt.Println("Testing validate")

	nums := "asdfasdfpas$dfASD123Foipnjandiou"
	result := true
	for _, val := range nums {
		result = result && common.IsAlphaNum(val)
	}
	fmt.Printf("%v\n", result)

}
