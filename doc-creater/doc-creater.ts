import createReport from 'docx-templates';
import { ipcRenderer } from 'electron'
const fs = require('fs');

interface Input {
    path: string,
    data?: any
}

export async function createDoc(input: Input) {
    console.log('creating doc')
    const template = fs.readFileSync('tmp/rbk/rbk-mall.docx');

    const buffer = await createReport({
        template,
        data: input.data,
        cmdDelimiter: ['{', '}'],
        rejectNullish: false
    });

    fs.writeFileSync(`${input.path}.docx`, buffer)
    return `${input.path}.docx`
}

export async function fromTemplate(input: any) {
    console.log('creating doc')

    let p

    if (input.template === 'risk') {
        p = 'src/assets/templates/risk.docx'
    }

    const template = fs.readFileSync(p);

    const buffer = await createReport({
        template,
        data: input.data,
        cmdDelimiter: ['{', '}'],
        rejectNullish: false
    });

    fs.writeFileSync(`${input.savePath}.docx`, buffer)
    return `${input.savePath}.docx`
}

