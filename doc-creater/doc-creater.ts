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

    /* let p */

    /*  if (input.template === 'risk') {
         p = 'temp/risk.docx'
     } */

    const template = fs.readFileSync(input.templateFilePath);

    const buffer = await createReport({
        template,
        data: input.data,
        cmdDelimiter: ['{', '}'],
        rejectNullish: false
    });

    fs.writeFileSync(`${input.savePath}.docx`, buffer)
    return `${input.savePath}.docx`
}


export async function testTemplate(data) {
    console.log('creating doc')

    /* let p */

    /*  if (input.template === 'risk') {
         p = 'temp/risk.docx'
     } */

    const html = `
     <body>
     ${data}
   </body>`

    const template = fs.readFileSync('temp/testtemplate.docx');

    const buffer = await createReport({
        template,
        data: {
            test: 'test',
            html: html
        },
        rejectNullish: false
    });

    fs.writeFileSync(`temp/testfile.docx`, buffer)
    return `temp/testfile.docx`
}


