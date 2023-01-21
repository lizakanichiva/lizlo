const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

const axios = require('axios')
const cheerio = require('cheerio');

    axios.get('https://limars.ru/vinnyj-shkaf/meyvel-mv141pro-kbt2/').then(html => {       
         const $ = cheerio.load(html.data)
    
        $('.atr_abs').remove();
        $.html();
    
        $('.col-sm-12.col-xs-12.col-md-6').remove();
        $.html();
    
        $('\n').remove();
        $.html();
    
        let attributes = []
        $("div.col-xs-6").each((i, elem) => {
            attributes.push($(elem).text().replace(/(\r\n|\n|\r|\t)/gm, "").trim())

            console.log(attributes)
        })

        let attributesTitles = [];
        let attributesValues = [];
        for (let i = 0; i < attributes.length; i += 2) {
          attributesTitles.push(attributes[i]);
          attributes[i+1] && attributesValues.push(attributes[i + 1]);
        }
        console.log(attributesTitles)
        console.log(attributesValues)

        let arrObjects = []

        let result = {
            title: attributesTitles[0],
            value: attributesValues[0],
          };
    
          let json = JSON.stringify(result)

          console.log(json)

        const attributesInCsv = new Parser({ fields: ["id", "title", "value"] }).parse(result);
        fs.writeFileSync("attributes.csv", attributesInCsv);
})