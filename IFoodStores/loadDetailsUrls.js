
const { MongoClient } = require('mongodb');
const stream = require('stream');
const axios = require('axios');

const bluebird = require("bluebird");

const insertDetailLink = require('./Database/insertDetailLink').insertDetailLink
const deleteDetailLink = require('./Database/deleteDetailLink').deleteDetailLink;
const selectMasterLink = require('./Database/selectMasterLink').selectMasterLink;
const withBrowser = require('./Pupperteer/withBrowser').withBrowser;
const withPage = require('./Pupperteer/withPage').withPage;

async function main() {

    let storeUrlMap = new Map();


    storeUrlMap.set("Drogaria Patrocinio",'https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Ultrabox','https://www.ifood.com.br/delivery/brasilia-df/ultrabox---estrutural-zona-industrial-guara/');
    storeUrlMap.set('Carrefour Bairro','https://www.ifood.com.br/delivery/brasilia-df/carrefour-bairro---asa-sul-ii-asa-sul/' );
    storeUrlMap.set('Atacadao Farma','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Melhor Atacadista','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('ArtFarma','https://www.ifood.com.br/delivery/brasilia-df/artfarma-taguatinga-norte/' );
    storeUrlMap.set('Drogarias FarMelhor','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Drogaria Fatima','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Drogaria OnoFarma','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Atacadao DrogaCenter','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set('Drogaria Dedicar','https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set("rede horti mais df",'https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );
    storeUrlMap.set("oba horti fruti df",'https://www.ifood.com.br/delivery/brasilia-df/drogaria-patrocinio-guara-i/' );

    let store = process.argv[2]
    console.log(store)
    console.log('iniciando...')
    console.log('excluindo links de detalhes...')
    await deleteDetailLink(store)
    console.log('selecionando links masters...')
    links = await selectMasterLink(store)
    const uri = "mongodb+srv://sei_taxes:f6kai4fHxh!@cluster0.rajrr.mongodb.net/SeiImposto?retryWrites=true&w=majority";
    console.log(links)
    let detailLinks = [];

    const results = await withBrowser(async (browser) => {

        return bluebird.map(links, async (url) => {
            return withPage(browser)(async (page) => {
                await page.goto(url.link, { waitUntil: 'networkidle2' });
                let obj = await page.content()
                console.log(obj)
                obj = obj.replace('<html><head><meta name="color-scheme" content="light dark"><meta charset="utf-8"></head><body><pre>', '')
                obj = obj.replace('<html><head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">', '')
                obj = obj.replace('</pre></body></html>', '')
                obj = obj.replace('</pre><div class="json-formatter-container"></div></body></html>', '')
                
                obj = JSON.parse(obj)
                console.log(obj)

                for ( let index=0; index<obj.data.menu.length; index++ ) {
                    let li = url.link.split('/')[5]
                   
                    let urlValue=storeUrlMap.get(store)+li+"?corredor="+obj.data.menu[index].code+'&originArea=aisleMenu'
                   
                    detailLink = { store: store, link: urlValue,status:0 }
                    
                    await insertDetailLink(detailLink)
                   
                }

               

            });

        }, { concurrency: 1 });

    });
  
    process.exit(0);







}
main().catch(console.error);