package main

import (
	"strconv"
	"strings"
)

// Passport official international passport
type Passport struct {
	Byr string // birth year
	Iyr string // issue year
	Eyr string // expiration year
	Hgt string // height
	Hcl string // hair color
	Ecl string // eye color
	Pid string // passport id
	Cid string // country id
}

func (p *Passport) setBirthYear(val string) {
	p.Byr = val
}

func (p *Passport) setIssueYear(val string) {
	p.Iyr = val
}

func (p *Passport) setExpirationYear(val string) {
	p.Eyr = val
}

func (p *Passport) setHeight(val string) {
	p.Hgt = val
}

func (p *Passport) setHairColor(val string) {
	p.Hcl = val
}

func (p *Passport) setEyeColor(val string) {
	p.Ecl = val
}

func (p *Passport) setPassportID(val string) {
	p.Pid = val
}

func (p *Passport) setCountryID(val string) {
	p.Cid = val
}

// Valid checks to make sure all values are not falsy
func (p *Passport) Valid() bool {
	return p.Byr != "" && p.Iyr != "" && p.Eyr != "" && p.Hgt != "" && p.Hcl != "" && p.Ecl != "" && p.Pid != "" && p.Cid != ""
}

// LaxValid checks to make sure all values are not falsy
func (p *Passport) LaxValid() bool {
	return p.Byr != "" && p.Iyr != "" && p.Eyr != "" && p.Hgt != "" && p.Hcl != "" && p.Ecl != "" && p.Pid != ""
}

func (p *Passport) checkBirthYear(val string) bool {
	num, _ := strconv.Atoi(strings.Trim(p.Byr, " "))
	return num >= 1920 && num <= 2002
}

func (p *Passport) checkIssueYear(val string) bool {
	num, _ := strconv.Atoi(strings.Trim(p.Iyr, " "))
	return num >= 2010 && num <= 2020
}

func (p *Passport) checkExpirationYear(val string) bool {
	num, _ := strconv.Atoi(strings.Trim(p.Eyr, " "))
	return num >= 2020 && num <= 2030
}

func (p *Passport) checkHeight(val string) bool {
	p.Hgt = strings.Trim(p.Hgt, " ")
}

func (p *Passport) checkHairColor(val string) bool {
	p.Hcl = strings.Trim(p.Hcl, " ")

}

func (p *Passport) checkEyeColor(val string) bool {
	p.Ecl = strings.Trim(p.Ecl, " ")
	eyeColors := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}
	for _, color := range eyeColors {
		if p.Ecl == color {
			return true
		}
	}
	return false
}

func (p *Passport) checkPassportID(val string) bool {
	p.Pid = val
}

func (p *Passport) checkCountryID(val string) bool {
	p.Cid = val
}

// NorthPoleCredential official international passport
type NorthPoleCredential struct {
	Byr string // birth year
	Iyr string // issue year
	Eyr string // expiration year
	Hgt string // height
	Hcl string // hair color
	Ecl string // eye color
	Pid string // passport id
}
