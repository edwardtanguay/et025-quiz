// choiceList: "New York, Berlin, *Paris, London"
export const getChoicesAndAnswer = (question: any) => {
    const rawChoices = question.choiceList.split(',').map((m:any) => m.trim());

    // get answer
    let answer = '';
    for(const rawChoice of rawChoices) {
        if(rawChoice.startsWith('*')) {
            answer = rawChoice.slice(1);
            break;
        }
    }

    // get choices
    const choices = rawChoices.map((rawChoice:string) => {
        if(rawChoice.startsWith('*')) {
            return rawChoice.slice(1);
        } else {
            return rawChoice;
        }
    });

    return [choices, answer];
}
