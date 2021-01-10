var cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const scrape = require("scrape-it");

const db = require("../../db");
const model = require("../../model")

export default async (req,res)=>{
    try{
        const {type,place,pages} = req.body
        const page = pages/21
        const table = model(db,type)
        db.sync();

        for (let index = 1; index <= page; index++) {
 
            const selectedPage = index == 1 ? "" : `-pagina-${index}`
            const ubic = place.includes(' ') ? `${place.split(' ')[0]}-${place.split(' ')[1]}`: place
           
           
         
            const url = `https://www.zonaprop.com.ar/${type.toLowerCase()}-venta-${ubic.toLowerCase()}${selectedPage}.html`
            
            var response = await cloudscraper.get(url);
            const body = await response;
            const $ = cheerio.load(body);
            
            var datos = await scrape.scrapeHTML($, {
              deptos: {
                listItem: ".postingCard",  
                data: {
                  price: ".firstPrice",
                  direc: ".postingCardLocationTitle ",
                  area: {
                    selector: ".postingCardMainFeatures > li",
                    eq: 0,
                  },
                  amb: {
                    selector: ".postingCardMainFeatures > li",
                    eq: 1,
                  },
                  bed: {
                    selector: ".postingCardMainFeatures > li",
                    eq: 2,
                  },
                  bat: {
                    selector: ".postingCardMainFeatures > li",
                    eq: 3,
                  },
                  link:{
                   
                    attr:'data-to-posting'
                   
                  }
                },
              },
            });
        
           
            await Promise.all(datos.deptos.map(async (dato) => {             
              
                
                
                 
                    const createdData = await table.findCreateFind({
                       where:{                   
                        Link:`https://www.zonaprop.com.ar${dato.link}`,
                        Price:dato.price,
                        Direccion:dato.direc,
                        Areas:dato.area.replace(/\s+/g, ''),
                        Ambientes:dato.amb.replace(/\s+/g, ''),
                        Banos:dato.bat.replace(/\s+/g, ''),
                        Dormitorios:dato.bed.replace(/\s+/g, ''),
                        Link:`https://www.zonaprop.com.ar${dato.link}`
                       },                      
                    })   
                           
                

                
            }))          
         }
         await res.json({error:false,created:true})        
       
    }catch(err){
        console.log(err)
    }
}