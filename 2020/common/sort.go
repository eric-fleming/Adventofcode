package common

// SortInts goes from least to greatest
func SortInts(array []int) []int {

	length := len(array)
	for i := 0; i < length-1; i++ {
		for j := i + 1; j < length; j++ {
			if array[i] > array[j] {
				swap(array, i, j)
			}
		}
	}

	return array

}

func swap(array []int, i int, j int) {
	temp := array[i]
	array[i] = array[j]
	array[j] = temp

}
