package common

import (
	"fmt"
	"strconv"
)

// Modulo is mathematical shorthand for "b mod m"
type Modulo struct {
	B         int
	M         int
	Statement string
}

// NewModulo is a constructor
func NewModulo(b, m int) *Modulo {
	text := strconv.Itoa(b) + " mod " + strconv.Itoa(m)
	return &Modulo{
		B:         b,
		M:         m,
		Statement: text,
	}
}

// ChineseRemainderThm solves a systems of liner congruences
func ChineseRemainderThm(mods []Modulo) Modulo {

	// Show input
	fmt.Println("*****************************")
	fmt.Printf("inputs\n")
	fmt.Printf("%v\n", mods)

	// find maximum base
	maxBase := 1
	for _, val := range mods {
		maxBase = maxBase * val.M
	}
	fmt.Println("*****************************")
	fmt.Printf("Max base  = %v\n", maxBase)
	// max base is set

	// these are the M_i's in the theorem
	coprimeBases := make([]int, len(mods))
	for i := 0; i < len(mods); i++ {
		coprimeBases[i] = maxBase / mods[i].M
		fmt.Printf("coprime M_%v = %v\n", i, coprimeBases[i])
	}

	// these are the x_i's in the theorem
	variables := make([]int, len(mods))

	for i := range mods {
		for x := 0; x <= mods[i].M; x++ {
			if (coprimeBases[i]*x)%mods[i].M == 1 {
				fmt.Printf("%v*%v == 1 mod %v\n", coprimeBases[i], x, mods[i].M)
				variables[i] = x
				break
			}
		}

	}
	// variables are set

	//dot-product out
	fmt.Printf("length of mods = %v\n", len(mods))
	fmt.Printf("length of co-p = %v\n", len(coprimeBases))
	fmt.Printf("length of vars = %v\n", len(variables))
	number := 0
	for i := 0; i < len(mods); i++ {
		number += mods[i].B * coprimeBases[i] * variables[i]
	}

	fmt.Printf("------------------------------\n")
	fmt.Printf("The value is %v\n", number)
	result := NewModulo(number, maxBase)
	fmt.Printf("The modulus is %v\n", result)
	fmt.Printf("------------------------------\n")
	return *result

}
