// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    const rad_rotation = -Math.PI/180 * rotation;
    const cos = Math.cos(rad_rotation), sin = Math.sin(rad_rotation);
    //starts at 0,0, first scale, then rotate, then translate
    //t*s*s*-t
    //r*s
    const t1m = [1, 0, -positionX,
                 0, 1, -positionY,
                 0, 0,      1
                ];
    const rm = [scale * cos,         -sin, 0,
                        sin,  scale * cos, 0,
                          0,            0, 1
                    ];
    const t2m = [1, 0, positionX,
                 0, 1, positionY,
                 0, 0,      1
                ];
    const matrix1 = multi3x3(rm, t1m);
    const matrix_h = multi3x3(t2m, rm); 
    const matrix_v = vertically_index(matrix_h);
    return matrix_v;
    }

// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    const t1 = horizontally_index(trans1);
    const t2 = horizontally_index(trans2);
    const augh = multi3x3(t2, t1);
    const augv = vertically_index(augh);
    return augv;
}

//functions to ease the operations
function multi3x3(t1, t2){
    const m0 = (t2[0] * t1[0]) + (t2[1] * t1[3]) + (t2[2] * t1[6]);
    const m1 = (t2[0] * t1[1]) + (t2[1] * t1[4]) + (t2[2] * t1[7]);
    const m2 = (t2[0] * t1[2]) + (t2[1] * t1[5]) + (t2[2] * t1[8]);
    const m3 = (t2[3] * t1[0]) + (t2[4] * t1[3]) + (t2[5] * t1[6]);
    const m4 = (t2[3] * t1[1]) + (t2[4] * t1[4]) + (t2[5] * t1[7]);
    const m5 = (t2[3] * t1[2]) + (t2[4] * t1[5]) + (t2[5] * t1[8]);
    const m6 = (t2[6] * t1[0]) + (t2[7] * t1[3]) + (t2[8] * t1[6]);
    const m7 = (t2[6] * t1[1]) + (t2[7] * t1[4]) + (t2[8] * t1[7]);
    const m8 = (t2[6] * t1[2]) + (t2[7] * t1[5]) + (t2[8] * t1[8]);
    const augmented_matrix = [m0, m1, m2, m3, m4, m5, m6, m7, m8];

}
//puts the matrix into the format used by the html
function vertically_index(matrix){
    const matrix_indexed = [matrix[0], matrix[3], matrix[6],
                            matrix[1], matrix[4], matrix[7],
                            matrix[2], matrix[5], matrix[8]];
    return matrix_indexed;
}
//inverses the vertiaclly_index function to make the matrix multiplication
function horizontally_index(matrix){
    const matrix_indexed = [matrix[0], matrix[3], matrix[6],
                            matrix[1], matrix[4], matrix[7], 
                            matrix[2], matrix[5], matrix[8]];
    return matrix_indexed;
}