// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    const rad_rotation = -(rotation * Math.PI / 180);
    const cos = Math.cos(rad_rotation), sin = Math.sin(rad_rotation);
    
    const m = [
                 scale * cos, scale * sin, positionX,
                -scale * sin, scale * cos, positionY,
                       0    ,       0    ,     1    
            ];

    const matrix = [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
    return matrix;
}

// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    const m1 = [trans1[0], trans1[3], trans1[6], trans1[1], trans1[4], trans1[7], trans1[2], trans1[5], trans1[8]];
    const m2 = [trans2[0], trans2[3], trans2[6], trans2[1], trans2[4], trans2[7], trans2[2], trans2[5], trans2[8]];
    //if trans1 is applied first, it means trans2 x trans1:
    const t0 = (m2[0] * m1[0]) + (m2[1] * m1[3]) + (m2[2] * m1[6]); //
    const t1 = (m2[0] * m1[1]) + (m2[1] * m1[4]) + (m2[2] * m1[7]); //
    const t2 = (m2[0] * m1[2]) + (m2[1] * m1[5]) + (m2[2] * m1[8]); //

    const t3 = (m2[3] * m1[0]) + (m2[4] * m1[3]) + (m2[5] * m1[6]); //
    const t4 = (m2[3] * m1[1]) + (m2[4] * m1[4]) + (m2[5] * m1[7]); //
    const t5 = (m2[3] * m1[2]) + (m2[4] * m1[5]) + (m2[5] * m1[8]); //

    const t6 = (m2[6] * m1[0]) + (m2[7] * m1[3]) + (m2[8] * m1[6]); //
    const t7 = (m2[6] * m1[1]) + (m2[7] * m1[4]) + (m2[8] * m1[7]); //
    const t8 = (m2[6] * m1[2]) + (m2[7] * m1[5]) + (m2[8] * m1[8]); //
    
    const augmented_matrix = [t0, t3, t6, t1, t4, t7, t2, t5, t8];
    return augmented_matrix;
}

