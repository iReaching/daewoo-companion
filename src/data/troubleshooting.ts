export interface TroubleshootingEntry {
    id: string;
    issue: string;
    possibleCauses: string[];
    solutions: string[];
}

export const troubleshootingData: TroubleshootingEntry[] = [
    {
        id: 'not-working',
        issue: 'The machine does not work',
        possibleCauses: [
            'Power cord plug is not plugged in',
            'Forgot to set the timer'
        ],
        solutions: [
            'Insert the plug into a grounded power outlet',
            'Turn the timer knob to the desired cooking time to power on'
        ]
    },
    {
        id: 'not-cooked',
        issue: 'The food ingredients are not fully cooked',
        possibleCauses: [
            'Temperature is too low',
            'Cooking time is too short',
            'Food ingredients are not evenly fried'
        ],
        solutions: [
            'Adjust the temperature control knob to the desired temperature',
            'Adjust the time knob to the desired time',
            'Some food ingredients need to be flipped midway'
        ]
    },
    {
        id: 'timer-inaccurate',
        issue: 'Inaccurate timer',
        possibleCauses: [
            'Timer error'
        ],
        solutions: [
            'Time can be adjusted according to actual use'
        ]
    },
    {
        id: 'peculiar-smell',
        issue: 'Peculiar smell',
        possibleCauses: [
            'First-time use smell from protective oil on heating tube',
            'Food residue left in the oven'
        ],
        solutions: [
            'First-time smell or light smoke is normal; recommended to run it without food before first use',
            'Clean food residue in oven or shield to avoid scorching smell next time'
        ]
    },
    {
        id: 'white-smoke',
        issue: 'White smoke',
        possibleCauses: [
            'Cooking ingredients with high oil/water content',
            'Oil dirt left inside from last use'
        ],
        solutions: [
            'White smoke or steam may happen with oily or watery food and can be released by opening the door',
            'Clean the inner cavity and shield properly after each use'
        ]
    }
];
