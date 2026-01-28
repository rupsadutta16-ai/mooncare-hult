/**
 * Refined algorithm to calculate pad recommendation for a starter kit.
 *
 * @param {Object} userData - The user's profile data.
 * @param {number} userData.periodDuration - Average length of period in days.
 * @param {string[]} userData.symptoms - List of symptoms/problems selected.
 *
 * @returns {Object} - An object containing heavyPads, mediumPads, lightPads, and totalPads.
 */
export const calculatePadRecommendation = (userData) => {
    // 1. Inputs
    const cycleLength = Math.max(3, parseInt(userData?.periodDuration) || 5);
    const symptoms = userData?.symptoms || [];

    // flowType derivation
    let flowType = 'medium';
    if (symptoms.includes('heavy')) {
        flowType = 'heavy';
    } else if (symptoms.includes('low')) {
        flowType = 'light';
    }

    // 2. Split days
    let heavyDays, mediumDays, lightDays;
    if (cycleLength === 3) {
        heavyDays = 1;
        mediumDays = 1;
        lightDays = 1;
    } else {
        heavyDays = Math.ceil(cycleLength * 0.3);
        mediumDays = Math.ceil(cycleLength * 0.4);
        lightDays = cycleLength - heavyDays - mediumDays;

        // Ensure all day types >= 1
        if (lightDays < 1) {
            if (heavyDays > 1) heavyDays -= 1;
            else if (mediumDays > 1) mediumDays -= 1;
            lightDays = 1;
        }
    }

    // 3. Base pads per day
    const heavyPadPerDay = 3;
    const mediumPadPerDay = 2;
    const lightPadPerDay = 2;

    // 4. Calculate base pads
    let heavyPads = heavyDays * heavyPadPerDay;
    let mediumPads = mediumDays * mediumPadPerDay;
    let lightPads = lightDays * lightPadPerDay;

    // 5. Apply flow multipliers
    if (flowType === 'heavy') {
        heavyPads *= 1.2;
        mediumPads *= 1.1;
        lightPads *= 1.0;
    } else if (flowType === 'light') {
        heavyPads *= 0.8;
        mediumPads *= 0.9;
        lightPads *= 1.0;
    }

    // Round to nearest whole number
    heavyPads = Math.round(heavyPads);
    mediumPads = Math.round(mediumPads);
    lightPads = Math.round(lightPads);

    // Minimum 1 pad per type
    heavyPads = Math.max(1, heavyPads);
    mediumPads = Math.max(1, mediumPads);
    lightPads = Math.max(1, lightPads);

    // 6. Safety buffer
    mediumPads += 1;
    lightPads += 1;

    // 7. Optional cap: Heavy pads <= 1.5 * medium pads
    if (heavyPads > 1.5 * mediumPads) {
        heavyPads = Math.floor(1.5 * mediumPads);
    }

    return {
        heavyPads,
        mediumPads,
        lightPads,
        totalPads: heavyPads + mediumPads + lightPads
    };
};
