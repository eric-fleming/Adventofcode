package common

import "math"

/**

	2-DIMENSIONAL SPACE

**/

// Point2D is what it says
type Point2D struct {
	X float64
	Y float64
}

// NewPoint constructor
func NewPoint(px, py float64) Point2D {
	return Point2D{
		X: px,
		Y: py,
	}
}

// Distance calculates the regular Euclidean Distance
func (p Point2D) Distance(other Point2D) float64 {
	squared := math.Pow((p.X-other.X), 2) + math.Pow((p.Y-other.Y), 2)
	return math.Sqrt(squared)
}

// ManhattanDistance calculates the regular Euclidean Distance
func (p Point2D) ManhattanDistance(other Point2D) float64 {
	return math.Abs(p.X-other.X) + math.Abs(p.Y-other.Y)
}

/**

	3-DIMENSIONAL SPACE

**/

// Point3D is what it says
type Point3D struct {
	X float64
	Y float64
	Z float64
}

// NewPoint3D constructor
func NewPoint3D(px, py, pz float64) Point3D {
	return Point3D{
		X: px,
		Y: py,
		Z: pz,
	}
}

// Distance calculates the regular Euclidean Distance
func (p Point3D) Distance(other Point3D) float64 {
	squared := math.Pow((p.X-other.X), 2) + math.Pow((p.Y-other.Y), 2) + +math.Pow((p.Z-other.Z), 2)
	return math.Sqrt(squared)
}

// ManhattanDistance calculates the regular Euclidean Distance
func (p Point3D) ManhattanDistance(other Point3D) float64 {
	return math.Abs(p.X-other.X) + math.Abs(p.Y-other.Y) + math.Abs(p.Z-other.Z)
}
