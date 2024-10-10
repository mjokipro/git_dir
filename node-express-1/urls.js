const fs = require('fs');
const axios = require('axios');
const { url } = require('inspector');

class URLScrap{
    constructor(urlList){
        this.urls = urlList;
    }

    scrapeHTML(){
        //Gets a list of all content from each url into a big ol array
        let content = [];
        let listOfUrls = this.readFile();
        listOfUrls.forEach(async url => {
            let data = await axios.get(url);
            if(!data){
                console.log('Error in retrieving data');
            }
            else{
                constent.push(data);
            }
        });
        return content;
    }

    async OneScrape(url) {
        //Scraps the content of one url at a time per call
        let data = await axios.get(url);
        return data;
    }

    async writeFile(listOfUrls){
        /*
        *  This is called from the readFile method, which creates a list of urls 
        *  From a given file.  We pass it in here due to the asynchronous nature of fileRead
        *  We then create a promise object to handle the calls made from each individual url 
        *  To another method that makes an axios call.  Once we get that back we create a file with its content
        *  Used a modified regex with help from stackoverflow
        *  My regex was eliminating the prefix and affix of the url, but also 't' from any url containing that letter :(
        */
        
        await new Promise((resolve, reject) => {
            listOfUrls.forEach(async url => {
                let regExMagic = new RegExp(/(?:www\.)?(\w+)?(\.)/g);
                let domainName = (regExMagic.exec(url));
                let data = await this.OneScrape(url);

                fs.writeFile(`${domainName[1]}.txt`, data, (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        let answer = `${domainName} has been created`;
                        resolve(answer);
                    }
                    })
                })
        })    
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(`${err} Invalid URL, terminating`);
        })
    }

    async readFile(){
        //Saves a list of urls into an array that the user specifies
        new Promise((resolve, reject) => {  
            fs.readFile(this.urls, 'utf8', (err, data) => {
                if(err){
                    reject(err);
                }
                    resolve(data);
            })
        })
        .then((data) => {
            let listedUrl = data.split('\n');
            // console.log(listedUrl)
            this.writeFile(listedUrl);
        })
        .catch((err) => {
            console.log(`${err} Wrong file name! Terminating`);
            return;
        })
    }

}

main = (dataFile) => {
    let urlScrapper = new URLScrap(dataFile);
    urlScrapper.readFile();
}

main(process.argv[2]);