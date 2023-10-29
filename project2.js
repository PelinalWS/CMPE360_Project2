// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    // the rotation is in degrees, so we turn it into radians by comparing it to pi radians which is equivalent to 180 degrees
    // the principle is if pi which has the mathematical value of approximately 3.14.... is 180 degrees, dividing it by 180 would give the radian value of 1 degree
    // multiplying the radian equivalent of a degree with our degree gives us our rotation angle in radians 
    const rad_rotation = -(rotation * Math.PI / 180);
    // the Math.cos() and Math.sin() functions are created as constant values since they will be used multiple times
    const cos = Math.cos(rad_rotation), sin = Math.sin(rad_rotation);
    // scaling first, then rotation, then translation
    // Matrix = Translation(positionX, positionY) * Rotation(rad_rotation) * Scale(scale)
    // M = T x R x S
    //     | Sx 0  0 |       | cos(rad) -sin(rad)  0 |            | Sx * cos(rad) -Sx * sin(rad)  0 |
    // S = | 0  Sy 0 |   R = | sin(rad)  cos(rad)  0 |    S x R = | Sy * sin(rad)  Sy * cos(rad)  0 |
    //     | 0  0  1 |       |    0         0      1 |            |      0              0         1 |
    
    //     | 1  0  tx |           | Sx * cos(rad) -Sx * sin(rad)  0 |                | Sx * cos(rad) -Sx * sin(rad)  tx |
    // T = | 0  1  ty |   S x R = | Sy * sin(rad)  Sy * cos(rad)  0 |    T x S x R = | Sy * sin(rad)  Sy * cos(rad)  ty |
    //     | 0  0  1  |           |      0              0         1 |                |      0              0         1  |
    // the drone starts at the point (0, 0)
    const m = [
                 scale * cos, scale * sin, positionX,
                -scale * sin, scale * cos, positionY,
                       0    ,       0    ,     1    
            ];
    // the matrix is currently indexed on the rows and not the columns, making it "Horizontal"
    // to keep track of why the index_matrix is being used, we put in how we want the matrix to be as a string
    const matrix = index_matrix(m , "Vertical")
    return matrix;
}

// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    const t1 = index_matrix(trans1, "Horizontal");
    const t2 = index_matrix(trans2, "Horizontal");
    const matrix = multi3x3(t1, t2);
    const final_matrix = index_matrix(matrix, "Vertical");
    return final_matrix;
}

function multi3x3(t1, t2) {
    // matrix multiplication
    //     | a b c |       | j k l |            | (aj + bm + cp) (ak + bn + cq) (al + bo + cr) |
    // A = | d e f |   B = | m n o |    A x B = | (dj + em + fp) (dk + en + fq) (dl + eo + fr) |
    //     | g h i |       | p q r |            | (gj + hm + ip) (gk + hn + iq) (gl + ho + ir) |
    // AxB is so that the A's row values are multiplied by B's column values and summed
    // first row of A with all columns of B
    const m0 = (t2[0] * t1[0]) + (t2[1] * t1[3]) + (t2[2] * t1[6]);
    const m1 = (t2[0] * t1[1]) + (t2[1] * t1[4]) + (t2[2] * t1[7]);
    const m2 = (t2[0] * t1[2]) + (t2[1] * t1[5]) + (t2[2] * t1[8]);
    // second row of A with all columns of B
    const m3 = (t2[3] * t1[0]) + (t2[4] * t1[3]) + (t2[5] * t1[6]);
    const m4 = (t2[3] * t1[1]) + (t2[4] * t1[4]) + (t2[5] * t1[7]);
    const m5 = (t2[3] * t1[2]) + (t2[4] * t1[5]) + (t2[5] * t1[8]);
    // third row of A with all columns of B
    const m6 = (t2[6] * t1[0]) + (t2[7] * t1[3]) + (t2[8] * t1[6]);
    const m7 = (t2[6] * t1[1]) + (t2[7] * t1[4]) + (t2[8] * t1[7]);
    const m8 = (t2[6] * t1[2]) + (t2[7] * t1[5]) + (t2[8] * t1[8]);
    // the values are added into an array with the "Horizontal" ordering
    const t = [m0, m1, m2, m3, m4, m5, m6, m7, m8];
    return t;
}
// does the same thing regardless of what o value is put as a paramenter, it is just used to determine what the matrix gets turned to
// puts the matrix into the format used by the html or puts it into the format used by the multi3x3 function
function index_matrix(matrix, o) {
    const matrix_indexed = [matrix[0], matrix[3], matrix[6],
                            matrix[1], matrix[4], matrix[7],
                            matrix[2], matrix[5], matrix[8]];
    return matrix_indexed;
}