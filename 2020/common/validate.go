package common

// This is used to check the values / ranges of string characters

/**

	ATOMIC CHECKS

**/
// IsNumeral check ASCII value
func IsNumeral(char rune) bool {
	return char >= 48 && char <= 57
}

// IsLower check ASCII value
func IsLower(char rune) bool {
	return char >= 97 && char <= 122
}

// IsUpper check ASCII value
func IsUpper(char rune) bool {
	return char >= 65 && char <= 90
}

/**

	COMPOSITE CHECKS

**/

// IsAlphabet check ASCII value
func IsAlphabet(char rune) bool {
	return IsUpper(char) || IsLower(char)
}

// IsAlphaNum check ASCII value
func IsAlphaNum(char rune) bool {
	return IsUpper(char) || IsLower(char) || IsNumeral(char)
}

// IsHexDigit check ASCII value
func IsHexDigit(char rune) bool {
	return IsNumeral(char) || (char >= 65 && char <= 70) || (char >= 97 && char <= 102)
}

/**

	STRING FORMAT CHECKS

**/

// IsHexString checks if this is a full hex string, example #09af55
func IsHexString(text string) bool {

	validation := len(text) == 7
	for i, val := range text {
		if i == 0 && text[0] != '#' {
			validation = false
		} else {
			validation = validation && IsHexDigit(val)
		}
	}

	return validation
}
