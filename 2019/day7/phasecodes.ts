export function generatePermutations(size: number) {
    let items: number[] = [];
    let used: boolean[] = [];
    let permutations: any[] = [];

    // initialize
    for (let i = 0; i < size; i++) {
        items[i] = i;
        used[i] = false;
    }

    for (let a = 0; a < size; a++) {
        used[a] = true;

        for (let b = 0; b < size; b++) {
            if (used[b]) { continue; } // skip this index
            else { used[b] = true }

            for (let c = 0; c < size; c++) {
                if (used[c]) { continue; } // skip this index
                else { used[c] = true }

                for (let d = 0; d < size; d++) {
                    if (used[d]) { continue; } // skip this index
                    else { used[d] = true }

                    for (let e = 0; e < size; e++) {
                        if (used[e]) { continue; } // skip this index
                        else {
                            permutations.push([a, b, c, d, e]);
                        }
                    }
                    used[d] = false;
                }
                used[c] = false;
            }
            used[b] = false;
        }
        used[a] = false;
    }

    return permutations;

}

function test(){
    const perms = generatePermutations(5)
    console.table(perms);
    console.log(`---- Number of permutations ----`);
    console.log(perms.length);
}
//test();