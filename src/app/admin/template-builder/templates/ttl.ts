export const template1 = {
    documentTitle: 'Luftläckagesökning',
    sections: [
        {
            title: 'Sammanfattning',
            titleSize: 'h1',
            content:
                `Byggnadens klimatskärm bedöms i dagsläget inte uppfylla 
            ställt krav på lufttäthet. Vi  rekommenderar att åtgärder 
            vidtas för att minimera risken för att komfortproblem uppstår samt 
            för att kunna uppfylla ställda krav.`,
        },
        {
            title: 'Projektbeskrivning',
            titleSize: 'h1',
            content: `Påbyggnad av hotellrum, i tre plan, i anslutning till företag, Ort.`,

            blocks: [
                {
                    title: 'Uppdragsbeskrivning',
                    titleSize: 'h2',
                    type: 'text-area',
                    content:
                        `Dry-IT har av företag fått i uppdrag att utföra ett antal 
                    luftläckagesökningar i rubricerad påbyggnad. Syftet med läckagesökningarna är att 
                    kontrollera klimatskärmens lufttäta egenskaper samt att lokalisera eventuella 
                    systematiska brister.`
                },
                {
                    title: 'Projektorganisation',
                    titleSize: 'h2',
                    type: 'project-organization',
                },
                {
                    title: 'Objektbeskrivning',
                    titleSize: 'h2',
                    type: 'text-area',
                    content:
                        `<table width="100%">
                    <tr><td style="padding: 10px;"><strong>Byggnadstyp:</strong></td><td style="padding: 10px;">Hotellbyggnad i tre plan</td></tr>
                    <tr><td style="padding: 10px;"><strong>Byggnadsår:</strong></td><td style="padding: 10px;">2020</td></tr>
                    <tr><td style="padding: 10px;"><strong>Grundläggning:</strong></td><td style="padding: 10px;">Befintligt Tak</td></tr>
                    <tr><td style="padding: 10px;"><strong>Stomme:</strong></td><td style="padding: 10px;">KL-trä</td></tr>
                    <tr><td style="padding: 10px;"><strong>Tak:</strong></td><td style="padding: 10px;">KL-trä med helklistrat tätskikt</td></tr>
                    <tr><td style="padding: 10px;"><strong>Fasad:</strong></td><td style="padding: 10px;">Glasfasad</td></tr>
                    <tr><td style="padding: 10px;"><strong>Ventilationssystem:</strong></td><td style="padding: 10px;">FTX</td></tr>
                    <tr><td style="padding: 10px;"><strong>Övrigt:</strong></td><td style="padding: 10px;">Part Badrumsmoduler</td></tr>
                    </table>`
                },
            ]
        }
    ]
}